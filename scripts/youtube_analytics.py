#!/usr/bin/env python3
"""
YouTube Analytics Programmatic Integration (scripts/youtube_analytics.py)

Direct OAuth2-authenticated access to YouTube Analytics API & YouTube Data API v3.
Pulls channel overview stats, daily trends, top videos, and retention curves.

Usage:
  python scripts/youtube_analytics.py --overview
  python scripts/youtube_analytics.py --daily --days 28
  python scripts/youtube_analytics.py --top-videos --limit 10
  python scripts/youtube_analytics.py --video-retention <VIDEO_ID> --project <slug>
  python scripts/youtube_analytics.py --auth-only
"""

import os
import sys
import json
import argparse
from datetime import datetime, timedelta, timezone

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = [
    "https://www.googleapis.com/auth/yt-analytics.readonly",
    "https://www.googleapis.com/auth/youtube.readonly",
]

DEFAULT_CLIENT_SECRETS = os.path.join("config", "client_secret.json")
DEFAULT_TOKEN_PATH = os.path.join("config", "token.json")
TARGET_CHANNEL_ID = "UCI6Nr9UfJEYF076mhy-zDog"


def get_credentials(credentials_path=DEFAULT_CLIENT_SECRETS, token_path=DEFAULT_TOKEN_PATH):
    """Obtains valid user OAuth2 credentials from token file or initiates OAuth flow."""
    creds = None

    if os.path.exists(token_path):
        try:
            creds = Credentials.from_authorized_user_file(token_path, SCOPES)
        except Exception as e:
            print(f"[WARN] Failed to load cached token from {token_path}: {e}")
            creds = None

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print("[INFO] Refreshing expired access token...")
            try:
                creds.refresh(Request())
            except Exception as e:
                print(f"[WARN] Refresh failed: {e}. Re-authenticating...")
                creds = None

        if not creds:
            if not os.path.exists(credentials_path):
                print("\n" + "=" * 70)
                print("[ERROR] Missing Google Cloud OAuth Client Secret file!")
                print(f"Expected at: {os.path.abspath(credentials_path)}")
                print("=" * 70)
                print("\nTo set this up (takes ~3 minutes):")
                print("1. Go to Google Cloud Console: https://console.cloud.google.com/")
                print("2. Create a project and enable these two APIs:")
                print("   - 'YouTube Analytics API'")
                print("   - 'YouTube Data API v3'")
                print("3. In 'OAuth consent screen', select 'External', set status to 'Testing',")
                print("   and add your channel's Google account email under 'Test users'.")
                print("4. In 'Credentials', click 'Create Credentials' -> 'OAuth client ID'.")
                print("   Select Application Type: 'Desktop app'.")
                print(f"5. Download the JSON and save it as: {credentials_path}")
                print("=" * 70 + "\n")
                sys.exit(1)

            print(f"[INFO] Initiating browser OAuth authorization via {credentials_path}...")
            flow = InstalledAppFlow.from_client_secrets_file(credentials_path, SCOPES)
            creds = flow.run_local_server(port=8088, prompt="consent", access_type="offline")

        os.makedirs(os.path.dirname(token_path), exist_ok=True)
        with open(token_path, "w", encoding="utf-8") as token_file:
            token_file.write(creds.to_json())
        print(f"[SUCCESS] OAuth token successfully saved to {token_path}")

    return creds


def get_services(creds):
    """Builds YouTube Analytics and YouTube Data API clients."""
    yt_analytics = build("youtubeAnalytics", "v2", credentials=creds)
    yt_data = build("youtube", "v3", credentials=creds)
    return yt_analytics, yt_data


def get_channel_info(yt_data, channel_id=None):
    """Fetches channel title and public metrics via YouTube Data API."""
    try:
        if channel_id and channel_id != "MINE":
            res = yt_data.channels().list(part="snippet,statistics", id=channel_id).execute()
        else:
            res = yt_data.channels().list(part="snippet,statistics", mine=True).execute()

        items = res.get("items", [])
        if not items:
            return None
        return items[0]
    except Exception as e:
        print(f"[WARN] Could not retrieve channel info: {e}")
        return None


