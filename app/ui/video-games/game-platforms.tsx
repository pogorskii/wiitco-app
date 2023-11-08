import {
  NSwitchBadge,
  PCBadge,
  PS4Badge,
  PS5Badge,
  XOneBadge,
  XSeriesBadge,
  LINBadge,
  MACBadge,
  IPHNBadge,
  IPADBadge,
  ANDRBadge,
} from "./platforms-badges";

export function GamePlatforms({ platforms }: { platforms: string[] }) {
  return (
    <div className="flex flex-wrap self-start gap-2">
      {platforms?.map((platform) => {
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
        if (platform === "LIN")
          return <LINBadge key={platform} variant={platform} />;
        if (platform === "MAC")
          return <MACBadge key={platform} variant={platform} />;
        if (platform === "IPHN")
          return <IPHNBadge key={platform} variant={platform} />;
        if (platform === "IPAD")
          return <IPADBadge key={platform} variant={platform} />;
        if (platform === "ANDR")
          return <ANDRBadge key={platform} variant={platform} />;
      })}
    </div>
  );
}
