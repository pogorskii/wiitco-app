import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { EntryDetailsPageBodySkeleton } from "@/app/ui/skeletons";

export default function Loading() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Anime", href: "/anime/shows" },
          {
            label: "Loading...",
            href: `"/anime/shows"`,
            active: true,
          },
        ]}
      />
      <EntryDetailsPageBodySkeleton />
    </>
  );
}