def fetch_overview(yt_analytics, yt_data, channel_id="mine", days=28, start_date=None, end_date=None):
    """Fetches high-level overview metrics matching YouTube Studio overview tab."""
    today = datetime.now(timezone.utc).date()
    if not end_date:
        end_date = (today - timedelta(days=1)).isoformat()
    if not start_date:
        start_date = (today - timedelta(days=days)).isoformat()

    ids_param = "channel==MINE" if channel_id in ("mine", None) else f"channel=={channel_id}"

    metrics = (
        "views,estimatedMinutesWatched,averageViewDuration,"
        "averageViewPercentage,subscribersGained,subscribersLost,likes,comments,shares"
    )

    print(f"\n[QUERY] Channel Overview ({start_date} to {end_date})...")
    res = yt_analytics.reports().query(
        ids=ids_param,
        startDate=start_date,
        endDate=end_date,
        metrics=metrics,
    ).execute()

    headers = [col["name"] for col in res.get("columnHeaders", [])]
    rows = res.get("rows", [])

    if not rows:
        print("[INFO] No analytics data returned for the selected date range.")
        return {}

    data = dict(zip(headers, rows[0]))
    
    # Calculate derived stats
    views = data.get("views", 0)
    minutes = data.get("estimatedMinutesWatched", 0)
    hours = round(minutes / 60.0, 1)
    avg_sec = data.get("averageViewDuration", 0)
    avg_pct = data.get("averageViewPercentage", 0.0)
    net_subs = data.get("subscribersGained", 0) - data.get("subscribersLost", 0)
    likes = data.get("likes", 0)
    comments = data.get("comments", 0)
    shares = data.get("shares", 0)

    channel_meta = get_channel_info(yt_data, channel_id if channel_id != "mine" else None)
    channel_title = channel_meta["snippet"]["title"] if channel_meta else channel_id
    total_channel_subs = channel_meta["statistics"].get("subscriberCount", "N/A") if channel_meta else "N/A"

    print("\n" + "=" * 60)
    print(f" YOUTUBE STUDIO OVERVIEW: {channel_title}")
    print(f" Period: {start_date} to {end_date} ({days} days)")
    print(f" Total Channel Subscribers: {total_channel_subs}")
    print("=" * 60)
    print(f" • Views:                    {views:,}")
    print(f" • Watch Time:               {hours:,.1f} hours ({minutes:,.0f} mins)")
    print(f" • Average View Duration:    {avg_sec // 60}m {avg_sec % 60:02d}s ({avg_pct:.1f}%)")
    print(f" • Net Subscribers:          {'+' if net_subs >= 0 else ''}{net_subs:,} (+{data.get('subscribersGained', 0)} / -{data.get('subscribersLost', 0)})")
    print(f" • Engagement:               {likes:,} likes | {comments:,} comments | {shares:,} shares")
    print("=" * 60 + "\n")

    return {
        "channelId": channel_id,
        "channelTitle": channel_title,
        "startDate": start_date,
        "endDate": end_date,
        "metrics": data,
        "derived": {
            "watchTimeHours": hours,
            "netSubscribers": net_subs,
            "avgViewDurationFormatted": f"{avg_sec // 60}m {avg_sec % 60:02d}s",
        }
    }


def fetch_daily_trend(yt_analytics, channel_id="mine", days=28):
    """Fetches day-by-day metrics breakdown."""
    today = datetime.now(timezone.utc).date()
    end_date = (today - timedelta(days=1)).isoformat()
    start_date = (today - timedelta(days=days)).isoformat()
    ids_param = "channel==MINE" if channel_id in ("mine", None) else f"channel=={channel_id}"

    res = yt_analytics.reports().query(
        ids=ids_param,
        startDate=start_date,
        endDate=end_date,
        metrics="views,estimatedMinutesWatched,subscribersGained,likes",
        dimensions="day",
        sort="day"
    ).execute()

    headers = [col["name"] for col in res.get("columnHeaders", [])]
    rows = res.get("rows", [])

    print(f"\n[DAILY TREND] Last {days} Days ({start_date} to {end_date}):")
    print(f"{'Date':<12} | {'Views':>8} | {'Watch (min)':>12} | {'+Subs':>6} | {'Likes':>6}")
    print("-" * 55)
    for r in rows:
        row_dict = dict(zip(headers, r))
        print(f"{row_dict.get('day'):<12} | {row_dict.get('views', 0):>8} | {int(row_dict.get('estimatedMinutesWatched', 0)):>12} | {row_dict.get('subscribersGained', 0):>6} | {row_dict.get('likes', 0):>6}")
    print("-" * 55 + "\n")

    return [dict(zip(headers, r)) for r in rows]


def fetch_top_videos(yt_analytics, yt_data, channel_id="mine", days=28, limit=10):
    """Fetches top videos ranked by views in the period."""
    today = datetime.now(timezone.utc).date()
    end_date = (today - timedelta(days=1)).isoformat()
    start_date = (today - timedelta(days=days)).isoformat()
    ids_param = "channel==MINE" if channel_id in ("mine", None) else f"channel=={channel_id}"

    res = yt_analytics.reports().query(
        ids=ids_param,
        startDate=start_date,
        endDate=end_date,
        metrics="views,estimatedMinutesWatched,averageViewPercentage,subscribersGained",
        dimensions="video",
        sort="-views",
        maxResults=limit
    ).execute()

    rows = res.get("rows", [])
    if not rows:
        print("[INFO] No video breakdown found for this range.")
        return []

    video_ids = [r[0] for r in rows]
    # Fetch titles from Data API
    vid_meta = yt_data.videos().list(part="snippet", id=",".join(video_ids)).execute()
    titles = {item["id"]: item["snippet"]["title"] for item in vid_meta.get("items", [])}

    print(f"\n[TOP {limit} VIDEOS] ({start_date} to {end_date}):")
    print(f"{'#':<3} | {'Video ID':<12} | {'Views':>8} | {'Avg %':>7} | {'Watch (m)':>10} | {'Title'}")
    print("-" * 80)
    results = []
    for idx, r in enumerate(rows, 1):
        vid_id = r[0]
        views = r[1]
        mins = int(r[2])
        avg_pct = round(r[3], 1)
        title = titles.get(vid_id, vid_id)[:40]
        print(f"{idx:<3} | {vid_id:<12} | {views:>8,} | {avg_pct:>6.1f}% | {mins:>10,} | {title}")
        results.append({
            "videoId": vid_id,
            "title": titles.get(vid_id, vid_id),
            "views": views,
            "watchMinutes": mins,
            "averageViewPercentage": avg_pct
        })
    print("-" * 80 + "\n")
    return results


