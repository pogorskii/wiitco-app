export const currentGen = [
  { label: "PC", value: 6 },
  { label: "Mac", value: 14 },
  { label: "Linux", value: 3 },
  { label: "PlayStation 5", value: 167 },
  { label: "Xbox Series", value: 169 },
  { label: "Nintendo Switch", value: 130 },
  { label: "iOS", value: 39 },
  { label: "Android", value: 34 },
  { label: "Browser", value: 82 },
  { label: "Arcade", value: 52 },
];
export const vrGen = [
  { label: "Oculus Quest 3", value: 471 },
  { label: "Oculus Quest 2", value: 386 },
  { label: "Oculus Quest", value: 384 },
  { label: "Oculus Rift", value: 385 },
  { label: "Oculus VR", value: 162 },
  { label: "Steam VR", value: 163 },
  { label: "PlayStation VR 2", value: 390 },
  { label: "PlayStation VR", value: 165 },
  { label: "Windows MR", value: 161 },
];
export const eighthGen = [
  { label: "PlayStation 4", value: 48 },
  { label: "Xbox One", value: 49 },
  { label: "WiiU", value: 41 },
  { label: "PlayStation Vita", value: 46 },
  { label: "New Nintendo 3DS", value: 137 },
  { label: "Nintendo 3DS", value: 37 },
];
export const seventhGen = [
  { label: "PlayStation 3", value: 9 },
  { label: "Xbox 360", value: 12 },
  { label: "Nintendo Wii", value: 5 },
  { label: "PSP", value: 38 },
  { label: "Nintendo DS", value: 20 },
  { label: "Nintendo DSi", value: 159 },
];
export const sixthGen = [
  { label: "PlayStation 2", value: 8 },
  { label: "Xbox OG", value: 11 },
  { label: "Nintendo GameCube", value: 21 },
  { label: "Sega Dreamcast", value: 23 },
  { label: "Game Boy Advance", value: 24 },
];
export const fifthGen = [
  { label: "PlayStation 1", value: 7 },
  { label: "Nintendo 64", value: 4 },
  { label: "Sega Saturn", value: 32 },
  { label: "Game Boy Color", value: 22 },
  { label: "Virtual Boy", value: 87 },
];
export const otherGen = [
  { label: "Mobile", value: 55 },
  { label: "Sega Genesis", value: 29 },
  { label: "Game Boy", value: 33 },
  { label: "NES", value: 18 },
  { label: "SNES", value: 19 },
];

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
    <>
      {sortedPlatofrms.map((platform) => {
        if (!badges[platform as keyof typeof badges]) return;
        const PlatformBadge = badges[platform as keyof typeof badges];
        return <PlatformBadge key={platform} variant={platform as any} />;
      })}
    </>
  );
}

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Playstation,
  Xbox,
  NintendoSwitch,
  Windows,
  Ubuntu,
  Apple,
  Android,
  Phone,
  Steam,
} from "react-bootstrap-icons";
import {
  SiNintendo,
  SiNintendogamecube,
  SiSega,
  SiApplearcade,
  SiNintendo3Ds,
  SiOculus,
} from "react-icons/si";
import { MdWebAsset } from "react-icons/md";

const badgeVariants = cva(
  "rounded-md border border-transparent px-1 py-0.5 text-xs tracking-wider font-semibold inline-flex gap-1 items-center font-normal transition duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        3: "bg-[#E95420] text-white hover:bg-[#f08966]", // Linux
        4: "bg-[#E70009] text-white hover:bg-[#ff353c] hover:text-slate-950", // N64
        5: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // Wii
        6: "bg-[#00BCF2] text-white hover:bg-[#40d4ff] hover:text-slate-950", // PC
        7: "bg-[#006FCD] text-white hover:bg-[#1b96ff] hover:text-slate-950", // PS1
        8: "bg-[#006FCD] text-white hover:bg-[#1b96ff] hover:text-slate-950", // PS2
        9: "bg-[#006FCD] text-white hover:bg-[#1b96ff] hover:text-slate-950", // PS3
        11: "bg-[#7EB900] text-white hover:bg-[#b0ff06] hover:text-slate-950", // Xbox
        12: "bg-[#7EB900] text-white hover:bg-[#b0ff06] hover:text-slate-950", // X360
        14: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // Mac
        18: "bg-[#E70009] text-white hover:bg-[#ff353c] hover:text-slate-950", // NES
        19: "bg-[#E70009] text-white hover:bg-[#ff353c] hover:text-slate-950", // SNES
        20: "bg-[#E70009] text-white hover:bg-[#ff353c] hover:text-slate-950", // NDS
        21: "bg-[#E70009] text-white hover:bg-[#ff353c] hover:text-slate-950", // GameCube
        22: "bg-[#E70009] text-white hover:bg-[#ff353c] hover:text-slate-950", // GBC
        23: "bg-[#1C61AC] text-white hover:bg-[#3687de] hover:text-slate-950", // Dreamcast
        24: "bg-[#E70009] text-white hover:bg-[#ff353c] hover:text-slate-950", // GBA
        29: "bg-[#1C61AC] text-white hover:bg-[#3687de] hover:text-slate-950", // Genesis
        32: "bg-[#1C61AC] text-white hover:bg-[#3687de] hover:text-slate-950", // Saturn
        33: "bg-[#E70009] text-white hover:bg-[#ff353c] hover:text-slate-950", // GB
        34: "bg-[#32DE84] text-slate-950 hover:bg-[#74e9ac]", // Android
        37: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // 3DS
        38: "bg-[#006FCD] text-white hover:bg-[#1b96ff] hover:text-slate-950", // PSP
        39: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // iOS
        41: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // WiiU
        46: "border light:border-slate-200 dark:border-none bg-slate-50 text-slate-950 hover:bg-slate-950 hover:text-white", // PSVita
        48: "bg-[#006FCD] text-white hover:bg-[#1b96ff] hover:text-slate-950", // PS4
        49: "bg-[#7EB900] text-white hover:bg-[#b0ff06] hover:text-slate-950", // XBO
        52: "bg-[#EDA92D] text-slate-950 hover:bg-[#f3c673]", // Arcade
        55: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // Mobile
        82: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // Browser
        87: "bg-[#E70009] text-white hover:bg-[#ff353c] hover:text-slate-950", // VirtualBoy
        130: "bg-[#E70009] text-white hover:bg-[#ff353c] hover:text-slate-950", // Switch
        137: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // N3DS
        159: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // DSi
        161: "bg-[#00BCF2] text-white hover:bg-[#40d4ff] hover:text-slate-950", // WMR
        162: "bg-[#0089FA] text-[#F5F5F5] hover:bg-[#48ACFF] hover:text-[#1D1F20]", // OculusVR
        163: "bg-[#1D1F20] text-[#F5F5F5] hover:bg-[#414648]", // SteamVR
        165: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // PSVR
        167: "border light:border-slate-200 dark:border-none bg-slate-50 text-slate-950 hover:bg-slate-950 hover:text-white", // PS5
        169: "bg-[#107C11] text-white hover:bg-[#19c01a] hover:text-slate-950", // Series
        384: "bg-[#0089FA] text-[#F5F5F5] hover:bg-[#48ACFF] hover:text-[#1D1F20]", // Quest
        385: "bg-[#0089FA] text-[#F5F5F5] hover:bg-[#48ACFF] hover:text-[#1D1F20]", // Rift
        386: "bg-[#0089FA] text-[#F5F5F5] hover:bg-[#48ACFF] hover:text-[#1D1F20]", // Quest 2
        390: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // PSVR2
        471: "bg-[#0089FA] text-[#F5F5F5] hover:bg-[#48ACFF] hover:text-[#1D1F20]", // Quest 3
      },
    },
  },
);
interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function LinBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Ubuntu />
      <span>Linux</span>
    </div>
  );
}

