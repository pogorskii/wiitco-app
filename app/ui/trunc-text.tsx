"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import clsx from "clsx";

export function TruncText({ text }: { text: string }) {
  const [isTrunc, setIsTrunc] = useState(text.length > 360);

  function handleClick() {
    setIsTrunc(!isTrunc);
  }

  return (
    <div>
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
      {text.length > 360 && (
        <Button variant="link" onClick={handleClick} className="px-0 py-1">
          {isTrunc ? "Show More" : "Show Less"}
        </Button>
      )}
    </div>
  );
}
