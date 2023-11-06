"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
const links = [
  { name: "Movies", href: "/movies-release-dates" },
  {
    name: "Video Games",
    href: "/video-games-release-dates",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center justify-center gap-2 px-3 text-medium font-medium border-b-4 border-blue-600/[.0] hover:text-blue-600 duration-200 ease-in",
              {
                "border-blue-600/[1] text-blue-600": pathname === link.href,
              }
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
