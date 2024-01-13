import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { EntryDetailsPageBodySkeleton } from "@/app/ui/skeletons";

export default function Loading() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/video-games/games" },
          {
            label: "Loading...",
            href: `/video-games/games`,
            active: true,
          },
        ]}
      />
      <EntryDetailsPageBodySkeleton />
    </>
  );
}
