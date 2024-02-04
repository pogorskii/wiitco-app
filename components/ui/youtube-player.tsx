import { Suspense } from "react";
import { DetailsPageH2 } from "./details-page-h2";
import { Skeleton } from "./skeleton";

export function YouTubePlayer({
  title,
  videoId,
}: {
  title: string;
  videoId: string | undefined;
}) {
  if (!videoId) return null;

  return (
    <div className="mb-8">
      <DetailsPageH2>{title}&apos;s Trailer</DetailsPageH2>
      <Suspense fallback={<Skeleton className="mb-8 aspect-video w-full" />}>
        <iframe
          width="100%"
          className="aspect-[16/9]"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </Suspense>
    </div>
  );
}
