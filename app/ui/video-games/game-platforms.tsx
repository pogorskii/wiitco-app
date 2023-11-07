import {
  NSwitchBadge,
  PCBadge,
  PS4Badge,
  PS5Badge,
  XOneBadge,
  XSeriesBadge,
} from "./platforms-badges";

export function GamePlatforms({ platforms }: { platforms: string[] }) {
  return (
    <div className="flex flex-wrap self-start gap-2">
      {platforms.map((platform) => {
        if (platform === "PC")
          return <PCBadge key={platform} variant={platform} />;
        if (platform === "XONE")
          return <XOneBadge key={platform} variant={platform} />;
        if (platform === "XSX")
          return <XSeriesBadge key={platform} variant={platform} />;
        if (platform === "PS4")
          return <PS4Badge key={platform} variant={platform} />;
        if (platform === "PS5")
          return <PS5Badge key={platform} variant={platform} />;
        if (platform === "NSW")
          return <NSwitchBadge key={platform} variant={platform} />;
      })}
    </div>
  );
}
