import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import {
  BinanceAlertQuoteCard,
  KoreaPeninsulaNightSatellite,
  Unit121CyberBunker,
  PyongyangConscriptCadetsTally,
  ParallelWorldsSplit,
  BinanceHotVaultBreach,
  GlobalBalancesDrainingTally,
  SingaporeWarRoomEngineer,
  TenBlockchainsLiquidityMap,
  EmergencyFreezeShatter,
  UnIntelligenceRocketQuote,
  HwasongIcbmSnowTransit,
  RocketEngineTestIgnition,
  BinanceLeadershipBailout,
  VaultReservesRestorationSplit,
  BorderWallsDefeatedMap,
  MedalsOnChildSoldiersTally,
  IsolatedHackerDarkCell,
  DigitalFortressCollapse,
  CyberDoctrineDossierQuote,
  SmartphoneVsSiloSplit,
  OceanicCablesGhostWealth,
  TerminalShutdownSilence,
  InYourPocketFinalQuote,
} from './BinanceHeistVectors';
import {
  M24ChaffeeTankSilhouette,
  C130HerculesSilhouette,
  MvSwatCargoShipSilhouette,
  DhakaTacticalMapVector,
  EbrDispersionSchematicVector,
  DhakaUniversityBlueprintVector,
  WeatheredMilitaryStamp,
  T33JetSilhouette,
  T33BlueprintCallout,
  SindhBorderTelemetry,
} from './RashidMinhasVectors';
import { WavingFlagSvg } from './WavingFlagSvg';
import { PaperCutoutCard } from './PaperCutoutCard';
import { CutoutPuppet } from './CutoutPuppet';
import {
  PaperSignCounter,
  CascadingPaperStack,
  HingedCutoutReveal,
} from './TactilePropCards';
import {
  PeshawarBazaarAlleySilhouette,
  SedanBombSchematic,
  BlastShockwaveVector,
  FireAndRubblePhotoCard,
  RickshawRescueSilhouette,
  LadyReadingHospitalEmergencyCard,
  PeshawarCasualtiesCounter,
  ClintonArrivalDiplomaticCard,
  WaziristanOperationMapVector,
  IntelligenceDisavowalSchematic,
  ClintonQureshiPressCard,
  ClintonDiplomaticPuppetStage,
  ItalyOlbiaContinentalMapVector,
  PeshawarRebuildSilhouette,
  PeshawarMemorialPlinth,
  PakistanFlagMemorialStage,
  PeshawarEpilogueCard,
} from './PeshawarVectors';
import {
  U2ShatteredSpinStratosphereVector,
  PeshawarAirbaseU2DawnSilhouette,
  U2StratosphereTelemetryVector,
  GrandSlamContinentalMapVector,
  HyconCameraSurveillanceSchematic,
  SovietP30RadarAlertVector,
  S75DvinaLaunchBatteryVector,
  U2ExplosionDestructionVector,
  PowersBailoutAndCurareCoinCard,
  KgbGroundCaptureVector,
  NasaCoverUpDossierCard,
  FakeNasaU2SchematicVector,
  KhrushchevSupremeSovietPodiumStage,
  KhrushchevSpeechBombshellVector,
  GorkyParkWreckageExhibitionVector,
  ParisSummitCollapseCard,
  MoscowMilitaryTribunalCard,
  GlienickeBridgeSpiesVector,
  WavingFlagSovietUsStage,
  U2EpilogueBrassPlaqueCard,
} from './U2IncidentVectors';
import {
  TaipingConfrontationOpening,
  HongFailedScholarDesk,
  HongFeverDreamVision,
  CleanseTheDemonsStage,
  CuttingImperialQueueSilhouette,
  JintianUprisingFlagStage,
  MillionManMarchTallyStage,
  TaipingCampaignTacticalMap,
  YangtzeWarJunksFleet,
  NanjingGateBreachedStage,
  HeavenlyCapitalThroneStage,
  SacredTreasuryProclamationStage,
  TianjingIncidentPurgeStage,
  XiangArmySiegeEncirclementMap,
  StarvationInCapitalStage,
  HongXiuquanDeathBierStage,
  GunpowderTunnelMineExplosion,
  BreachMeleeSlaughterStage,
  ThirtyMillionCasualtyTallyStage,
  ShatteredEmpireEpilogueStage,
} from './TaipingVectors';
import {
  CowboyWarCollapseOpening,
  CowboyLipizzanerStallionHero,
  CowboyRedArmyFamineAdvance,
  CowboyHungarianStudMassacre,
  CowboyWehrmachtVetsPact,
  CowboyRadioCallToPatton,
  CowboyPattonCommandGreenlight,
  CowboyTwentyMilesBehindLines,
  CowboyPattonsGhostsCharge,
  CowboyHostauGatesReached,
  CowboyAlliedPowsLiberation,
  CowboyArmingWehrmachtBrothers,
  CowboyCossackCavalryPrinceAmassov,
  CowboyWaffenSsAmbush,
  CowboySideBySideDefense,
  CowboySsRetreatHeavyLosses,
  CowboyCaptStewartEvacuationOrder,
  CowboyMassLipizzanerStampede,
  CowboySovietT34RidgeArrival,
  CowboyUsArmyTruckConvoy,
  CowboyEpilogueSpanishRidingSchool,
} from './CowboyVectors';
import {
  AleutianForgottenInvasionOpening,
  AleutianArchipelagoVectorMap,
  AleutianDutchHarborBombing,
  AleutianAttuKiskaOccupationFlag,
  AleutianAkutanZeroBogCrash,
  AleutianAkutanZeroSchematic,
  AleutianB24FogMountainHazard,
  AleutianKomandorskiCruiserDuel,
  AleutianAttuAmphibiousLanding,
  AleutianHighRidgeMistFire,
  AleutianTundraFrostbiteToll,
  AleutianCastnersCutthroatsClimb,
  AleutianEngineerHillBanzai,
  AleutianAttuSurvivorTally,
  AleutianKiskaFortressMap,
  AleutianKimuraFogEscape,
  AleutianEmptyIslandBombardment,
  AleutianOperationCottageEmptyBeach,
  AleutianFriendlyFireFogPhantoms,
  AleutianKiskaGhostTollCounter,
  AleutianEpilogueMemorialStage,
} from './AleutianVectors';
import {
  CartonHeroSilhouetteHook,
  BoerWarRiverCrossingAmbush,
  IndiaCavalryGallopCharge,
  SomalilandExpeditionMapVector,
  ShimberBerrisFortDetonation,
  CartonBlackEyepatchProfile,
  YpresTrenchBarrageSplit,
  AmputationSeveredHandFracture,
  SommeLaBoisselleTally,
  CartonSkullBulletSurvival,
  VictoriaCrossBronzeCard,
  PolishSovietBorderMapVector,
  BiplaneSmokingCrashWreck,
  CossackCavalryVsTrainSplit,
  ArmouredTrainHighSpeedLeap,
  CartonMajorGeneralWw2,
  SunderlandFlyingBoatFjord,
  BomberOceanImpactSplash,
  VincigliataCastlePowSplit,
  BedrockTunnelBreakoutFracture,
  CartonPeasantDisguiseLeader,
  CartonVsMaoDiplomaticSplit,
  TotalCareerWoundsTallyBoard,
  HappyOdysseyMemoirDossier,
  CartonFinalSeamlessLoopHero,
} from './CartonDeWiartVectors';
import { loadFont as loadCourierPrime } from '@remotion/google-fonts/CourierPrime';
import { loadFont as loadCaveat } from '@remotion/google-fonts/Caveat';
import { loadFont as loadBlackOpsOne } from '@remotion/google-fonts/BlackOpsOne';
import { loadFont as loadBarlowCondensed } from '@remotion/google-fonts/BarlowCondensed';

const courier = loadCourierPrime();
const caveat = loadCaveat();
const blackOps = loadBlackOpsOne();
const barlow = loadBarlowCondensed();

interface SilhouetteProps {
  assetId: string;
  durationFrames?: number;
}

/**
 * Reusable Paper-Cut Airbase Horizon Buildings (Strictly positioned at y > 1360)
 */
const PaperHorizonAirbase: React.FC = () => (
  <g opacity="0.52">
    {[110, 350, 620].map((bx, idx) => (
      <g key={idx} transform={`translate(${bx}, 1365)`}>
        <rect
          width="170"
          height="135"
          fill="#354B5E"
          stroke="#1E2B37"
          strokeWidth="3"
        />
        {[18, 56, 94, 132].map((wx) =>
          [20, 56, 92].map((wy) => (
            <rect
              key={`${wx}-${wy}`}
              x={wx}
              y={wy}
              width="24"
              height="22"
              fill={(wx + wy + idx) % 3 === 0 ? '#E8C56B' : '#9CB2C9'}
            />
          ))
        )}
      </g>
    ))}
  </g>
);

/**
 * Reusable Paper-Cut Dhaka Horizon Skyline (Strictly positioned at y > 1365)
 */
const PaperHorizonDhaka: React.FC = () => (
  <g opacity="0.45">
    {[80, 260, 480, 700, 910].map((bx, idx) => (
      <g key={idx} transform={`translate(${bx}, 1370)`}>
        <rect width="130" height="110" fill="#202A36" stroke="#121820" strokeWidth="2.5" />
        {[14, 48, 82].map((wx) => (
          <rect key={wx} x={wx} y="24" width="20" height="34" fill={(wx + idx) % 2 === 0 ? '#E8C56B' : '#738A9C'} />
        ))}
      </g>
    ))}
    <path d="M 0 1480 L 1080 1480 L 1080 1920 L 0 1920 Z" fill="#14181F" />
  </g>
);

/**
 * Taped Light-Blue Office Pad Directive Sheet (18 March 1971)
 */
