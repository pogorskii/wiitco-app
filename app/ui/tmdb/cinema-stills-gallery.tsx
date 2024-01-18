import { fetchTMDBImages } from "@/lib/actions";
import { ImagesCarousel } from "../images-carousel";

export async function CinemaStillsGallery({
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

  return (
    <section className="mb-8" id="screenshots">
      <h2 className="mb-2 scroll-m-20 text-lg font-semibold">
        {title}&apos;s Images
      </h2>
      <ImagesCarousel title={title} images={validImages} />
    </section>
  );
}