def fetch_video_retention(yt_analytics, video_id, project_slug=None):
    """
    Fetches relative audience retention curve for a specific video/Short.
    Formats it directly for `scripts/telemetry_priors.js` ingest.
    """
    today = datetime.now(timezone.utc).date()
    end_date = (today - timedelta(days=1)).isoformat()
    # 2 years back to capture full lifetime
    start_date = (today - timedelta(days=730)).isoformat()

    print(f"\n[RETENTION] Fetching audience retention curve for video: {video_id}...")
    try:
        res = yt_analytics.reports().query(
            ids="channel==MINE",
            startDate=start_date,
            endDate=end_date,
            metrics="audienceWatchRatio",
            dimensions="elapsedVideoTimeRatio",
            filters=f"video=={video_id}"
        ).execute()
    except HttpError as err:
        print(f"[ERROR] Failed to query retention: {err}")
        return None

    rows = res.get("rows", [])
    if not rows:
        print(f"[WARN] No retention curve data available yet for video {video_id}.")
        return None

    # Format into retention array
    # elapsedVideoTimeRatio ranges 0.0 to 1.0 (or 0.01 increments)
    curve = []
    for r in sorted(rows, key=lambda x: x[0]):
        time_ratio = float(r[0])
        watch_ratio = float(r[1])
        curve.append({"timeRatio": time_ratio, "watchRatio": watch_ratio})

    retention_payload = {
        "platform": "youtube",
        "videoId": video_id,
        "project": project_slug,
        "retentionByRatio": curve,
        "raw": res
    }

    if project_slug:
        out_dir = os.path.join("projects", project_slug)
        os.makedirs(out_dir, exist_ok=True)
        out_file = os.path.join(out_dir, "telemetry.json")
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump(retention_payload, f, indent=2)
        print(f"[SUCCESS] Saved video retention curve to: {out_file}")
        print(f"[NEXT STEP] Run: node scripts/telemetry_priors.js --ingest {out_file} --project {project_slug}")

    return retention_payload


def main():
    parser = argparse.ArgumentParser(description="YouTube Studio Analytics Integration")
    parser.add_argument("--credentials", default=DEFAULT_CLIENT_SECRETS, help="Path to client_secret.json")
    parser.add_argument("--token", default=DEFAULT_TOKEN_PATH, help="Path to token.json")
    parser.add_argument("--channel-id", default=TARGET_CHANNEL_ID, help="YouTube Channel ID or 'mine'")
    parser.add_argument("--days", type=int, default=28, help="Number of past days to query (default: 28)")
    parser.add_argument("--start-date", help="Custom start date (YYYY-MM-DD)")
    parser.add_argument("--end-date", help="Custom end date (YYYY-MM-DD)")
    parser.add_argument("--overview", action="store_true", help="Fetch channel overview metrics")
    parser.add_argument("--daily", action="store_true", help="Fetch daily views and watch time trend")
    parser.add_argument("--top-videos", action="store_true", help="Fetch top performing videos")
    parser.add_argument("--video-retention", help="Fetch audience retention curve for a video ID")
    parser.add_argument("--project", help="Motion reel project slug (for telemetry linking)")
    parser.add_argument("--auth-only", action="store_true", help="Authenticate and generate token.json without queries")
    parser.add_argument("--output", help="Save output JSON to specified file path")

    args = parser.parse_args()

    # Authenticate
    creds = get_credentials(args.credentials, args.token)
    if args.auth_only:
        print("[SUCCESS] Authentication complete. token.json is active.")
        return

    yt_analytics, yt_data = get_services(creds)
    output_data = {}

    channel_target = args.channel_id if args.channel_id else "mine"

    # If no specific action requested, default to --overview
    run_all = not (args.overview or args.daily or args.top-videos or args.video_retention)

    if args.overview or run_all:
        output_data["overview"] = fetch_overview(
            yt_analytics, yt_data,
            channel_id=channel_target,
            days=args.days,
            start_date=args.start_date,
            end_date=args.end_date
        )

    if args.daily:
        output_data["daily"] = fetch_daily_trend(yt_analytics, channel_id=channel_target, days=args.days)

    if args.top_videos:
        output_data["topVideos"] = fetch_top_videos(yt_analytics, yt_data, channel_id=channel_target, days=args.days)

    if args.video_retention:
        output_data["retention"] = fetch_video_retention(yt_analytics, args.video_retention, project_slug=args.project)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            json.dump(output_data, f, indent=2)
        print(f"[SUCCESS] Report saved to {args.output}")


if __name__ == "__main__":
    main()
