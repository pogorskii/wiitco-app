"use client";

import YouTube, { YouTubeProps } from "react-youtube";

export function YouTubePlayer({ videoId }: YouTubeProps) {
  // Set up event handlers
  const onReady: YouTubeProps["onReady"] = (event) => {
    // Access the player instance
    const player = event.target;
    player.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <YouTube
      videoId={videoId}
      onReady={onReady}
      opts={opts}
      className="aspect-video"
    />
  );
}
