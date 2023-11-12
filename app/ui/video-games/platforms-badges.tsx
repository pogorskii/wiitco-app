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
} from "react-bootstrap-icons";

const badgeVariants = cva(
  "inline-flex gap-1 items-center rounded-full px-1.5 py-0.5 text-xs font-normal transition duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        3: "bg-[#E95420] text-slate-950 hover:bg-[#f08966]", // Linux
        4: "", // N64
        5: "", // Wii
        6: "bg-[#00BCF2] text-white hover:bg-[#40d4ff] hover:text-slate-950", // PC
        7: "", // PS1
        8: "", // PS2
        9: "", // PS3
        11: "", // Xbox
        12: "", // X360
        14: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // Mac
        18: "", // NES
        19: "", // SNES
        20: "", // NDS
        21: "", // GameCube
        22: "", // GBC
        23: "", // Dreamcast
        24: "", // GBA
        29: "", // Genesis
        32: "", // Saturn
        33: "", // GB
        34: "bg-[#32DE84] text-slate-950 hover:bg-[#74e9ac]", // Android
        37: "", // 3DS
        38: "", // PSP
        39: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // iOS
        41: "", // WiiU
        46: "", // PSVita
        48: "bg-[#006FCD] text-white hover:bg-[#1b96ff] hover:text-slate-950", // PS4
        49: "bg-[#7EB900] text-white hover:bg-[#b0ff06] hover:text-slate-950", // XBO
        52: "", // Arcade
        55: "", // Mobile
        82: "", // Browser
        87: "", // VirtualBoy
        130: "bg-[#E70009] text-white hover:bg-[#ff353c] hover:text-slate-950", // Switch
        137: "", // N3DS
        159: "", // DSi
        161: "", // WMR
        162: "", // OculusVR
        163: "", // SteamVR
        165: "", // PSVR
        167: "border light:border-slate-200 dark:border-none bg-slate-50 text-slate-950 hover:bg-slate-950 hover:text-white", // PS5
        169: "bg-[#107C11] text-white hover:bg-[#19c01a] hover:text-slate-950", // Series
        384: "", // Quest
        385: "", // Rift
        386: "", // Quest 2
        390: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]", // PSVR2
        471: "", // Quest 3
      },
    },
  }
);
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function LINBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Ubuntu />
      <span>Linux</span>
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

export function MACBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Apple />
      <span>MacOS</span>
    </div>
  );
}

export function ANDRBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Android />
      <span>Android</span>
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

export function PSVR2Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PSVR2</span>
    </div>
  );
}
