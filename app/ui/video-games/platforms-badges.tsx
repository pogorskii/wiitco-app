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
        PS5: "border light:border-slate-200 dark:border-none bg-slate-50 text-slate-950 hover:bg-slate-950 hover:text-white",
        PS4: "bg-[#006FCD] text-white hover:bg-[#1b96ff] hover:text-slate-950",
        XSX: "bg-[#107C11] text-white hover:bg-[#19c01a] hover:text-slate-950",
        XONE: "bg-[#7EB900] text-white hover:bg-[#b0ff06] hover:text-slate-950",
        NSW: "bg-[#E70009] text-white hover:bg-[#ff353c] hover:text-slate-950",
        PC: "bg-[#00BCF2] text-white hover:bg-[#40d4ff] hover:text-slate-950",
        LIN: "bg-[#E95420] text-slate-950 hover:bg-[#f08966]",
        MAC: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]",
        IPAD: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]",
        IPHN: "border light:border-slate-200 bg-[#F5F5F5] text-slate-950 hover:bg-[#ffffff]",
        ANDR: "bg-[#32DE84] text-slate-950 hover:bg-[#74e9ac]",
      },
    },
  }
);
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function PS5Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Playstation />
      <span>PS5</span>
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

export function XSeriesBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Xbox />
      <span>Series</span>
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

export function PCBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Windows />
      <span>PC</span>
    </div>
  );
}

export function LINBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Ubuntu />
      <span>Linux</span>
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

export function IPHNBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Apple />
      <span>iPhone</span>
    </div>
  );
}

export function IPADBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Apple />
      <span>iPad</span>
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
