import { redirect } from "next/navigation";

export default function Home() {
  redirect("/video-games-release-dates");

  return (
    <main className="min-h-screen p-10">
      <h1>Under construction!</h1>
    </main>
  );
}