function N64Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>N64</span>
    </div>
  );
}

function WiiBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>Wii</span>
    </div>
  );
}

function PCBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Windows />
      <span>PC</span>
    </div>
  );
}

function PS1Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PSOne</span>
    </div>
  );
}

function PS2Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PS2</span>
    </div>
  );
}

function PS3Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PS3</span>
    </div>
  );
}

function XboxBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Xbox />
      <span>Xbox</span>
    </div>
  );
}

function X360Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Xbox />
      <span>X360</span>
    </div>
  );
}

function MacBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Apple />
      <span>MacOS</span>
    </div>
  );
}

function NESBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>NES</span>
    </div>
  );
}

function SNESBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>SNES</span>
    </div>
  );
}

function NDSBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>DS</span>
    </div>
  );
}

function GCBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendogamecube />
      <span>GameCube</span>
    </div>
  );
}

function GBCBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>GBColor</span>
    </div>
  );
}

function DCBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiSega />
      <span>Dreamcast</span>
    </div>
  );
}

function GBABadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>GBA</span>
    </div>
  );
}

function GenBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiSega />
      <span>Genesis</span>
    </div>
  );
}

function SatBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiSega />
      <span>Saturn</span>
    </div>
  );
}

function GBBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>GameBoy</span>
    </div>
  );
}

function AndrBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Android />
      <span>Android</span>
    </div>
  );
}

function N3DSBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo3Ds />
      <span>3DS</span>
    </div>
  );
}

function PSPBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PSP</span>
    </div>
  );
}

function IOSBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Apple />
      <span>iOS</span>
    </div>
  );
}

function WiiUBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>WiiU</span>
    </div>
  );
}

function VitaBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PSVita</span>
    </div>
  );
}

function PS4Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PS4</span>
    </div>
  );
}

function XOneBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Xbox />
      <span>XBO</span>
    </div>
  );
}

function ArcadeBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiApplearcade />
      <span>Arcade</span>
    </div>
  );
}

function MobileBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Phone />
      <span>Mobile</span>
    </div>
  );
}

function BrowserBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <MdWebAsset />
      <span>Browser</span>
    </div>
  );
}

function VBBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>VirtualBoy</span>
    </div>
  );
}

function New3DSBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo3Ds />
      <span>New3DS</span>
    </div>
  );
}

function DSiBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo3Ds />
      <span>DSi</span>
    </div>
  );
}

function WMRBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Windows />
      <span>WindowsMR</span>
    </div>
  );
}

function OculusVRBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiOculus />
      <span>OculusVR</span>
    </div>
  );
}

function SteamVRBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Steam />
      <span>SteamVR</span>
    </div>
  );
}

function PSVRBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PSVR</span>
    </div>
  );
}

function NSwitchBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <NintendoSwitch />
      <span>Switch</span>
    </div>
  );
}

function PS5Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PS5</span>
    </div>
  );
}

function XSeriesBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Xbox />
      <span>Series</span>
    </div>
  );
}

function OculusQuestBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiOculus />
      <span>Quest</span>
    </div>
  );
}

function OculusRiftBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiOculus />
      <span>Rift</span>
    </div>
  );
}

function OculusQuest2Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiOculus />
      <span>Quest 2</span>
    </div>
  );
}

function PSVR2Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PSVR2</span>
    </div>
  );
}

function OculusQuest3Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiOculus />
      <span>Quest 3</span>
    </div>
  );
}