const BlueOfficePadDirectiveCard: React.FC = () => {
  const frame = useCurrentFrame();
  const stampProgress = interpolate(frame - 68, [0, 4], [2.1, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const showStamp = frame >= 68;

  return (
    <div
      style={{
        position: 'absolute',
        left: 72,
        top: 865,
        width: 560,
        backgroundColor: '#D4E6F1',
        borderRadius: 4,
        padding: '24px 26px 84px 26px',
        transform: 'rotate(-2.2deg)',
        boxShadow: '0 16px 36px rgba(0,0,0,0.72), 0 2px 6px rgba(0,0,0,0.4)',
        border: '1px solid rgba(20, 22, 25, 0.18)',
        zIndex: 18,
      }}
    >
      {/* Vertical Masking Tape Tab */}
      <div
        style={{
          position: 'absolute',
          top: -24,
          left: 48,
          width: 42,
          height: 52,
          backgroundColor: 'rgba(242, 236, 220, 0.85)',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          transform: 'rotate(1.5deg)',
          clipPath: 'polygon(4% 0%, 35% 4%, 68% 0%, 98% 3%, 100% 96%, 72% 100%, 34% 96%, 0% 100%)',
        }}
      />
      {/* Dark Header Tag */}
      <div
        style={{
          backgroundColor: '#161E28',
          padding: '6px 14px',
          borderRadius: 3,
          display: 'inline-block',
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 20,
            fontWeight: 700,
            color: '#F4EFE6',
            letterSpacing: '1.5px',
          }}
        >
          GOC OFFICE • 18 MAR 1971
        </span>
      </div>

      {/* Typewriter Lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: courier.fontFamily, fontSize: 18, fontWeight: 700, color: '#1B242E' }}>
        <div>AUTHORS: GEN. FARMAN & GEN. RAJA</div>
        <div>FORMAT: 16 PARAGRAPHS • 5 PAGES</div>
        <div>MEDIUM: LEAD PENCIL ON BLUE PAD</div>
      </div>

      {/* Red Highlight Bar */}
      <div
        style={{
          marginTop: 14,
          backgroundColor: '#C1272D',
          padding: '8px 12px',
          borderRadius: 3,
          fontFamily: courier.fontFamily,
          fontSize: 18,
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '1px',
        }}
      >
        TARGET: 100% SUCCESS IN DHAKA
      </div>

      {/* Handwritten Cursive Note Below */}
      <div
        style={{
          marginTop: 14,
          fontFamily: caveat.fontFamily,
          fontSize: 28,
          fontWeight: 700,
          color: '#2B3440',
          transform: 'rotate(-1deg)',
        }}
      >
        reviewed at Flag Staff House on 20 March
      </div>

      {/* Translucent Red Stamp Slam "APPROVED" in open lower-right corner */}
      {showStamp && (
        <div
          style={{
            position: 'absolute',
            bottom: 14,
            right: 20,
            transform: `rotate(-6deg) scale(${stampProgress})`,
            border: '5px solid #C1272D',
            borderRadius: 8,
            padding: '4px 18px',
            backgroundColor: 'rgba(193, 39, 45, 0.14)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: blackOps.fontFamily,
              fontSize: 38,
              color: '#C1272D',
              letterSpacing: '3.5px',
              lineHeight: 1.0,
            }}
          >
            APPROVED
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Taped 3rd SSG Commando Radio Intercept & Dispatch Card (Dhanmondi 32)
 */
const DhanmondiSsgDispatchCard: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 72,
        top: 895,
        width: 560,
        backgroundColor: '#E8E1D5',
        borderRadius: 4,
        padding: '24px 26px 26px 26px',
        transform: 'rotate(-1.8deg)',
        boxShadow: '0 16px 36px rgba(0,0,0,0.72), 0 2px 6px rgba(0,0,0,0.4)',
        border: '1px solid rgba(20, 22, 25, 0.2)',
        zIndex: 18,
      }}
    >
      {/* Masking tape tab */}
      <div
        style={{
          position: 'absolute',
          top: -24,
          left: 54,
          width: 42,
          height: 52,
          backgroundColor: 'rgba(242, 236, 220, 0.85)',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          transform: 'rotate(-2deg)',
          clipPath: 'polygon(4% 0%, 35% 4%, 68% 0%, 98% 3%, 100% 96%, 72% 100%, 34% 96%, 0% 100%)',
        }}
      />
      {/* Header pill */}
      <div
        style={{
          backgroundColor: '#1E252E',
          padding: '6px 14px',
          borderRadius: 3,
          display: 'inline-block',
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 20,
            fontWeight: 700,
            color: '#F4EFE6',
            letterSpacing: '1.5px',
          }}
        >
          3RD SSG COMMANDO LOG
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: courier.fontFamily, fontSize: 18, fontWeight: 700, color: '#1B242E' }}>
        <div>DATE: 26 MAR 1971 • 01:10 AM</div>
        <div>TARGET: HOUSE 32, DHANMONDI</div>
        <div>CODE: "BIG BIRD IN CAGE"</div>
      </div>

      <div
        style={{
          marginTop: 14,
          backgroundColor: '#C1272D',
          padding: '8px 12px',
          borderRadius: 3,
          fontFamily: courier.fontFamily,
          fontSize: 18,
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '1px',
        }}
      >
        INDEPENDENCE WIRED ON EPR TX
      </div>

      <div
        style={{
          marginTop: 14,
          fontFamily: caveat.fontFamily,
          fontSize: 28,
          fontWeight: 700,
          color: '#2B3440',
          transform: 'rotate(-1deg)',
        }}
      >
        Sheikh Mujib arrested by Maj. Bilal
      </div>
    </div>
  );
};

