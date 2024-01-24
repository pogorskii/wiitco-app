"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import clsx from "clsx";

export function TruncText({
  text,
  maxLength = 360,
}: {
  text?: string | null;
  maxLength?: number;
}) {
  if (!text) return null;

  const [isTrunc, setIsTrunc] = useState(text.length > maxLength);

  function handleClick() {
    setIsTrunc(!isTrunc);
  }

  return (
    <div className="mb-8">
      <p
        className={clsx(
          "leading-7 [&:not(:first-child)]:mt-4",
          {
            "line-clamp-none": !isTrunc,
          },
          {
            "line-clamp-5": isTrunc,
          }
        )}
      >
        {text}
      </p>
      {text.length > maxLength && (
        <Button variant="link" onClick={handleClick} className="px-0 py-1">
          {isTrunc ? "Show More" : "Show Less"}
        </Button>
      )}
    </div>
  );
}