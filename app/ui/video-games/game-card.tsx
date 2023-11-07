import Image from "next/image";
import {
  NSwitchBadge,
  PCBadge,
  PS4Badge,
  PS5Badge,
  XOneBadge,
  XSeriesBadge,
} from "./platforms-badges";

export function GameCard({
  id,
  title,
  imageUrl,
  platforms,
}: {
  id: number;
  title: string;
  imageUrl: string;
  platforms: string[];
}) {
  return (
    <div
      key={id}
      className="mb-5 border border-slate-400 flex flex-col self-start overflow-hidden h-auto max-w-full rounded-lg"
    >
      <div>
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={900}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-4 pb-6">
        <h3 className="mb-3 scroll-m-20 text-2xl font-semibold tracking-tight">
          {title}
        </h3>
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
      </div>
    </div>
  );
}
