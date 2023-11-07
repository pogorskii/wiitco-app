import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Playstation,
  Xbox,
  NintendoSwitch,
  Windows,
} from "react-bootstrap-icons";

const badgeVariants = cva(
  "inline-flex gap-1 items-center rounded-full border px-1.5 py-0.5 text-xs font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        PS5: "border border-slate-200 bg-slate-50 text-slate-950 hover:bg-slate-200",
        PS4: "bg-[#006FCD] text-white hover:bg-[#1043B3]",
        XSX: "bg-[#107C11] text-white hover:bg-[#073808]",
        XONE: "bg-[#7EB900] text-white hover:bg-[#4a6d00]",
        NSW: "bg-[#E70009] text-white hover:bg-[#9b0006]",
        PC: "bg-[#00BCF2] text-white hover:bg-[#0081a6]",
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
