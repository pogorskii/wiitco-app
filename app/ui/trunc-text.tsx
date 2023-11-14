"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import clsx from "clsx";

export function TruncText({ text }: { text: string }) {
  const [isTrunc, setIsTrunc] = useState(true);

  function handleClick() {
    setIsTrunc(!isTrunc);
  }

  return (
    <div>
      <p
        className={clsx(
          "leading-7 [&:not(:first-child)]:mt-4 line-clamp-5 transition-500",
          {
            "line-clamp-none": !isTrunc,
          }
        )}
      >
        {text}
      </p>
      {isTrunc && (
        <Button variant="link" onClick={handleClick} className="px-0 py-1">
          Show More
        </Button>
      )}
    </div>
  );
}
