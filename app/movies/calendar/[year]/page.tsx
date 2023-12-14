"use server";

import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { year: string } }) {
  const year = params.year;
  redirect(`/movies/calendar/${year}/1/`);
}
