"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Button } from "@/components/ui/button";
import { FaPlus, FaCheck } from "react-icons/fa";
import {
  followMovie,
  unfollowMovie,
  followTVShow,
  unfollowTVShow,
  followCinemaPerson,
  unfollowCinemaPerson,
  followGame,
  unfollowGame,
} from "@/app/video-games/lib/actions";
export function AddToAccountButton({
  className,
  type,
  entityId,
  userSub,
  isFollowedByUser,
}: {
  className?: string;
  type: "movie" | "tv" | "anime" | "person" | "game";
  entityId: number;
  userSub: string;
  isFollowedByUser: boolean;
}) {
  const [isCurrentlyFollowing, setIsCurrentlyFollowing] =
    useState<boolean>(isFollowedByUser);

  const buttonTextEnum: { [key: string]: string } = {
    movie: "movie",
    tv: "TV show",
    anime: "anime",
    person: "person",
    game: "game",
  };

  async function handleClick() {
    switch (type) {
      case "movie":
        if (isCurrentlyFollowing) {
          const unfollowedId = await unfollowMovie({
            userSub,
            movieId: entityId,
          });
          if (unfollowedId) setIsCurrentlyFollowing(false);
        } else {
          const followedId = await followMovie({ userSub, movieId: entityId });
          if (followedId) setIsCurrentlyFollowing(true);
        }
        break;
      case "tv" || "anime":
        if (isCurrentlyFollowing) {
          const unfollowedId = await unfollowTVShow({
            userSub,
            showId: entityId,
          });
          if (unfollowedId) setIsCurrentlyFollowing(false);
        } else {
          const followedId = await followTVShow({ userSub, showId: entityId });
          if (followedId) setIsCurrentlyFollowing(true);
        }
        break;
      case "person":
        if (isCurrentlyFollowing) {
          const unfollowedId = await unfollowCinemaPerson({
            userSub,
            personId: entityId,
          });
          if (unfollowedId) setIsCurrentlyFollowing(false);
        } else {
          const followedId = await followCinemaPerson({
            userSub,
            personId: entityId,
          });
          if (followedId) setIsCurrentlyFollowing(true);
        }
        break;
      case "game":
        if (isCurrentlyFollowing) {
          const unfollowedId = await unfollowGame({
            userSub,
            gameId: entityId,
          });
          if (unfollowedId) setIsCurrentlyFollowing(false);
        } else {
          const followedId = await followGame({ userSub, gameId: entityId });
          if (followedId) setIsCurrentlyFollowing(true);
        }
        break;
      default:
        return;
    }
  }

  const IsFollowingButton = (
    <Button
      variant="default"
      onClick={handleClick}
      className={clsx("md-2 mt-4 w-full font-semibold tracking-wider md:mb-6", {
        [className as string]: className,
      })}
    >
      <FaCheck className="me-1" />
      Following
    </Button>
  );

  const NotFollowingButton = (
    <Button
      variant="default"
      onClick={handleClick}
      className={clsx("md-2 mt-4 w-full font-semibold tracking-wider md:mb-6", {
        [className as string]: className,
      })}
    >
      <FaPlus className="me-1" />
      Follow this {buttonTextEnum[type]}
    </Button>
  );

  return isCurrentlyFollowing ? IsFollowingButton : NotFollowingButton;
}
