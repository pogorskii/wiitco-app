import { clsx } from "clsx";
import { FaPlus } from "react-icons/fa";
import { getSession } from "@auth0/nextjs-auth0";
import { AddToAccountButton } from "./add-to-account-button";
import { fetchUserFollowLists } from "@/lib/actions";
export async function AddToAccount({
  className,
  type,
  entityId,
}: {
  className?: string;
  type: "movie" | "tv" | "anime" | "person" | "game";
  entityId: number;
}) {
  const buttonTextEnum: { [key: string]: string } = {
    movie: "Follow this movie",
    tv: "Follow this TV show",
    anime: "Follow this anime",
    person: "Follow this person",
    game: "Follow this game",
  };

  const session = await getSession();
  if (session) {
    const { sub } = session.user;
    const userLists = await fetchUserFollowLists(sub);
    let isFollowedByUser = false;

    switch (type) {
      case "movie":
        isFollowedByUser =
          userLists?.movies.some((m) => m.movieId === entityId) || false;
        break;
      case "tv" || "anime":
        isFollowedByUser =
          userLists?.televisionShows.some((t) => t.showId === entityId) ||
          false;
        break;
      case "person":
        isFollowedByUser =
          userLists?.cinemaPeople.some((p) => p.personId === entityId) || false;
        break;
      case "game":
        isFollowedByUser =
          userLists?.games.some((g) => g.gameId === entityId) || false;
        break;
      default:
        return;
    }

    return (
      <AddToAccountButton
        className={className}
        type={type}
        entityId={entityId}
        userSub={sub}
        isFollowedByUser={isFollowedByUser}
      />
    );
  }

  return (
    <a
      className={clsx(
        "md-2 mt-4 inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-semibold tracking-wider text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:mb-6",
        {
          [className as string]: className,
        },
      )}
      href="/api/auth/login"
    >
      <FaPlus className="me-1" /> {buttonTextEnum[type]}
    </a>
  );
}
