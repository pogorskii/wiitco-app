import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { EntryDetailsPageBodySkeleton } from "@/app/ui/skeletons";

export default function Loading() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Movies", href: "/cinema/movies" },
          {
            label: "Loading...",
            href: `"/cinema/movies"`,
            active: true,
          },
        ]}
      />
      <EntryDetailsPageBodySkeleton />
    </>
  );
}
