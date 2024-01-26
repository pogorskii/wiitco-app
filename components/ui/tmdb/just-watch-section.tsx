import { fetchJustWatchInfo } from "@/lib/actions";
import { JustWatchInfo } from "./just-watch-info";
import { Skeleton } from "../skeleton";
import { Suspense } from "react";

export function JustWatchSection({
  title,
  id,
  type,
}: {
  title: string;
  id: number;
  type: "movie" | "tv";
}) {
  return (
    <Suspense fallback={<Skeleton className="w-full h-20 rounded-lg" />}>
      <JustWatchContent title={title} id={id} type={type} />
    </Suspense>
  );
}
async function JustWatchContent({
  title,
  id,
  type,
}: {
  title: string;
  id: number;
  type: "movie" | "tv";
}) {
  const providers = await fetchJustWatchInfo({ id, type });
  if (!providers) return;

  const availableCountries: {
    [key: string]: {
      link?: string;
      buy?: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
      }[];
      rent?: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
      }[];
      flatrate?: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
      }[];
    };
  } = {};

  for (const entry of Object.entries(providers)) {
    const [country, data] = entry;
    if (data.buy || data.rent || data.flatrate)
      availableCountries[country] = data;
  }

  if (Object.entries(availableCountries).length === 0) return;

  return <JustWatchInfo title={title} watchProviders={availableCountries} />;
}
