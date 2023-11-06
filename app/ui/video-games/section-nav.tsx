"use client";

import {
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function SectionNav() {
  return (
    <div className="flex justify-between py-2">
      <Button variant="ghost">
        <SlidersHorizontal />
      </Button>
      <div className="flex items-center gap-2">
        <Button variant="ghost">
          <ChevronLeft />
        </Button>
        <span>November 2023</span>
        <Button variant="ghost">
          <ChevronRight />
        </Button>
      </div>
      <Button variant="ghost">
        <Download />
      </Button>
    </div>
  );
}
