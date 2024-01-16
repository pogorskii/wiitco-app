import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { EntryDetailsPageBodySkeleton } from "@/app/ui/skeletons";

export default function Loading() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Movies", href: "/cinema/search" },
          {
            label: "Loading...",
            href: `"/"`,
            active: true,
          },
        ]}
      />
      <EntryDetailsPageBodySkeleton />
    </>
  );
}
