import { fetchTMDBImages } from "@/lib/actions";
import { ImagesCarousel } from "../images-carousel";

export async function CinemaStillsGallery({
  title,
  id,
  type,
}: {
  title: string;
  id: number;
  type: "movie" | "tv";
}) {
  const images = await fetchTMDBImages({ id, type });
  if (!images) return;

  const validBackdrops = [];

  for (const backdrop of images.backdrops) {
    if (backdrop) validBackdrops.push(backdrop);
  }
  if (validBackdrops.length === 0) return;

  return (
    <section className="mb-8" id="screenshots">
      <h2 className="mb-2 scroll-m-20 text-lg font-semibold">
        {title}&apos;s Images
      </h2>
      <ImagesCarousel title={title} images={validBackdrops} />
    </section>
  );
}
