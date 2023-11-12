import {
  LinBadge,
  N64Badge,
  WiiBadge,
  PCBadge,
  PS1Badge,
  PS2Badge,
  PS3Badge,
  XboxBadge,
  X360Badge,
  MacBadge,
  NESBadge,
  SNESBadge,
  NDSBadge,
  GCBadge,
  GBCBadge,
  DCBadge,
  GBABadge,
  GenBadge,
  SatBadge,
  GBBadge,
  AndrBadge,
  N3DSBadge,
  PSPBadge,
  IOSBadge,
  WiiUBadge,
  VitaBadge,
  PS4Badge,
  XOneBadge,
  ArcadeBadge,
  MobileBadge,
  BrowserBadge,
  VBBadge,
  NSwitchBadge,
  New3DSBadge,
  DSiBadge,
  WMRBadge,
  OculusVRBadge,
  SteamVRBadge,
  PSVRBadge,
  PS5Badge,
  XSeriesBadge,
  OculusQuestBadge,
  OculusRiftBadge,
  OculusQuest2Badge,
  PSVR2Badge,
  OculusQuest3Badge,
} from "./platforms-badges";

export function GamePlatforms({ platforms }: { platforms: number[] }) {
  if (!platforms) return;

  const platformsSet = new Set(platforms);
  const sortedPlatofrms = Array.from(platformsSet).sort((a, b) => a - b);

  const badges = {
    3: LinBadge,
    4: N64Badge,
    5: WiiBadge,
    6: PCBadge,
    7: PS1Badge,
    8: PS2Badge,
    9: PS3Badge,
    11: XboxBadge,
    12: X360Badge,
    14: MacBadge,
    18: NESBadge,
    19: SNESBadge,
    20: NDSBadge,
    21: GCBadge,
    22: GBCBadge,
    23: DCBadge,
    24: GBABadge,
    29: GenBadge,
    32: SatBadge,
    33: GBBadge,
    34: AndrBadge,
    37: N3DSBadge,
    38: PSPBadge,
    39: IOSBadge,
    41: WiiUBadge,
    46: VitaBadge,
    48: PS4Badge,
    49: XOneBadge,
    52: ArcadeBadge,
    55: MobileBadge,
    82: BrowserBadge,
    87: VBBadge,
    130: NSwitchBadge,
    137: New3DSBadge,
    159: DSiBadge,
    161: WMRBadge,
    162: OculusVRBadge,
    163: SteamVRBadge,
    165: PSVRBadge,
    167: PS5Badge,
    169: XSeriesBadge,
    384: OculusQuestBadge,
    385: OculusRiftBadge,
    386: OculusQuest2Badge,
    390: PSVR2Badge,
    471: OculusQuest3Badge,
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
