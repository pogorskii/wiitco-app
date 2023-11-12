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
  "inline-flex gap-1 items-center rounded-full px-1.5 py-0.5 text-xs font-normal transition duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        3: "bg-[#E95420] text-slate-950 hover:bg-[#f08966]", // Linux
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
  }
);
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function LinBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Ubuntu />
      <span>Linux</span>
    </div>
  );
}

export function N64Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>N64</span>
    </div>
  );
}

export function WiiBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>Wii</span>
    </div>
  );
}

export function PCBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Windows />
      <span>PC</span>
    </div>
  );
}

export function PS1Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PSOne</span>
    </div>
  );
}

export function PS2Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PS2</span>
    </div>
  );
}

export function PS3Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PS3</span>
    </div>
  );
}

export function XboxBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Xbox />
      <span>Xbox</span>
    </div>
  );
}

export function X360Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Xbox />
      <span>X360</span>
    </div>
  );
}

export function MacBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Apple />
      <span>MacOS</span>
    </div>
  );
}

export function NESBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>NES</span>
    </div>
  );
}

export function SNESBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>SNES</span>
    </div>
  );
}

export function NDSBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>DS</span>
    </div>
  );
}

export function GCBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendogamecube />
      <span>GameCube</span>
    </div>
  );
}

export function GBCBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>GBColor</span>
    </div>
  );
}

export function DCBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiSega />
      <span>Dreamcast</span>
    </div>
  );
}

export function GBABadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>GBA</span>
    </div>
  );
}

export function GenBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiSega />
      <span>Genesis</span>
    </div>
  );
}

export function SatBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiSega />
      <span>Saturn</span>
    </div>
  );
}

export function GBBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>GameBoy</span>
    </div>
  );
}

export function AndrBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Android />
      <span>Android</span>
    </div>
  );
}

export function N3DSBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo3Ds />
      <span>3DS</span>
    </div>
  );
}

export function PSPBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PSP</span>
    </div>
  );
}

export function IOSBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Apple />
      <span>iOS</span>
    </div>
  );
}

export function WiiUBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>WiiU</span>
    </div>
  );
}

export function VitaBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PSVita</span>
    </div>
  );
}

export function PS4Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PS4</span>
    </div>
  );
}

export function XOneBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Xbox />
      <span>XBO</span>
    </div>
  );
}

export function ArcadeBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiApplearcade />
      <span>Arcade</span>
    </div>
  );
}

export function MobileBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Phone />
      <span>Mobile</span>
    </div>
  );
}

export function BrowserBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <MdWebAsset />
      <span>Browser</span>
    </div>
  );
}

export function VBBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo />
      <span>VirtualBoy</span>
    </div>
  );
}

export function New3DSBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo3Ds />
      <span>New3DS</span>
    </div>
  );
}

export function DSiBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiNintendo3Ds />
      <span>DSi</span>
    </div>
  );
}

export function WMRBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Windows />
      <span>WindowsMR</span>
    </div>
  );
}

export function OculusVRBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiOculus />
      <span>OculusVR</span>
    </div>
  );
}

export function SteamVRBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Steam />
      <span>SteamVR</span>
    </div>
  );
}

export function PSVRBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PSVR</span>
    </div>
  );
}

export function NSwitchBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <NintendoSwitch />
      <span>Switch</span>
    </div>
  );
}

export function PS5Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PS5</span>
    </div>
  );
}

export function XSeriesBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Xbox />
      <span>Series</span>
    </div>
  );
}

export function OculusQuestBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiOculus />
      <span>Quest</span>
    </div>
  );
}

export function OculusRiftBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiOculus />
      <span>Rift</span>
    </div>
  );
}

export function OculusQuest2Badge({
  className,
  variant,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiOculus />
      <span>Quest 2</span>
    </div>
  );
}

export function PSVR2Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PSVR2</span>
    </div>
  );
}

export function OculusQuest3Badge({
  className,
  variant,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <SiOculus />
      <span>Quest 3</span>
    </div>
  );
}
