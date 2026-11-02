import React from 'react';
import { Composition } from 'remotion';
import { HistoricalReel, ReelTimeline } from './HistoricalReel';
import reelData from './timelines/current_reel.json';
import binanceData from './timelines/binance_heist_2026.json';
import peshawarData from './timelines/peshawar_2009.json';
import u2Data from './timelines/u2_incident_1960.json';
import taipingData from './timelines/taiping_1850.json';
import cowboyData from './timelines/operation_cowboy_1945.json';
import aleutianData from './timelines/aleutian_campaign_1942.json';
import cartonData from './timelines/carton_de_wiart_1916.json';
import floridaData from './timelines/florida_plane_crash_2026.json';

export const RemotionRoot: React.FC = () => {
  const currentTimeline = reelData as unknown as ReelTimeline;
  const binanceTimeline = binanceData as unknown as ReelTimeline;
  const peshawarTimeline = peshawarData as unknown as ReelTimeline;
  const u2Timeline = u2Data as unknown as ReelTimeline;
  const taipingTimeline = taipingData as unknown as ReelTimeline;
  const cowboyTimeline = cowboyData as unknown as ReelTimeline;
  const aleutianTimeline = aleutianData as unknown as ReelTimeline;
  const cartonTimeline = cartonData as unknown as ReelTimeline;
  const floridaTimeline = floridaData as unknown as ReelTimeline;

  const totalFrames = currentTimeline.scenes.reduce((max, s) => Math.max(max, s.startFrame + s.durationFrames), 0) || 2940;
  const binanceFrames = binanceTimeline.scenes.reduce((max, s) => Math.max(max, s.startFrame + s.durationFrames), 0) || 3500;
  const peshawarFrames = peshawarTimeline.scenes.reduce((max, s) => Math.max(max, s.startFrame + s.durationFrames), 0) || 3240;
  const u2Frames = u2Timeline.scenes.reduce((max, s) => Math.max(max, s.startFrame + s.durationFrames), 0) || 2940;
  const taipingFrames = taipingTimeline.scenes.reduce((max, s) => Math.max(max, s.startFrame + s.durationFrames), 0) || 3000;
  const cowboyFrames = cowboyTimeline.scenes.reduce((max, s) => Math.max(max, s.startFrame + s.durationFrames), 0) || 2940;
  const aleutianFrames = aleutianTimeline.scenes?.reduce((max, s) => Math.max(max, s.startFrame + s.durationFrames), 0) || 2940;
  const cartonFrames = cartonTimeline.scenes?.reduce((max, s) => Math.max(max, s.startFrame + s.durationFrames), 0) || 3443;
  const floridaFrames = floridaTimeline.scenes?.reduce((max, s) => Math.max(max, s.startFrame + s.durationFrames), 0) || 2723;

  return (
    <>
      {/* Default Active Historical Reel (Used by render_pipeline.ps1 and automated audits) */}
      <Composition
        id="HistoricalReel"
        component={HistoricalReel as any}
        durationInFrames={totalFrames}
        fps={currentTimeline.meta.fps || 60}
        width={currentTimeline.meta.width || 1080}
        height={currentTimeline.meta.height || 1920}
        defaultProps={{
          timeline: currentTimeline,
        }}
      />

      {/* 2026 Binance Heist & North Korea Cyber Offensive */}
      <Composition
        id="BinanceHeist2026"
        component={HistoricalReel as any}
        durationInFrames={binanceFrames}
        fps={binanceTimeline.meta.fps || 60}
        width={binanceTimeline.meta.width || 1080}
        height={binanceTimeline.meta.height || 1920}
        defaultProps={{
          timeline: binanceTimeline,
        }}
      />

      {/* 28 October 2009 Peshawar Meena Bazaar Bombing Reel */}
      <Composition
        id="Peshawar2009"
        component={HistoricalReel as any}
        durationInFrames={peshawarFrames}
        fps={peshawarTimeline.meta.fps || 60}
        width={peshawarTimeline.meta.width || 1080}
        height={peshawarTimeline.meta.height || 1920}
        defaultProps={{
          timeline: peshawarTimeline,
        }}
      />

      {/* 1 May 1960 U-2 Incident Espionage Reel */}
      <Composition
        id="U2Incident1960"
        component={HistoricalReel as any}
        durationInFrames={u2Frames}
        fps={u2Timeline.meta.fps || 60}
        width={u2Timeline.meta.width || 1080}
        height={u2Timeline.meta.height || 1920}
        defaultProps={{
          timeline: u2Timeline,
        }}
      />

      {/* 1850-1864 Taiping Rebellion Reel */}
      <Composition
        id="TaipingRebellion1850"
        component={HistoricalReel as any}
        durationInFrames={taipingFrames}
        fps={taipingTimeline.meta.fps || 60}
        width={taipingTimeline.meta.width || 1080}
        height={taipingTimeline.meta.height || 1920}
        defaultProps={{
          timeline: taipingTimeline,
        }}
      />

      {/* 28 April 1945 Operation Cowboy Reel */}
      <Composition
        id="OperationCowboy1945"
        component={HistoricalReel as any}
        durationInFrames={cowboyFrames}
        fps={cowboyTimeline.meta.fps || 60}
        width={cowboyTimeline.meta.width || 1080}
        height={cowboyTimeline.meta.height || 1920}
        defaultProps={{
          timeline: cowboyTimeline,
        }}
      />

      {/* 1942–1943 Aleutian Islands Campaign Reel */}
      <Composition
        id="AleutianCampaign1942"
        component={HistoricalReel as any}
        durationInFrames={aleutianFrames}
        fps={aleutianTimeline.meta?.fps || 60}
        width={aleutianTimeline.meta?.width || 1080}
        height={aleutianTimeline.meta?.height || 1920}
        defaultProps={{
          timeline: aleutianTimeline,
        }}
      />

      {/* Sir Adrian Carton de Wiart VC - The Unkillable Soldier Reel */}
      <Composition
        id="CartonDeWiart1916"
        component={HistoricalReel as any}
        durationInFrames={cartonFrames}
        fps={cartonTimeline.meta?.fps || 60}
        width={cartonTimeline.meta?.width || 1080}
        height={cartonTimeline.meta?.height || 1920}
        defaultProps={{
          timeline: cartonTimeline,
        }}
      />

      {/* 1 November 2026 South Florida Business Jet Crash Reel */}
      <Composition
        id="FloridaPlaneCrash2026"
        component={HistoricalReel as any}
        durationInFrames={floridaFrames}
        fps={floridaTimeline.meta?.fps || 60}
        width={floridaTimeline.meta?.width || 1080}
        height={floridaTimeline.meta?.height || 1920}
        defaultProps={{
          timeline: floridaTimeline,
        }}
      />
    </>
  );
};
