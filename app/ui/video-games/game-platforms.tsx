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
  if (!platforms) return;

  const platformsSet = new Set(platforms);
  const sortedPlatofrms = Array.from(platformsSet).sort((a, b) => a - b);

  const badges = {
    3: LINBadge,
    6: PCBadge,
    14: MACBadge,
    34: ANDRBadge,
    39: IOSBadge,
    48: PS4Badge,
    49: XOneBadge,
    130: NSwitchBadge,
    167: PS5Badge,
    169: XSeriesBadge,
    390: PSVR2Badge,
  };

  return (
    <div className="flex flex-wrap self-start gap-2">
      {sortedPlatofrms.map((platform) => {
        if (!badges[platform as keyof typeof badges]) return;
        const PlatformBadge = badges[platform as keyof typeof badges];
        return <PlatformBadge key={platform} variant={platform as any} />;
      })}
    </div>
  );
}
