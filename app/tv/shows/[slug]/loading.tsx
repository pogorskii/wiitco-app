import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EntryDetailsPageBodySkeleton } from "@/components/ui/skeletons";

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
