"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { systemTheme, setTheme, theme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        className="h-10 w-10 rounded-full p-2"
        onClick={() =>
          setTheme(
            systemTheme === "dark" || theme === "dark" ? "light" : "dark",
          )
        }
      >
        <Sun className="hidden dark:block" />
        <Moon className="dark:hidden" />
      </Button>
    </div>
  );
}
