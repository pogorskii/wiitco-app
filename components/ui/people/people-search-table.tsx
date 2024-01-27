"use server";

import { v4 as uuid } from "uuid";
import { fetchCinemaPeopleSearch } from "@/lib/actions";
import InfinitePeopleSearch from "./infinite-people-search";

export default async function PeopleSearchTable({
  search,
}: {
  search?: string;
}) {
  const people = await fetchCinemaPeopleSearch({
    search,
  });

  return (
    <InfinitePeopleSearch key={uuid()} initialPeople={people} search={search} />
  );
}
