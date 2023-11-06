import { Badge } from "@/components/ui/badge";
import {
  NSwitchBadge,
  PCBadge,
  PS4Badge,
  PS5Badge,
  XOneBadge,
  XSeriesBadge,
} from "./platforms-badges";

export function GameCard() {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to bottom, transparent 45%, black 100%), url(test-bg.webp)",
      }}
      className="min-h-[250px] max-w-[424px] bg-center bg-[length:100%] hover:bg-[length:110%] ease-in duration-200 p-4 flex flex-col justify-between"
    >
      <Badge variant="date" className="self-start">
        25
      </Badge>
      <div>
        <h2 className="mb-2 text-white scroll-m-20 text-2xl font-semibold tracking-tight">
          The Last of Us: Part II Super Mega Remake
        </h2>
        <div className="flex self-start gap-2">
          <PS5Badge />
          <PS4Badge />
          <XSeriesBadge />
          <XOneBadge />
          <NSwitchBadge />
          <PCBadge />
        </div>
      </div>
    </div>
  );
}
