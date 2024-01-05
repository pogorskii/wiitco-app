"use client";

export function YouTubePlayer({ videoId }: { videoId: string | undefined }) {
  if (!videoId) return;

  return (
    <iframe
      width="100%"
      className="aspect-[16/9]"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}
