import { Search } from "@/app/ui/search";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  return (
    <>
      <Search placeholder="Search any game" />
      <p>{query}</p>
    </>
  );
}
