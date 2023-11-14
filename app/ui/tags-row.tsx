"use server";

import Link from "next/link";

export async function TagsRow({
  type,
  category,
  tags,
}: {
  type: "video-games" | "movies";
  category: string;
  tags: { name: string; slug: string }[];
}) {
  return (
    <div className="inline-flex gap-1">
      {tags.map((tag, i, arr) => (
        <span>
          <Link
            className="text-blue-500 hover:text-blue-400 hover:underline hover:underline-offset-2 hover:decoration-solid"
            href={`/${type}/${category}/${tag.slug}`}
          >
            {tag.name}
          </Link>
          {i < arr.length - 1 && ","}
        </span>
      ))}
    </div>
  );
}
