import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { EntryDetailsPageBodySkeleton } from "@/app/ui/skeletons";

export default function Loading() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "TV Shows", href: "/tv/shows" },
          {
            label: "Loading...",
            href: `"/tv/shows"`,
            active: true,
          },
        ]}
      />
      <EntryDetailsPageBodySkeleton />
    </>
  );
}
