"use server";

import { v4 as uuid } from "uuid";
import Link from "next/link";

export async function TagsRow({
  type,
  category,
  tags,
}: {
  type: "video-games" | "cinema" | "tv";
  category: string;
  tags: { name: string | undefined; slug: string | number | undefined }[];
}) {
  const validTags = tags.filter((e) => {
    if (e.name && e.slug) return e;
  });

  return (
    <>
      {validTags.map((tag, i, arr) => (
        <Link
          key={tag.slug + uuid()}
          className=" text-blue-500 hover:text-blue-400 hover:underline hover:underline-offset-4 hover:decoration-solid"
          href={`/${type}/${category}/${tag.slug}`}
        >
          {" "}
          {tag.name}
          {i < arr.length - 1 && ","}
        </Link>
      ))}
    </>
  );
}
