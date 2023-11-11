import {
  NSwitchBadge,
  PCBadge,
  PS4Badge,
  PS5Badge,
  XOneBadge,
  XSeriesBadge,
  LINBadge,
  MACBadge,
  IOSBadge,
  ANDRBadge,
  PSVR2Badge,
} from "./platforms-badges";

export function GamePlatforms({ platforms }: { platforms: number[] }) {
  return (
    <div className="flex flex-wrap self-start gap-2">
      {platforms?.map((platform) => {
        if (platform === 6)
          return <PCBadge key={platform} variant={platform} />;
        if (platform === 49)
          return <XOneBadge key={platform} variant={platform} />;
        if (platform === 169)
          return <XSeriesBadge key={platform} variant={platform} />;
        if (platform === 48)
          return <PS4Badge key={platform} variant={platform} />;
        if (platform === 167)
          return <PS5Badge key={platform} variant={platform} />;
        if (platform === 130)
          return <NSwitchBadge key={platform} variant={platform} />;
        if (platform === 3)
          return <LINBadge key={platform} variant={platform} />;
        if (platform === 14)
          return <MACBadge key={platform} variant={platform} />;
        if (platform === 39)
          return <IOSBadge key={platform} variant={platform} />;
        if (platform === 34)
          return <ANDRBadge key={platform} variant={platform} />;
        if (platform === 390)
          return <PSVR2Badge key={platform} variant={platform} />;

        // TODO: Meta Quest 2, Steam VR, NES, PSVR2
      })}
    </div>
  );
}
