"use server";

import { redirect } from "next/navigation";

export default async function Page() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  redirect(`/anime/calendar/${year}/${month}/`);
}