export const SceneVectorAsset: React.FC<SilhouetteProps> = ({
  assetId,
  durationFrames = 192,
}) => {
  const frame = useCurrentFrame();

  switch (assetId) {
    // ========================================================
    // 1. SEARCHLIGHT_HOOK_CONVOY
    // ========================================================
    case 'SEARCHLIGHT_HOOK_CONVOY': {
      const tankProgress = interpolate(frame, [0, durationFrames], [-120, 260], { extrapolateRight: 'clamp' });
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <PaperHorizonDhaka />
            <g transform={`translate(${tankProgress}, 1200) scale(0.74)`}>
              <M24ChaffeeTankSilhouette showSearchlight={true} showCommander={true} />
            </g>
          </svg>

          {/* Tilted Light-Blue Office Pad Directive Tag Card */}
          <div
            style={{
              position: 'absolute',
              left: 72,
              top: 865,
              width: 520,
              backgroundColor: '#D4E6F1',
              borderRadius: 4,
              padding: '22px 24px',
              transform: 'rotate(-2.4deg)',
              boxShadow: '0 16px 36px rgba(0,0,0,0.72), 0 2px 6px rgba(0,0,0,0.4)',
              border: '1px solid rgba(20, 22, 25, 0.18)',
              zIndex: 18,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -24,
                left: 42,
                width: 40,
                height: 50,
                backgroundColor: 'rgba(242, 236, 220, 0.85)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                transform: 'rotate(2deg)',
                clipPath: 'polygon(4% 0%, 35% 4%, 68% 0%, 98% 3%, 100% 96%, 72% 100%, 34% 96%, 0% 100%)',
              }}
            />
            <div
              style={{
                backgroundColor: '#161E28',
                padding: '6px 14px',
                borderRadius: 3,
                display: 'inline-block',
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontFamily: courier.fontFamily,
                  fontSize: 19,
                  fontWeight: 700,
                  color: '#F4EFE6',
                  letterSpacing: '1.5px',
                }}
              >
                OP. SEARCHLIGHT • 5 PAGES
              </span>
            </div>
            <div
              style={{
                fontFamily: barlow.fontFamily,
                fontSize: 32,
                fontWeight: 900,
                color: '#161E28',
                letterSpacing: '1.5px',
                lineHeight: 1.1,
              }}
            >
              16 PARAGRAPHS IN LEAD PENCIL
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: caveat.fontFamily,
                fontSize: 26,
                fontWeight: 700,
                color: '#2B3440',
                transform: 'rotate(-1deg)',
              }}
            >
              Dhaka Cantonment • 18 March 1971
            </div>
          </div>

          <CutoutPuppet
            character="TIKKA"
            outfit="KHAKI_GENERAL"
            x={815}
            y={1270}
            scale={0.82}
            initialPose="NEUTRAL"
            switchedPose="POINTING"
            poseSwitchFrame={45}
            paperTagLabel="18 MAR 1971"
          />
        </div>
      );
    }

    // ========================================================
    // 2. SEARCHLIGHT_GATE_BREACH
    // ========================================================
    case 'SEARCHLIGHT_GATE_BREACH': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <HingedCutoutReveal
            exteriorTitle="DHAKA CANTONMENT"
            exteriorSub="25 MAR • 23:30 HRS"
            interiorTitle="ZERO HOUR LAUNCHED"
            interiorLines={['90 MIN AHEAD OF SCHEDULE', 'ALL COMMS CUT OFF']}
            openFrame={14}
            x={330}
            y={1145}
          />
          <CutoutPuppet
            character="TIKKA"
            outfit="KHAKI_GENERAL"
            x={850}
            y={1265}
            scale={0.8}
            initialPose="POINTING"
            switchedPose="STRUGGLING"
            poseSwitchFrame={22}
            paperTagLabel="57TH BRIGADE"
          />
        </div>
      );
    }

    // ========================================================
    // 3. EAST_WEST_FLAGS_RADAR_BANNER
    // ========================================================
    case 'EAST_WEST_FLAGS_RADAR_BANNER': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <WavingFlagSvg
            flagImage="plates/bangladesh_flag.png"
            width={540}
            height={360}
            x={95}
            y={910}
            showPole={true}
            showRadarRings={true}
          />
          <CutoutPuppet
            character="MUJIB"
            outfit="MUJIB_COAT"
            x={815}
            y={1255}
            scale={0.86}
            initialPose="POINTING"
            switchedPose="SALUTE"
            poseSwitchFrame={68}
            paperTagLabel="EAST BENGAL • 1971"
          />
        </div>
      );
    }

    // ========================================================
    // 4. ELECTION_167_SEATS_COUNTER
    // ========================================================
    case 'ELECTION_167_SEATS_COUNTER': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <PaperSignCounter
            tagText="1970 GENERAL ELECTION"
            startValue={0}
            endValue={167}
            suffix=" / 313"
            subLabel="AWAMI LEAGUE ABSOLUTE MAJORITY"
            x={355}
            y={1060}
            width={600}
            rollStartFrame={6}
            rollDurationFrames={56}
            highlightRedOnEnd={true}
            showSignPoles={true}
          />
          <CutoutPuppet
            character="MUJIB"
            outfit="MUJIB_COAT"
            x={855}
            y={1275}
            scale={0.78}
            initialPose="POINTING"
            switchedPose="STRUGGLING"
            poseSwitchFrame={68}
            handwrittenLabel="Sheikh Mujibur Rahman"
          />
        </div>
      );
    }

    // ========================================================
    // 5. COMMAND_RESIGNATION_INTERCEPT
    // ========================================================
    case 'COMMAND_RESIGNATION_INTERCEPT': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <CascadingPaperStack
            x={370}
            y={1140}
            width={540}
            items={[
              { text: 'ADM. S.M. AHSAN', subText: 'GOVERNOR • RESIGNED IN PROTEST', triggerFrame: 8 },
              { text: 'LT. GEN. YAKUB KHAN', subText: 'GOC EAST • REFUSED FORCE', triggerFrame: 34 },
              { text: 'LT. GEN. TIKKA KHAN', subText: 'APPOINTED MARTIAL LAW ADMIN', triggerFrame: 68, accentRed: true },
            ]}
          />
          <CutoutPuppet
            character="TIKKA"
            outfit="KHAKI_GENERAL"
            x={820}
            y={1265}
            scale={0.82}
            initialPose="NEUTRAL"
            switchedPose="POINTING"
            poseSwitchFrame={68}
            paperTagLabel="GEN. TIKKA KHAN"
          />
        </div>
      );
    }

    // ========================================================
    // 6. BLUE_OFFICE_PAD_DIRECTIVE_CARD
    // ========================================================
    case 'BLUE_OFFICE_PAD_DIRECTIVE_CARD': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <BlueOfficePadDirectiveCard />
          <CutoutPuppet
            character="YAHYA"
            outfit="KHAKI_GENERAL"
            x={825}
            y={1255}
            scale={0.82}
            initialPose="NEUTRAL"
            switchedPose="POINTING"
            poseSwitchFrame={68}
            paperTagLabel="GEN. YAHYA KHAN"
          />
        </div>
      );
    }

    // ========================================================
    // 7. MV_SWAT_PORT_SILHOUETTE
    // ========================================================
    case 'MV_SWAT_PORT_SILHOUETTE': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <path
              d="M 0 1480 Q 320 1450 640 1475 T 1080 1470 L 1080 1920 L 0 1920 Z"
              fill="#1A1815"
            />
            <g transform="translate(360, 1355) scale(0.72)">
              <MvSwatCargoShipSilhouette />
            </g>
          </svg>

          <PaperSignCounter
            tagText="CHITTAGONG PORT • MV SWAT"
            startValue={1000}
            endValue={9000}
            suffix=" TONS"
            subLabel="ARMS & AMMUNITION UNLOADED"
            x={355}
            y={985}
            width={600}
            rollStartFrame={6}
            rollDurationFrames={56}
            highlightRedOnEnd={true}
            showSignPoles={false}
          />

          <CutoutPuppet
            character="YAHYA"
            outfit="KHAKI_GENERAL"
            x={855}
            y={1270}
            scale={0.78}
            initialPose="PITCHING"
            switchedPose="POINTING"
            poseSwitchFrame={68}
            handwrittenLabel="stalled talks until 25 March"
          />
        </div>
      );
    }

    // ========================================================
    // 8. EBR_DISPERSION_SCHEMATIC
    // ========================================================
    case 'EBR_DISPERSION_SCHEMATIC': {
      return <EbrDispersionSchematicVector />;
    }

    // ========================================================
    // 9. MAP_DHAKA_OPERATION_VECTORS
    // ========================================================
    case 'MAP_DHAKA_OPERATION_VECTORS': {
      return <DhakaTacticalMapVector durationFrames={durationFrames} />;
    }

    // ========================================================
    // 10. PILKHANA_RAJARBAGH_ARMOR_CLASH
    // ========================================================
    case 'PILKHANA_RAJARBAGH_ARMOR_CLASH': {
      const flash = Math.sin(frame * 0.9) > 0.45;
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <path
              d="M 0 1485 Q 260 1455 600 1480 T 1080 1475 L 1080 1920 L 0 1920 Z"
              fill="#101217"
            />
            <g transform="translate(250, 1390) scale(0.72)">
              <M24ChaffeeTankSilhouette showSearchlight={true} showCommander={true} />
              {flash && (
                <g transform="translate(260, -74)">
                  <polygon points="0,-16 65,0 0,16 -10,0" fill="#F4B942" />
                  <circle cx="15" cy="0" r="14" fill="#FFFFFF" />
                </g>
              )}
            </g>
          </svg>

          <CascadingPaperStack
            x={365}
            y={990}
            width={540}
            items={[
              { text: 'PILKHANA EPR HQ', subText: '22ND BALUCH • 2,500 EPR TROOPS', triggerFrame: 8 },
              { text: 'RAJARBAGH POLICE LINES', subText: '32ND PUNJAB • TANKS VS .303 RIFLES', triggerFrame: 38, accentRed: true },
              { text: 'FELL AT DAWN', subText: 'SURVIVORS CROSSED BURIGANGA', triggerFrame: 68, accentRed: true },
            ]}
          />

          <CutoutPuppet
            character="OFFICER"
            outfit="COMBAT_FATIGUES"
            x={835}
            y={1275}
            scale={0.8}
            initialPose="POINTING"
            switchedPose="STRUGGLING"
            poseSwitchFrame={68}
            paperTagLabel="EPR & POLICE"
          />
        </div>
      );
    }

    // ========================================================
    // 11. DHAKA_UNIVERSITY_TARGET_BLUEPRINT
    // ========================================================
    case 'DHAKA_UNIVERSITY_TARGET_BLUEPRINT': {
      return <DhakaUniversityBlueprintVector />;
    }

    // ========================================================
    // 12. DHANMONDI_SSG_DISPATCH_CARD
    // ========================================================
    case 'DHANMONDI_SSG_DISPATCH_CARD': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <DhanmondiSsgDispatchCard />
          <CutoutPuppet
            character="MUJIB"
            outfit="MUJIB_COAT"
            x={820}
            y={1255}
            scale={0.84}
            initialPose="POINTING"
            switchedPose="NEUTRAL"
            poseSwitchFrame={68}
            paperTagLabel="DHANMONDI 32"
          />
        </div>
      );
    }

    // ========================================================
    // 13. KALURGHAT_RADIO_REVOLT_SILHOUETTE
    // ========================================================
    case 'KALURGHAT_RADIO_REVOLT_SILHOUETTE': {
      const waveRadius1 = (frame * 4) % 180;
      const waveRadius2 = (frame * 4 + 60) % 180;
      const waveRadius3 = (frame * 4 + 120) % 180;

      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <path
              d="M 0 1460 Q 220 1420 500 1450 T 1080 1430 L 1080 1920 L 0 1920 Z"
              fill="#18241D"
            />
            <g transform="translate(190, 880)">
              {[waveRadius1, waveRadius2, waveRadius3].map((rad, idx) => (
                <circle
                  key={idx}
                  cx="0"
                  cy="0"
                  r={rad}
                  fill="none"
                  stroke="#5BC0BE"
                  strokeWidth="2.5"
                  opacity={Math.max(0, 0.7 - rad / 180)}
                />
              ))}
              <line x1="0" y1="0" x2="0" y2="280" stroke="#3D566E" strokeWidth="6" />
              <line x1="-30" y1="280" x2="30" y2="280" stroke="#1B2631" strokeWidth="4" />
              <line x1="-30" y1="280" x2="0" y2="0" stroke="#2B3E52" strokeWidth="2.5" />
              <line x1="30" y1="280" x2="0" y2="0" stroke="#2B3E52" strokeWidth="2.5" />
              {[60, 120, 180, 240].map((ly) => (
                <line key={ly} x1="-18" y1={ly} x2="18" y2={ly} stroke="#2B3E52" strokeWidth="2" />
              ))}
              <circle cx="0" cy="0" r="10" fill="#E63946" />
              <circle cx="0" cy="0" r="22" fill="#E63946" opacity="0.35" />
            </g>
          </svg>

          <HingedCutoutReveal
            exteriorTitle="KALURGHAT RADIO"
            exteriorSub="CHITTAGONG • 27 MAR"
            interiorTitle="DECLARATION BROADCAST"
            interiorLines={['8TH EAST BENGAL REGIMENT', '53RD BRIGADE AMBUSHED AT KUMIRA']}
            openFrame={24}
            x={330}
            y={1145}
          />

          <CutoutPuppet
            character="ZIA"
            outfit="COMBAT_FATIGUES"
            x={850}
            y={1265}
            scale={0.8}
            initialPose="POINTING"
            switchedPose="SALUTE"
            poseSwitchFrame={68}
            paperTagLabel="MAJ. ZIAUR RAHMAN"
          />
        </div>
      );
    }

    // ========================================================
    // 14. C130_GREAT_FLY_IN_AIRLIFT
    // ========================================================
    case 'C130_GREAT_FLY_IN_AIRLIFT': {
      const c130X = interpolate(frame, [0, durationFrames], [-240, 960], { extrapolateRight: 'clamp' });
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <PaperHorizonAirbase />
            <g transform={`translate(${c130X}, 1285) scale(0.68)`}>
              <C130HerculesSilhouette showProps={true} />
            </g>
          </svg>

          <PaperSignCounter
            tagText="OPERATION GREAT FLY-IN"
            startValue={1}
            endValue={16}
            suffix=" BATTALIONS"
            subLabel="9TH & 16TH DIVISIONS AIRLIFTED"
            x={540}
            y={1010}
            width={860}
            rollStartFrame={6}
            rollDurationFrames={58}
            highlightRedOnEnd={true}
            showSignPoles={false}
          />
        </div>
      );
    }

    // ========================================================
    // 15. MUKTI_BAHINI_RESISTANCE_COUNTER
    // ========================================================
    case 'MUKTI_BAHINI_RESISTANCE_COUNTER': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <PaperSignCounter
            tagText="TIKKA KHAN DEADLINE: 10 APR"
            startValue={14}
            endValue={266}
            suffix=" DAYS"
            subLabel="9-MONTH GUERRILLA LIBERATION WAR"
            x={355}
            y={1055}
            width={600}
            rollStartFrame={6}
            rollDurationFrames={58}
            highlightRedOnEnd={true}
            showSignPoles={true}
          />
          <CutoutPuppet
            character="ZIA"
            outfit="COMBAT_FATIGUES"
            x={855}
            y={1275}
            scale={0.78}
            initialPose="NEUTRAL"
            switchedPose="SALUTE"
            poseSwitchFrame={68}
            paperTagLabel="MUKTI BAHINI"
          />
        </div>
      );
    }

    // ========================================================
    // 16. REFUGEE_EXODUS_TELEMETRY
    // ========================================================
    case 'REFUGEE_EXODUS_TELEMETRY': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <PaperSignCounter
            tagText="1971 HUMANITARIAN CRISIS"
            startValue={1}
            endValue={10}
            suffix=" MILLION"
            subLabel="REFUGEES FLED TO INDIA"
            x={355}
            y={1055}
            width={600}
            rollStartFrame={6}
            rollDurationFrames={58}
            highlightRedOnEnd={true}
            showSignPoles={true}
          />
          <CutoutPuppet
            character="MUJIB"
            outfit="MUJIB_COAT"
            x={855}
            y={1275}
            scale={0.78}
            initialPose="NEUTRAL"
            paperTagLabel="300K–3M KILLED"
          />
        </div>
      );
    }

    // ========================================================
    // 17. BANGLADESH_FLAG_VICTORY_SUNBURST
    // ========================================================
    case 'BANGLADESH_FLAG_VICTORY_SUNBURST': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <WavingFlagSvg
            flagImage="plates/bangladesh_flag.png"
            width={540}
            height={360}
            x={95}
            y={900}
            showPole={true}
            showRadarRings={true}
          />
          <CutoutPuppet
            character="ZIA"
            outfit="COMBAT_FATIGUES"
            x={815}
            y={1255}
            scale={0.86}
            initialPose="POINTING"
            switchedPose="SALUTE"
            poseSwitchFrame={68}
            paperTagLabel="16 DEC 1971 • VICTORY"
          />
        </div>
      );
    }

    // ========================================================
    // 18. SEARCHLIGHT_CLIMAX_ARCHIVAL_CARD
    // ========================================================
    case 'SEARCHLIGHT_CLIMAX_ARCHIVAL_CARD': {
      const compassSpin = (frame * 0.7) % 360;

      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <g transform="translate(540, 1065)">
              <circle r="440" fill="none" stroke="#5BC0BE" strokeWidth="2.5" strokeDasharray="14 12" transform={`rotate(${compassSpin})`} opacity="0.4" />
              <circle r="360" fill="none" stroke="#F4B942" strokeWidth="2" strokeDasharray="6 6" opacity="0.35" />
              <circle r="260" fill="none" stroke="#E63946" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.45" />
              <line x1="-480" y1="0" x2="480" y2="0" stroke="#5BC0BE" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.3" />
              <line x1="0" y1="-480" x2="0" y2="480" stroke="#5BC0BE" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.3" />
            </g>
          </svg>

          {/* Start Bookend Tag (Strictly width >= (11 * 34 * 0.72) + 80 = 350px) */}
          <div
            style={{
              position: 'absolute',
              left: 95,
              top: 1365,
              width: 410,
              backgroundColor: '#0C141E',
              border: '2.5px solid #E63946',
              borderRadius: 8,
              padding: '16px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 12px 28px rgba(0,0,0,0.7)',
              zIndex: 22,
            }}
          >
            <div
              style={{
                fontFamily: courier.fontFamily,
                fontSize: 16,
                fontWeight: 700,
                color: '#E63946',
                letterSpacing: '1.5px',
                whiteSpace: 'nowrap',
              }}
            >
              CRACKDOWN BEGAN
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: blackOps.fontFamily,
                fontSize: 34,
                color: '#F8F9FA',
                letterSpacing: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              25 MARCH
            </div>
            <div
              style={{
                marginTop: 4,
                fontFamily: barlow.fontFamily,
                fontSize: 22,
                fontWeight: 700,
                color: '#5BC0BE',
                letterSpacing: '1.5px',
                whiteSpace: 'nowrap',
              }}
            >
              23:30 HRS • DHAKA
            </div>
          </div>

          {/* End Bookend Tag (Strictly width >= (11 * 34 * 0.72) + 80 = 350px) */}
          <div
            style={{
              position: 'absolute',
              right: 95,
              top: 1365,
              width: 410,
              backgroundColor: '#0C141E',
              border: '2.5px solid #5BC0BE',
              borderRadius: 8,
              padding: '16px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 12px 28px rgba(0,0,0,0.7)',
              zIndex: 22,
            }}
          >
            <div
              style={{
                fontFamily: courier.fontFamily,
                fontSize: 16,
                fontWeight: 700,
                color: '#5BC0BE',
                letterSpacing: '1.5px',
                whiteSpace: 'nowrap',
              }}
            >
              SURRENDER SIGNED
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: blackOps.fontFamily,
                fontSize: 34,
                color: '#F8F9FA',
                letterSpacing: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              16 DECEMBER
            </div>
            <div
              style={{
                marginTop: 4,
                fontFamily: barlow.fontFamily,
                fontSize: 22,
                fontWeight: 700,
                color: '#F4B942',
                letterSpacing: '1.5px',
                whiteSpace: 'nowrap',
              }}
            >
              9 MONTHS • VICTORY
            </div>
          </div>

          <PaperCutoutCard
            imagePath="plates/mujibur_rahman.jpg"
            caption="Sheikh Mujibur Rahman, 1971"
            subCaption="25 MAR CRACKDOWN • 16 DEC INDEPENDENCE"
            top={800}
            width={330}
            height={380}
            rotateDeg={-2}
            framesPerBeat={22.5}
          />
        </div>
      );
    }

    case 'T33_BLUEPRINT_CALLOUT_NODES':
      return <T33BlueprintCallout />;

    case 'MAP_SINDH_KARACHI_TO_BORDER':
      return <SindhBorderTelemetry durationFrames={durationFrames} />;

    case 'TOPOGRAPHIC_FLIGHT_VECTOR':
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <SindhBorderTelemetry durationFrames={durationFrames} />
          <PaperSignCounter
            tagText="SINDH SECTOR • 1971"
            startValue={40}
            endValue={32}
            suffix=" MILES"
            subLabel="DISTANCE REMAINING TO BORDER"
            x={540}
            y={1355}
            width={860}
            rollStartFrame={6}
            rollDurationFrames={78}
            stampText="CRITICAL"
            stampFrame={96}
            highlightRedOnEnd={true}
            showSignPoles={false}
          />
        </div>
      );

    case 'T33_LOW_PASS_SILHOUETTE': {
      // Dynamic banking flyby across middle-lower sky + Die-Cut Hero Puppet in lower right
      const jetX = interpolate(frame, [0, durationFrames], [-280, 980], { extrapolateRight: 'clamp' });
      const jetY = 980 + Math.sin(frame / 8) * 18;
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            {/* Paper-Cut Airbase Horizon Buildings (Strictly y > 1360) */}
            <PaperHorizonAirbase />

            {/* Desert Horizon Silhouette */}
            <path
              d="M 0 1495 Q 280 1465 640 1490 T 1080 1480 L 1080 1920 L 0 1920 Z"
              fill="#1E1813"
            />

            {/* Low-altitude Jet Low Pass */}
            <g transform={`translate(${jetX}, ${jetY}) rotate(-8) scale(0.76)`}>
              <T33JetSilhouette showAfterburner={true} />
            </g>
          </svg>

          {/* Die-Cut Sticker Puppet of Pilot Officer Rashid Minhas */}
          <CutoutPuppet
            character="MINHAS"
            x={805}
            y={1275}
            scale={0.82}
            initialPose="NEUTRAL"
            switchedPose="SALUTE"
            poseSwitchFrame={48}
            outfit="FLIGHT_SUIT"
            paperTagLabel="AGE 20 • PAF"
          />
        </div>
      );
    }

    case 'T33_RED_COCKPIT_ALERT': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          {/* Hinged Cutout Door Reveal (like Reference 00:35 -> 00:37 Edison Machine) */}
          <HingedCutoutReveal
            exteriorTitle="T-33A COCKPIT"
            exteriorSub="BLUEBIRD-166"
            interiorTitle="REAR SEAT OVERRIDE"
            interiorLines={['DUAL LINKED CONTROLS', 'INSTRUCTOR SEIZED STICK']}
            openFrame={18}
            stampText="HIJACKED"
            x={365}
            y={1145}
          />

          {/* Die-Cut Hero Puppet Reacting to Betrayal */}
          <CutoutPuppet
            character="MINHAS"
            x={820}
            y={1265}
            scale={0.82}
            initialPose="STRUGGLING"
            outfit="FLIGHT_SUIT"
          />
        </div>
      );
    }

    case 'PAKISTAN_VERTICAL_BANNER_WITH_RADAR_RINGS': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          {/* Parametric 120-Slice Waving Flag on Left */}
          <WavingFlagSvg
            width={560}
            height={380}
            x={95}
            y={900}
            showPole={true}
            showRadarRings={true}
          />

          {/* Die-Cut Hero Puppet in Service Dress on Right (like Reference 00:05 Hero Card) */}
          <CutoutPuppet
            character="MINHAS"
            x={815}
            y={1255}
            scale={0.86}
            initialPose="POINTING"
            switchedPose="SALUTE"
            poseSwitchFrame={72}
            outfit="SERVICE_DRESS"
            paperTagLabel="NO. 2 SQUADRON"
          />
        </div>
      );
    }

    case 'T33_TAXIWAY_SILHOUETTE': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            {/* Runway Perspective Lines Reaching Horizon */}
            <line
              x1="80"
              y1="1840"
              x2="480"
              y2="1080"
              stroke="#5BC0BE"
              strokeWidth="4"
              strokeDasharray="24 18"
              opacity="0.45"
            />
            <line
              x1="920"
              y1="1840"
              x2="480"
              y2="1080"
              stroke="#5BC0BE"
              strokeWidth="4"
              strokeDasharray="24 18"
              opacity="0.45"
            />
            <line
              x1="480"
              y1="1920"
              x2="480"
              y2="1080"
              stroke="#F4B942"
              strokeWidth="8"
              strokeDasharray="36 24"
            />

            {/* Distant Control Tower on Horizon (Strictly y > 1350, away from jet nose) */}
            <g transform="translate(120, 1410) scale(0.55)" opacity="0.45">
              <rect x="0" y="30" width="36" height="110" fill="#070A0E" />
              <polygon points="-15,30 51,30 40,0 -4,0" fill="#0B1017" />
              <circle cx="18" cy="-8" r="5" fill="#E63946" />
            </g>

            {/* T-33 Taxiing SOLO: Empty Rear Cockpit (showInstructor = false) */}
            <g transform="translate(80, 1020) scale(0.78)">
              <T33JetSilhouette showAfterburner={false} showInstructor={false} />
            </g>
          </svg>

          <CutoutPuppet
            character="MINHAS"
            x={825}
            y={1270}
            scale={0.8}
            initialPose="NEUTRAL"
            switchedPose="SALUTE"
            poseSwitchFrame={60}
            outfit="FLIGHT_SUIT"
            handwrittenLabel="2nd solo flight"
          />
        </div>
      );
    }

    case 'INSTRUCTOR_TAXIWAY_INTERCEPT': {
      const slamScale = interpolate(frame, [72, 76], [2.0, 1.0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <line x1="0" y1="1500" x2="1080" y2="1500" stroke="#1E2836" strokeWidth="6" />

            {/* T-33 Nose Taxiing In on Left: SOLO (showInstructor = false) */}
            <g transform="translate(-210, 1140) scale(0.95)">
              <T33JetSilhouette showAfterburner={false} showInstructor={false} />
            </g>

            {/* Translucent Double-Bordered Red Stamp on Beat 2 */}
            {frame >= 72 && (
              <g transform="translate(420, 965)">
                <WeatheredMilitaryStamp
                  text="STOP"
                  subText="TAXIWAY INTERCEPT"
                  slamProgress={slamScale}
                />
              </g>
            )}
          </svg>

          {/* Instructor Puppet Outside on Tarmac Signaling Stop */}
          <CutoutPuppet
            character="INSTRUCTOR"
            x={800}
            y={1255}
            scale={0.84}
            initialPose="POINTING"
            switchedPose="STRUGGLING"
            poseSwitchFrame={72}
            outfit="INSTRUCTOR_SUIT"
            paperTagLabel="FLT. LT. RAHMAN"
          />
        </div>
      );
    }

    case 'T33_CANOPY_BREACH': {
      const shake = Math.sin(frame * 4) * 6;
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <g transform={`translate(${shake}, 0)`}>
              {/* Instructor Rahman is now inside the rear cockpit seizing controls */}
              <g transform="translate(70, 860) scale(0.88)">
                <T33JetSilhouette
                  showAfterburner={false}
                  highlightControls={true}
                  showInstructor={true}
                />
              </g>
            </g>
          </svg>

          {/* Cascading Paper Stack slamming on consecutive beats (like Reference 00:41 / 00:47) */}
          <CascadingPaperStack
            x={380}
            y={1285}
            width={540}
            items={[
              { text: 'REAR CANOPY BREACHED', subText: 'TAXIWAY INTERCEPT', triggerFrame: 12 },
              { text: 'DUAL STICK SEIZED', subText: 'LINKED MECHANICAL RODS', triggerFrame: 48, accentRed: true },
              { text: 'COURSE: INDIA', subText: 'FULL THROTTLE TAKEOFF', triggerFrame: 96, accentRed: true },
            ]}
          />

          <CutoutPuppet
            character="MINHAS"
            x={830}
            y={1275}
            scale={0.78}
            initialPose="NEUTRAL"
            switchedPose="STRUGGLING"
            poseSwitchFrame={48}
            outfit="FLIGHT_SUIT"
          />
        </div>
      );
    }

    case 'T33_LOW_ALTITUDE_AFTERBURNER': {
      const offsetX = interpolate(frame, [0, durationFrames], [-160, 860], { extrapolateRight: 'clamp' });
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <PaperSignCounter
            tagText="FLIGHT TELEMETRY"
            startValue={450}
            endValue={45}
            suffix=" FT AGL"
            subLabel="UNDER RADAR • HEADING EAST"
            x={540}
            y={1010}
            width={840}
            rollStartFrame={6}
            rollDurationFrames={72}
            highlightRedOnEnd={true}
            showSignPoles={false}
          />

          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <PaperHorizonAirbase />
            <path
              d="M 0 1510 Q 320 1475 680 1505 T 1080 1495 L 1080 1920 L 0 1920 Z"
              fill="#14100D"
            />
            <g transform={`translate(${offsetX}, 1295) scale(0.86)`}>
              <T33JetSilhouette showAfterburner={true} showInstructor={true} />
            </g>
          </svg>
        </div>
      );
    }

    case 'MILITARY_ATC_DISPATCH_CARD': {
      const stampScale = interpolate(frame, [72, 76], [2.1, 1.0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          {/* Taped Archival ATC Transcript Sheet on Left (inspired by Reference 00:43 & 00:46) */}
          <div
            style={{
              position: 'absolute',
              left: 72,
              top: 860,
              width: 560,
              backgroundColor: '#F4EFE6',
              padding: '34px 32px 30px 32px',
              transform: 'rotate(-2.2deg)',
              boxShadow: '0 20px 38px rgba(0,0,0,0.82)',
              border: '1px solid rgba(0,0,0,0.2)',
            }}
          >
            {/* Vertical Masking Tape Tab at Top Center */}
            <div
              style={{
                position: 'absolute',
                top: -22,
                left: '46%',
                width: 38,
                height: 48,
                backgroundColor: 'rgba(235, 228, 210, 0.85)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            />

            <div
              style={{
                fontFamily: blackOps.fontFamily,
                fontSize: 38,
                color: '#141619',
                letterSpacing: '2px',
                borderBottom: '4px solid #141619',
                paddingBottom: 8,
                marginBottom: 14,
              }}
            >
              MASROOR ATC LOG
            </div>

            <div
              style={{
                fontFamily: courier.fontFamily,
                fontSize: 22,
                fontWeight: 700,
                color: '#2B2F36',
                lineHeight: 1.45,
                textAlign: 'left',
              }}
            >
              <div>DATE: 20 AUG 1971 • 11:30 PKT</div>
              <div>CALLSIGN: BLUEBIRD-166 (T-33A)</div>
              <div>FREQ: 121.5 MHz GUARD</div>
              <div
                style={{
                  marginTop: 12,
                  padding: '8px 12px',
                  backgroundColor: '#C1272D',
                  color: '#F8F9FA',
                  fontSize: 24,
                }}
              >
                &quot;I AM BEING HIJACKED.&quot;
              </div>
            </div>

            {/* Translucent Red Rubber Stamp Slam Across Dispatch (like [INACCURATE] at 00:45) */}
            {frame >= 72 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: -64,
                  right: 14,
                  transform: `rotate(-8deg) scale(${stampScale})`,
                  border: '7px solid #C1272D',
                  borderRadius: 10,
                  padding: '5px 22px',
                  backgroundColor: 'rgba(193, 39, 45, 0.14)',
                }}
              >
                <div
                  style={{
                    border: '2.5px solid #C1272D',
                    borderRadius: 4,
                    padding: '2px 16px',
                    fontFamily: blackOps.fontFamily,
                    fontSize: 44,
                    color: '#C1272D',
                    letterSpacing: '4px',
                  }}
                >
                  CONFIRMED
                </div>
              </div>
            )}
          </div>

          {/* Handwritten Cursive Note Below Document (like "the regulator's letter, July 2016") */}
          <div
            style={{
              position: 'absolute',
              left: 95,
              top: 1325,
              fontFamily: caveat.fontFamily,
              fontSize: 40,
              fontWeight: 700,
              color: '#EAE3D2',
              transform: 'rotate(-2deg)',
              textShadow: '0 3px 10px rgba(0,0,0,0.9)',
            }}
          >
            Masroor Control Tower transcript, 11:30 AM
          </div>

          <CutoutPuppet
            character="MINHAS"
            x={825}
            y={1255}
            scale={0.82}
            initialPose="POINTING"
            switchedPose="STRUGGLING"
            poseSwitchFrame={72}
            outfit="FLIGHT_SUIT"
          />
        </div>
      );
    }

    case 'T33_ERRATIC_PITCH_SILHOUETTE': {
      const pitchAngle = Math.sin(frame / 2.2) * 22;
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <g
              transform={`translate(420, 1120) rotate(${pitchAngle}) translate(-340, -60) scale(0.88)`}
            >
              <T33JetSilhouette
                showAfterburner={true}
                highlightControls={true}
                showInstructor={true}
              />
            </g>

            {/* G-Force Stress Curvature Lines */}
            <g
              stroke="#E63946"
              strokeWidth="5"
              fill="none"
              opacity="0.72"
              strokeDasharray="20 14"
            >
              <path d="M 140 900 Q 420 780 700 900" />
              <path d="M 140 1340 Q 420 1460 700 1340" />
            </g>
          </svg>

          <CutoutPuppet
            character="MINHAS"
            x={830}
            y={1265}
            scale={0.8}
            initialPose="STRUGGLING"
            outfit="FLIGHT_SUIT"
            handwrittenLabel="fought with full body weight"
          />
        </div>
      );
    }

    case 'T33_CANOPY_EJECTION_RETICLE': {
      const canopyY = interpolate(frame, [0, durationFrames], [1150, 720], { extrapolateRight: 'clamp' });
      const canopyX = interpolate(frame, [0, durationFrames], [520, 340], { extrapolateRight: 'clamp' });
      const hijackerX = interpolate(frame, [0, durationFrames], [480, 820], { extrapolateRight: 'clamp' });
      const hijackerY = interpolate(frame, [0, durationFrames], [1160, 740], { extrapolateRight: 'clamp' });
      const hijackerRot = frame * 6;

      return (
        <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          {/* Canopy Jettisoned & Tumbling */}
          <g transform={`translate(${canopyX}, ${canopyY}) rotate(${frame * 4.5})`}>
            <path
              d="M -160 0 C -120 -80, 120 -80, 160 0 Z"
              fill="none"
              stroke="#E63946"
              strokeWidth="8"
            />
          </g>

          {/* Unstrapped Hijacker Matiur Rahman Thrown Clear into Slipstream */}
          <g transform={`translate(${hijackerX}, ${hijackerY}) rotate(${hijackerRot})`}>
            <circle cx="0" cy="-35" r="24" fill="#0A0E14" stroke="#E63946" strokeWidth="3" />
            <rect x="-18" y="-12" width="36" height="60" fill="#0A0E14" rx="4" />
            <line
              x1="-18"
              y1="0"
              x2="-65"
              y2="-45"
              stroke="#0A0E14"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <line
              x1="18"
              y1="0"
              x2="70"
              y2="40"
              stroke="#0A0E14"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <line
              x1="-10"
              y1="48"
              x2="-45"
              y2="110"
              stroke="#0A0E14"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <line
              x1="10"
              y1="48"
              x2="50"
              y2="105"
              stroke="#0A0E14"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <line
              x1="-80"
              y1="0"
              x2="80"
              y2="0"
              stroke="#E63946"
              strokeWidth="3"
              strokeDasharray="10 8"
            />
          </g>

          {/* Jet Low Dive Silhouette (Front pilot Minhas alone in cockpit: showInstructor = false) */}
          <g transform="translate(160, 1240) rotate(22) scale(0.88)">
            <T33JetSilhouette showAfterburner={true} showInstructor={false} />
          </g>

          {/* Translucent Red Rubber Stamp */}
          <g transform="translate(460, 1020) scale(0.85)">
            <WeatheredMilitaryStamp
              text="EJECTED"
              subText="CANOPY RELEASED IN SLIPSTREAM"
            />
          </g>
        </svg>
      );
    }

    case 'SUJAWAL_HORIZON_STAMP_STOPPED': {
      const slamScale = interpolate(frame, [48, 52], [2.2, 1.0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <path
              d="M 0 1520 L 320 1510 L 460 1430 L 540 1470 L 640 1410 L 760 1515 L 1080 1520 L 1080 1920 L 0 1920 Z"
              fill="#080706"
            />
            <g transform="translate(440, 1400)">
              <circle
                cx="0"
                cy={-60 - frame * 1.5}
                r={40 + frame * 0.7}
                fill="#14110E"
                opacity="0.45"
              />
              <circle
                cx="35"
                cy={-130 - frame * 1.5}
                r={60 + frame * 0.9}
                fill="#14110E"
                opacity="0.35"
              />
            </g>

            {frame >= 48 && (
              <g transform="translate(430, 1080)">
                <WeatheredMilitaryStamp
                  text="STOPPED."
                  subText="32 MILES FROM THE INDIAN BORDER"
                  slamProgress={slamScale}
                />
              </g>
            )}
          </svg>

          {/* Hero Puppet Saluting and Fading to Ghost (like Reference 00:48 Sacrifice Reveal) */}
          <CutoutPuppet
            character="MINHAS"
            x={825}
            y={1265}
            scale={0.82}
            initialPose="SALUTE"
            poseSwitchFrame={72}
            ghostOnSwitch={true}
            outfit="FLIGHT_SUIT"
            handwrittenLabel="Sujawal, 20 August 1971"
          />
        </div>
      );
    }

    case 'PAF_PILOTS_MARCH_SILHOUETTE': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          {/* Rolling Paper Placard Sign Counter (like Reference 00:01 & 00:52) */}
          <PaperSignCounter
            tagText="PAF SERVICE RECORD"
            startValue={1}
            endValue={160}
            suffix=" DAYS"
            subLabel="SHORTEST-SERVING OFFICER IN PAF HISTORY"
            x={540}
            y={1040}
            width={880}
            rollStartFrame={6}
            rollDurationFrames={68}
            stampText="YOUNGEST"
            stampFrame={84}
            showSignPoles={true}
          />

          <CutoutPuppet
            character="MINHAS"
            x={820}
            y={1285}
            scale={0.8}
            initialPose="SALUTE"
            outfit="SERVICE_DRESS"
          />
        </div>
      );
    }

    case 'NISHAN_E_HAIDER_MEDAL_SUNBURST': {
      const pulse = 1 + 0.05 * Math.sin(frame / 3.5);
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            {/* Authentic Nishan-e-Haider Medal Stack on Left-Center */}
            <g transform={`translate(400, 1120) scale(${pulse})`}>
              <g transform="translate(-80, -320)">
                <rect width="160" height="180" fill="#01411C" />
                <rect x="0" width="22" height="180" fill="#E63946" />
                <rect x="138" width="22" height="180" fill="#E63946" />
                <rect
                  y="165"
                  width="160"
                  height="20"
                  fill="#F4B942"
                  stroke="#8A6014"
                  strokeWidth="2"
                  rx="4"
                />
              </g>
              <polygon
                points="0,-160 40,-45 160,-45 65,30 100,150 0,75 -100,150 -65,30 -160,-45 -40,-45"
                fill="#222B24"
                stroke="#F4B942"
                strokeWidth="8"
              />
              <circle r="68" fill="#013617" stroke="#F4B942" strokeWidth="6" />
              <text
                y="14"
                textAnchor="middle"
                fill="#F4B942"
                fontFamily="'Black Ops One', sans-serif"
                fontSize="38"
              >
                NH
              </text>
            </g>
          </svg>

          <CutoutPuppet
            character="MINHAS"
            x={815}
            y={1255}
            scale={0.86}
            initialPose="SALUTE"
            outfit="SERVICE_DRESS"
            paperTagLabel="NISHAN-E-HAIDER"
          />
        </div>
      );
    }

    case 'SPOTLIGHT_MEMORIAL_PEDESTAL_T33': {
      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          {/* Taped Archival Polaroid on Left (like Reference 00:05 & 00:54) */}
          <PaperCutoutCard
            imagePath="plates/rashid_minhas.jpg"
            caption="PAF Base Minhas, Kamra"
            top={885}
            left="30%"
            width={260}
            height={300}
            rotateDeg={-3.5}
            framesPerBeat={24}
          />

          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <polygon points="680,300 320,1720 1040,1720" fill="#F8F9FA" opacity="0.08" />
            <path
              d="M 480 1420 L 920 1420 L 980 1640 L 420 1640 Z"
              fill="#0C1016"
              stroke="#1E2836"
              strokeWidth="3"
            />
            <g transform="translate(430, 1180) rotate(-22) scale(0.75)">
              <T33JetSilhouette showAfterburner={false} />
            </g>
          </svg>
        </div>
      );
    }

    case 'ROTATING_PAF_ROUNDEL_BADGE': {
      const spin = (frame * 0.8) % 360;

      return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          {/* Rotating Outer Tactical Compass Rings */}
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <g transform={`translate(540, 1150) rotate(${spin})`}>
              <circle
                r="310"
                fill="none"
                stroke="#F4B942"
                strokeWidth="2.5"
                strokeDasharray="18 14"
                opacity="0.38"
              />
              <circle
                r="270"
                fill="none"
                stroke="#5BC0BE"
                strokeWidth="2"
                strokeDasharray="10 8"
                opacity="0.45"
              />
            </g>
          </svg>

          {/* Start-vs-End Bookend Year Callout Tags (inspired by Reference 01:01–01:03) */}
          <div
            style={{
              position: 'absolute',
              left: 72,
              top: 1060,
              transform: 'rotate(-4deg)',
              textAlign: 'center',
              zIndex: 22,
            }}
          >
            <div
              style={{
                backgroundColor: '#EAE3D2',
                padding: '8px 18px',
                fontFamily: courier.fontFamily,
                fontSize: 22,
                fontWeight: 700,
                color: '#141619',
                boxShadow: '0 6px 14px rgba(0,0,0,0.65)',
              }}
            >
              2ND SOLO
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: caveat.fontFamily,
                fontSize: 40,
                fontWeight: 700,
                color: '#EAE3D2',
              }}
            >
              11:30 AM
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              right: 112,
              top: 1060,
              transform: 'rotate(3.5deg)',
              textAlign: 'center',
              zIndex: 22,
            }}
          >
            <div
              style={{
                backgroundColor: '#C1272D',
                padding: '8px 18px',
                fontFamily: courier.fontFamily,
                fontSize: 22,
                fontWeight: 700,
                color: '#F8F9FA',
                boxShadow: '0 6px 14px rgba(0,0,0,0.65)',
              }}
            >
              32 MILES
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: caveat.fontFamily,
                fontSize: 40,
                fontWeight: 700,
                color: '#EAE3D2',
              }}
            >
              1951–1971
            </div>
          </div>

          {/* Taped Polaroid Card of Pilot Officer Rashid Minhas Pulsing to Beat (top >= 880) */}
          <PaperCutoutCard
            imagePath="plates/rashid_minhas.jpg"
            caption="Rashid Minhas Shaheed, age 20"
            subCaption="PILOT OFFICER • NISHAN-E-HAIDER"
            top={900}
            width={330}
            height={380}
            rotateDeg={-2}
            framesPerBeat={24}
          />
        </div>
      );
    }

    // ========================================================
    // 28 OCTOBER 2009 PESHAWAR BOMBING SUITE
    // ========================================================
    case 'PESHAWAR_BAZAAR_STREET_SILHOUETTE':
      return <PeshawarBazaarAlleySilhouette />;

    case 'VEHICLE_BOMB_150KG_COUNTER':
      return <SedanBombSchematic />;

    case 'MEENA_BAZAAR_BLAST_IMPACT':
      return <BlastShockwaveVector />;

    case 'FIRE_AND_RUBBLE_PHOTO_CARD':
      return <FireAndRubblePhotoCard />;

    case 'RICKSHAW_CIVILIAN_RESCUE':
      return <RickshawRescueSilhouette />;

    case 'LADY_READING_HOSPITAL_CARD':
      return <LadyReadingHospitalEmergencyCard />;

    case 'PESHAWAR_137_CASUALTY_COUNTER':
      return <PeshawarCasualtiesCounter />;

    case 'CLINTON_ISLAMABAD_ARRIVAL':
      return <ClintonArrivalDiplomaticCard />;

    case 'WAZIRISTAN_TACTICAL_MAP':
      return <WaziristanOperationMapVector />;

    case 'INTELLIGENCE_DISAVOWAL_SCHEMATIC':
      return <IntelligenceDisavowalSchematic />;

    case 'CLINTON_QURESHI_PRESS_CARD':
      return <ClintonQureshiPressCard />;

    case 'CLINTON_STAND_SHOULDER_PUPPET':
      return <ClintonDiplomaticPuppetStage />;

    case 'ITALY_OLBIA_CONSPIRACY_MAP':
      return <ItalyOlbiaContinentalMapVector />;

    case 'PESHAWAR_RESILIENCE_REBUILD':
      return <PeshawarRebuildSilhouette />;

    case 'PESHAWAR_VICTIMS_MEMORIAL_CARD':
      return <PeshawarMemorialPlinth />;

    case 'PAKISTAN_FLAG_MEMORIAL_BANNER':
      return <PakistanFlagMemorialStage />;

    case 'PESHAWAR_EPILOGUE_PLAQUE':
      return <PeshawarEpilogueCard />;

    // ========================================================
    // 1960 U-2 INCIDENT COLD WAR ESPIONAGE SUITE
    // ========================================================
    case 'U2_SHATTERED_SPIN_STRATOSPHERE':
    case 'SHATTERED_U2_SPINNING_70000FT':
      return <U2ShatteredSpinStratosphereVector />;

    case 'PESHAWAR_AIRBASE_U2_DAWN':
      return <PeshawarAirbaseU2DawnSilhouette />;

    case 'U2_STRATOSPHERE_TELEMETRY':
      return <U2StratosphereTelemetryVector />;

    case 'GRAND_SLAM_CONTINENTAL_MAP':
      return <GrandSlamContinentalMapVector />;

    case 'HYCON_CAMERA_SCHEMATIC':
      return <HyconCameraSurveillanceSchematic />;

    case 'SOVIET_P30_RADAR_ALERT':
      return <SovietP30RadarAlertVector />;

    case 'S75_DVINA_LAUNCH_BATTERY':
      return <S75DvinaLaunchBatteryVector />;

    case 'U2_EXPLOSION_DESTRUCTION':
      return <U2ExplosionDestructionVector />;

    case 'POWERS_BAILOUT_CURARE_COIN':
      return <PowersBailoutAndCurareCoinCard />;

    case 'KGB_GROUND_CAPTURE':
      return <KgbGroundCaptureVector />;

    case 'NASA_COVER_UP_DOSSIER':
      return <NasaCoverUpDossierCard />;

    case 'FAKE_NASA_U2_SCHEMATIC':
      return <FakeNasaU2SchematicVector />;

    case 'KHRUSHCHEV_SOVIET_PODIUM':
      return <KhrushchevSupremeSovietPodiumStage />;

    case 'KHRUSHCHEV_SPEECH_BOMBSHELL':
      return <KhrushchevSpeechBombshellVector />;

    case 'GORKY_PARK_EXHIBITION':
    case 'GORKY_PARK_WRECKAGE_EXHIBITION':
      return <GorkyParkWreckageExhibitionVector />;

    case 'PARIS_SUMMIT_COLLAPSE':
      return <ParisSummitCollapseCard />;

    case 'MOSCOW_MILITARY_TRIBUNAL':
      return <MoscowMilitaryTribunalCard />;

    case 'GLIENICKE_BRIDGE_SPIES':
      return <GlienickeBridgeSpiesVector />;

    case 'SOVIET_AND_US_MEMORIAL':
    case 'WAVING_FLAG_SOVIET_US_STAGE':
      return <WavingFlagSovietUsStage />;

    case 'EPILOGUE_BRASS_PLAQUE':
    case 'U2_EPILOGUE_BRASS_PLAQUE':
      return <U2EpilogueBrassPlaqueCard />;

    // ========================================================
    // TAIPING REBELLION (1850-1864) VECTOR SCENE ASSETS
    // ========================================================
    case 'TAIPING_CONFRONTATION_OPENING':
      return <TaipingConfrontationOpening />;

    case 'HONG_FAILED_SCHOLAR_DESK':
      return <HongFailedScholarDesk />;

    case 'HONG_FEVER_DREAM_VISION':
      return <HongFeverDreamVision />;

    case 'CLEANSE_THE_DEMONS_STAGE':
      return <CleanseTheDemonsStage />;

    case 'CUTTING_IMPERIAL_QUEUE_SILHOUETTE':
      return <CuttingImperialQueueSilhouette />;

    case 'JINTIAN_UPRISING_FLAG_STAGE':
      return <JintianUprisingFlagStage />;

    case 'MILLION_MAN_MARCH_TALLY_STAGE':
      return <MillionManMarchTallyStage />;

    case 'TAIPING_CAMPAIGN_TACTICAL_MAP':
      return <TaipingCampaignTacticalMap />;

    case 'YANGTZE_WAR_JUNKS_FLEET':
      return <YangtzeWarJunksFleet />;

    case 'NANJING_GATE_BREACHED_STAGE':
      return <NanjingGateBreachedStage />;

    case 'HEAVENLY_CAPITAL_THRONE_STAGE':
      return <HeavenlyCapitalThroneStage />;

    case 'SACRED_TREASURY_PROCLAMATION_STAGE':
      return <SacredTreasuryProclamationStage />;

    case 'TIANJING_INCIDENT_PURGE_STAGE':
      return <TianjingIncidentPurgeStage />;

    case 'XIANG_ARMY_SIEGE_ENCIRCLEMENT_MAP':
      return <XiangArmySiegeEncirclementMap />;

    case 'STARVATION_IN_CAPITAL_STAGE':
      return <StarvationInCapitalStage />;

    case 'HONG_XIUQUAN_DEATH_BIER_STAGE':
      return <HongXiuquanDeathBierStage />;

    case 'GUNPOWDER_TUNNEL_MINE_EXPLOSION':
      return <GunpowderTunnelMineExplosion />;

    case 'BREACH_MELEE_SLAUGHTER_STAGE':
      return <BreachMeleeSlaughterStage />;

    case 'THIRTY_MILLION_CASUALTY_TALLY_STAGE':
      return <ThirtyMillionCasualtyTallyStage />;

    case 'SHATTERED_EMPIRE_EPILOGUE_STAGE':
      return <ShatteredEmpireEpilogueStage />;

    case 'COWBOY_WAR_COLLAPSE_OPENING':
      return <CowboyWarCollapseOpening />;

    case 'COWBOY_LIPIZZANER_STALLION_HERO':
      return <CowboyLipizzanerStallionHero />;

    case 'COWBOY_RED_ARMY_FAMINE_ADVANCE':
      return <CowboyRedArmyFamineAdvance />;

    case 'COWBOY_HUNGARIAN_STUD_MASSACRE':
      return <CowboyHungarianStudMassacre />;

    case 'COWBOY_WEHRMACHT_VETS_PACT':
      return <CowboyWehrmachtVetsPact />;

    case 'COWBOY_RADIO_CALL_TO_PATTON':
      return <CowboyRadioCallToPatton />;

    case 'COWBOY_PATTON_COMMAND_GREENLIGHT':
      return <CowboyPattonCommandGreenlight />;

    case 'COWBOY_TWENTY_MILES_BEHIND_LINES':
      return <CowboyTwentyMilesBehindLines />;

    case 'COWBOY_PATTONS_GHOSTS_CHARGE':
      return <CowboyPattonsGhostsCharge />;

    case 'COWBOY_HOSTAU_GATES_REACHED':
      return <CowboyHostauGatesReached />;

    case 'COWBOY_ALLIED_POWS_LIBERATION':
      return <CowboyAlliedPowsLiberation />;

    case 'COWBOY_ARMING_WEHRMACHT_BROTHERS':
      return <CowboyArmingWehrmachtBrothers />;

    case 'COWBOY_COSSACK_CAVALRY_PRINCE_AMASSOV':
      return <CowboyCossackCavalryPrinceAmassov />;

    case 'COWBOY_WAFFEN_SS_AMBUSH':
      return <CowboyWaffenSsAmbush />;

    case 'COWBOY_SIDE_BY_SIDE_DEFENSE':
      return <CowboySideBySideDefense />;

    case 'COWBOY_SS_RETREAT_HEAVY_LOSSES':
      return <CowboySsRetreatHeavyLosses />;

    case 'COWBOY_CAPT_STEWART_EVACUATION_ORDER':
      return <CowboyCaptStewartEvacuationOrder />;

    case 'COWBOY_MASS_LIPIZZANER_STAMPEDE':
      return <CowboyMassLipizzanerStampede />;

    case 'COWBOY_SOVIET_T34_RIDGE_ARRIVAL':
      return <CowboySovietT34RidgeArrival />;

    case 'COWBOY_US_ARMY_TRUCK_CONVOY':
      return <CowboyUsArmyTruckConvoy />;

    case 'COWBOY_EPILOGUE_SPANISH_RIDING_SCHOOL':
      return <CowboyEpilogueSpanishRidingSchool />;

    // ========================================================
    // 1942-1943 ALEUTIAN ISLANDS CAMPAIGN VECTOR SCENE ASSETS
    // ========================================================
    case 'ALEUTIAN_FORGOTTEN_INVASION_OPENING':
      return <AleutianForgottenInvasionOpening />;

    case 'ALEUTIAN_ARCHIPELAGO_VECTOR_MAP':
      return <AleutianArchipelagoVectorMap />;

    case 'ALEUTIAN_DUTCH_HARBOR_BOMBING':
      return <AleutianDutchHarborBombing />;

    case 'ALEUTIAN_ATTU_KISKA_OCCUPATION_FLAG':
      return <AleutianAttuKiskaOccupationFlag />;

    case 'ALEUTIAN_AKUTAN_ZERO_BOG_CRASH':
      return <AleutianAkutanZeroBogCrash />;

    case 'ALEUTIAN_AKUTAN_ZERO_SCHEMATIC':
      return <AleutianAkutanZeroSchematic />;

    case 'ALEUTIAN_B24_FOG_MOUNTAIN_HAZARD':
      return <AleutianB24FogMountainHazard />;

    case 'ALEUTIAN_KOMANDORSKI_CRUISER_DUEL':
      return <AleutianKomandorskiCruiserDuel />;

    case 'ALEUTIAN_ATTU_AMPHIBIOUS_LANDING':
      return <AleutianAttuAmphibiousLanding />;

    case 'ALEUTIAN_HIGH_RIDGE_MIST_FIRE':
      return <AleutianHighRidgeMistFire />;

    case 'ALEUTIAN_TUNDRA_FROSTBITE_TOLL':
      return <AleutianTundraFrostbiteToll />;

    case 'ALEUTIAN_CASTNERS_CUTTHROATS_CLIMB':
      return <AleutianCastnersCutthroatsClimb />;

    case 'ALEUTIAN_ENGINEER_HILL_BANZAI':
      return <AleutianEngineerHillBanzai />;

    case 'ALEUTIAN_ATTU_SURVIVOR_TALLY':
      return <AleutianAttuSurvivorTally />;

    case 'ALEUTIAN_KISKA_FORTRESS_MAP':
      return <AleutianKiskaFortressMap />;

    case 'ALEUTIAN_KIMURA_FOG_ESCAPE':
    case 'ALEUTIAN_KIMURA_FOG_EVACUATION':
      return <AleutianKimuraFogEscape />;

    case 'ALEUTIAN_EMPTY_ISLAND_BOMBARDMENT':
      return <AleutianEmptyIslandBombardment />;

    case 'ALEUTIAN_OPERATION_COTTAGE_EMPTY_BEACH':
      return <AleutianOperationCottageEmptyBeach />;

    case 'ALEUTIAN_FRIENDLY_FIRE_FOG_PHANTOMS':
      return <AleutianFriendlyFireFogPhantoms />;

    case 'ALEUTIAN_KISKA_GHOST_TOLL_COUNTER':
      return <AleutianKiskaGhostTollCounter />;

    case 'ALEUTIAN_EPILOGUE_MEMORIAL_STAGE':
      return <AleutianEpilogueMemorialStage />;

    case 'PRIMARY_SOURCE_QUOTE_CARD':
    case 'QUOTE_CARD': {
      const pulse = Math.sin(frame / 10) * 0.5 + 0.5;
      const scanY = 930 + ((frame * 3.2) % 480);
      return (
        <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <radialGradient id="quoteBacklight" cx="50%" cy="62%" r="42%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.22 + pulse * 0.08} />
              <stop offset="100%" stopColor="#0A1118" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="540" cy="1180" r="420" fill="url(#quoteBacklight)" />
          {/* Parametric Declassified Intercept / Telegraph Frame in Artwork Safe Zone (y=864..1498) */}
          <g transform="translate(140, 900)">
            <rect
              x="0"
              y="0"
              width="800"
              height="520"
              rx="12"
              fill="#090D12"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeOpacity="0.45"
            />
            {/* Corner Registration Reticles */}
            <path d="M 0 36 L 0 0 L 36 0" fill="none" stroke="#F4F7FA" strokeWidth="4" />
            <path d="M 764 0 L 800 0 L 800 36" fill="none" stroke="#F4F7FA" strokeWidth="4" />
            <path d="M 0 484 L 0 520 L 36 520" fill="none" stroke="#F4F7FA" strokeWidth="4" />
            <path d="M 764 520 L 800 520 L 800 484" fill="none" stroke="#F4F7FA" strokeWidth="4" />
            {/* Oversized Vector Quotation Mark Silhouette */}
            <path
              d="M 70 110 C 70 65 105 40 155 40 L 155 82 C 125 82 112 96 112 122 L 150 122 L 150 195 L 70 195 Z M 185 110 C 185 65 220 40 270 40 L 270 82 C 240 82 227 96 227 122 L 265 122 L 265 195 L 185 195 Z"
              fill="#E63228"
              opacity={0.75 + pulse * 0.25}
            />
            {/* Redacted Declassification Bars (Zero-Text Visual Metaphor) */}
            <rect x="70" y="240" width="640" height="22" rx="4" fill="#162636" />
            <rect
              x="70"
              y="240"
              width={interpolate(frame, [0, 45], [0, 520], { extrapolateRight: 'clamp' })}
              height="22"
              rx="4"
              fill="#F4F7FA"
              opacity="0.85"
            />
            <rect x="70" y="290" width="580" height="22" rx="4" fill="#162636" />
            <rect
              x="70"
              y="290"
              width={interpolate(frame, [10, 55], [0, 460], { extrapolateRight: 'clamp' })}
              height="22"
              rx="4"
              fill="#E63228"
              opacity="0.9"
            />
            {/* Continuous Micro-Motion: Live Audio / Telegraph Intercept Waveform */}
            <g transform="translate(70, 410)">
              {Array.from({ length: 32 }).map((_, idx) => {
                const barH = 18 + Math.abs(Math.sin(frame / 6 + idx * 0.45)) * 68;
                return (
                  <rect
                    key={idx}
                    x={idx * 20.5}
                    y={-barH / 2}
                    width="11"
                    height={barH}
                    rx="3"
                    fill={idx % 4 === 0 ? '#E63228' : '#38BDF8'}
                    opacity={0.55 + 0.35 * Math.sin(frame / 8 + idx)}
                  />
                );
              })}
            </g>
          </g>
          {/* Continuous Scanning Line */}
          <line
            x1="150"
            y1={scanY}
            x2="930"
            y2={scanY}
            stroke="#38BDF8"
            strokeWidth="2"
            opacity="0.35"
          />
        </svg>
      );
    }

    // ========================================================
    // 2026 BINANCE HEIST & NORTH KOREA CYBER OFFENSIVE
    // ========================================================
    case 'BINANCE_ALERT_QUOTE_CARD':
      return <BinanceAlertQuoteCard />;

    case 'KOREA_PENINSULA_NIGHT_SATELLITE':
      return <KoreaPeninsulaNightSatellite />;

    case 'UNIT_121_CYBER_BUNKER':
      return <Unit121CyberBunker />;

    case 'PYONGYANG_CONSCRIPT_CADETS_TALLY':
      return <PyongyangConscriptCadetsTally />;

    case 'PARALLEL_WORLDS_SPLIT':
      return <ParallelWorldsSplit />;

    case 'BINANCE_HOT_VAULT_BREACH':
      return <BinanceHotVaultBreach />;

    case 'GLOBAL_BALANCES_DRAINING_TALLY':
      return <GlobalBalancesDrainingTally />;

    case 'SINGAPORE_WAR_ROOM_ENGINEER':
      return <SingaporeWarRoomEngineer />;

    case 'TEN_BLOCKCHAINS_LIQUIDITY_MAP':
      return <TenBlockchainsLiquidityMap />;

    case 'EMERGENCY_FREEZE_SHATTER':
      return <EmergencyFreezeShatter />;

    case 'UN_INTELLIGENCE_ROCKET_QUOTE':
      return <UnIntelligenceRocketQuote />;

    case 'HWASONG_ICBM_SNOW_TRANSIT':
      return <HwasongIcbmSnowTransit />;

    case 'ROCKET_ENGINE_TEST_IGNITION':
      return <RocketEngineTestIgnition />;

    case 'BINANCE_LEADERSHIP_BAILOUT':
      return <BinanceLeadershipBailout />;

    case 'VAULT_RESERVES_RESTORATION_SPLIT':
      return <VaultReservesRestorationSplit />;

    case 'BORDER_WALLS_DEFEATED_MAP':
      return <BorderWallsDefeatedMap />;

    case 'MEDALS_ON_CHILD_SOLDIERS_TALLY':
      return <MedalsOnChildSoldiersTally />;

    case 'ISOLATED_HACKER_DARK_CELL':
      return <IsolatedHackerDarkCell />;

    case 'DIGITAL_FORTRESS_COLLAPSE':
      return <DigitalFortressCollapse />;

    case 'CYBER_DOCTRINE_DOSSIER_QUOTE':
      return <CyberDoctrineDossierQuote />;

    case 'SMARTPHONE_VS_SILO_SPLIT':
      return <SmartphoneVsSiloSplit />;

    case 'OCEANIC_CABLES_GHOST_WEALTH':
      return <OceanicCablesGhostWealth />;

    case 'TERMINAL_SHUTDOWN_SILENCE':
      return <TerminalShutdownSilence />;

    case 'IN_YOUR_POCKET_FINAL_QUOTE':
      return <InYourPocketFinalQuote />;

    // ========================================================
    // SIR ADRIAN CARTON DE WIART VC - THE UNKILLABLE SOLDIER
    // ========================================================
    case 'CARTON_HERO_SILHOUETTE_HOOK':
      return <CartonHeroSilhouetteHook durationFrames={durationFrames} />;

    case 'BOER_WAR_RIVER_CROSSING_AMBUSH':
      return <BoerWarRiverCrossingAmbush durationFrames={durationFrames} />;

    case 'INDIA_CAVALRY_GALLOP_CHARGE':
      return <IndiaCavalryGallopCharge durationFrames={durationFrames} />;

    case 'SOMALILAND_EXPEDITION_MAP_VECTOR':
      return <SomalilandExpeditionMapVector durationFrames={durationFrames} />;

    case 'SHIMBER_BERRIS_FORT_DETONATION':
      return <ShimberBerrisFortDetonation durationFrames={durationFrames} />;

    case 'CARTON_BLACK_EYEPATCH_PROFILE':
      return <CartonBlackEyepatchProfile durationFrames={durationFrames} />;

    case 'YPRES_TRENCH_BARRAGE_SPLIT':
      return <YpresTrenchBarrageSplit durationFrames={durationFrames} />;

    case 'AMPUTATION_SEVERED_HAND_FRACTURE':
      return <AmputationSeveredHandFracture durationFrames={durationFrames} />;

    case 'SOMME_BATTALION_ADVANCE_TALLY':
      return <SommeLaBoisselleTally durationFrames={durationFrames} />;

    case 'CARTON_SKULL_BULLET_SURVIVAL':
      return <CartonSkullBulletSurvival durationFrames={durationFrames} />;

    case 'VICTORIA_CROSS_BRONZE_CARD':
      return <VictoriaCrossBronzeCard durationFrames={durationFrames} />;

    case 'POLISH_SOVIET_BORDER_MAP_VECTOR':
      return <PolishSovietBorderMapVector durationFrames={durationFrames} />;

    case 'BIPLANE_SMOKING_CRASH_WRECK':
      return <BiplaneSmokingCrashWreck durationFrames={durationFrames} />;

    case 'COSSACK_CAVALRY_VS_TRAIN_SPLIT':
      return <CossackCavalryVsTrainSplit durationFrames={durationFrames} />;

    case 'ARMOURED_TRAIN_HIGH_SPEED_LEAP':
      return <ArmouredTrainHighSpeedLeap durationFrames={durationFrames} />;

    case 'CARTON_MAJOR_GENERAL_WW2':
      return <CartonMajorGeneralWw2 durationFrames={durationFrames} />;

    case 'SUNDERLAND_FLYING_BOAT_FJORD':
      return <SunderlandFlyingBoatFjord durationFrames={durationFrames} />;

    case 'BOMBER_OCEAN_IMPACT_SPLASH':
      return <BomberOceanImpactSplash durationFrames={durationFrames} />;

    case 'VINCIGLIATA_CASTLE_POW_SPLIT':
      return <VincigliataCastlePowSplit durationFrames={durationFrames} />;

    case 'BEDROCK_TUNNEL_BREAKOUT_FRACTURE':
      return <BedrockTunnelBreakoutFracture durationFrames={durationFrames} />;

    case 'CARTON_PEASANT_DISGUISE_LEADER':
      return <CartonPeasantDisguiseLeader durationFrames={durationFrames} />;

    case 'CARTON_VS_MAO_DIPLOMATIC_SPLIT':
      return <CartonVsMaoDiplomaticSplit durationFrames={durationFrames} />;

    case 'TOTAL_CAREER_WOUNDS_TALLY_BOARD':
      return <TotalCareerWoundsTallyBoard durationFrames={durationFrames} />;

    case 'HAPPY_ODYSSEY_MEMOIR_DOSSIER':
      return <HappyOdysseyMemoirDossier durationFrames={durationFrames} />;

    case 'CARTON_FINAL_SEAMLESS_LOOP_HERO':
      return <CartonFinalSeamlessLoopHero durationFrames={durationFrames} />;

    default:
      return null;
  }
};
