import { fetchJustWatchInfo } from "@/lib/actions";
import { JustWatchInfo } from "./just-watch-info";

export async function JustWatchSection({
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
      link?: string | undefined;
      buy?:
        | {
            logo_path: string;
            provider_id: number;
            provider_name: string;
            display_priority: number;
          }[]
        | undefined;
      rent?:
        | {
            logo_path: string;
            provider_id: number;
            provider_name: string;
            display_priority: number;
          }[]
        | undefined;
      flatrate?:
        | {
            logo_path: string;
            provider_id: number;
            provider_name: string;
            display_priority: number;
          }[]
        | undefined;
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
