import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import {
  fetchGameReleasesPersonalCalendar,
  fetchUserFollowLists,
} from "../video-games/lib/actions";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { groupGameReleasesByGameAndDate } from "@/lib/utils";

export default async function Page() {
  const session = await getSession();
  if (!session) redirect(`api/auth/login/`);

  const { sub } = session.user;
  const userLists = await fetchUserFollowLists(sub);
  if (!userLists) return <p>Your calendar is currently empty.</p>;

  const { games, movies, televisionShows } = userLists;
  const gamesInfo = await fetchGameReleasesPersonalCalendar(games);
  const formattedGames = groupGameReleasesByGameAndDate(gamesInfo);

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "My Calendar", href: "/my-calendar", active: true },
        ]}
      />
      <h1 className="mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        My calendar
      </h1>
      {formattedGames && formattedGames.map((e, i) => <p key={i}>{e.name}</p>)}
    </>
  );
}
