import { Suspense } from "react";
import { Skeleton } from "../skeleton";
import { fetchTMDBImages } from "@/lib/actions";
import { ImagesCarousel } from "../images-carousel";
import { DetailsPageH2 } from "../details-page-h2";

export function CinemaStillsGallery({
  title,
  id,
  type,
}: {
  title: string;
  id: number;
  type: "movie" | "tv" | "person";
}) {
  return (
    <div className="mb-8">
      <DetailsPageH2>{title}&apos;s Images</DetailsPageH2>
      <Suspense
        fallback={
          <Skeleton className="rounded-lg border border-slate-200 shadow-sm dark:border-slate-800" />
        }
      >
        <GalleryContent title={title} id={id} type={type} />
      </Suspense>
    </div>
  );
}

async function GalleryContent({
  title,
  id,
  type,
}: {
  title: string;
  id: number;
  type: "movie" | "tv" | "person";
}) {
  const images = await fetchTMDBImages({ id, type });
  if (!images) return;

  const validImages = [];

  if (images.backdrops) {
    for (const backdrop of images.backdrops) {
      validImages.push(backdrop);
    }
  }

  if (images.profiles) {
    for (const profile of images.profiles) {
      validImages.push(profile);
    }
  }

  if (validImages.length === 0) return;

  return <ImagesCarousel title={title} images={validImages} />;
}
