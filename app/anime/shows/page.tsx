"use server";

import { redirect } from "next/navigation";

export default async function Page() {
  redirect(`/anime/search/`);
}