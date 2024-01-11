"use server";

import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { year: string } }) {
  const year = params.year;
  redirect(`/anime/calendar/${year}/1/`);
}
