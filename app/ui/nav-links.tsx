"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Map of links to display in the side navigation.
const links = [
  { name: "Movies", href: "/cinema" },
  { name: "TV Shows", href: "/tv" },
  { name: "Anime", href: "/anime" },
  {
    name: "Video Games",
    href: "/video-games",
  },
];

const moviesLinks: { title: string; href: string; description: string }[] = [
  {
    title: "Calendar",
    href: "/cinema/calendar",
    description: "Check what movies are scheduled to release on any date.",
  },
  {
    title: "Movies Database",
    href: "/cinema/search",
    description: "Browse, search, and filter all movies.",
  },
];

const televisionLinks: { title: string; href: string; description: string }[] =
  [
    {
      title: "Calendar",
      href: "/tv/calendar",
      description: "Schedule of TV Shows seasons.",
    },
    {
      title: "TV Shows Database",
      href: "/tv/search",
      description: "Browse, search, and filter all TV shows.",
    },
  ];

const animeLinks: { title: string; href: string; description: string }[] = [
  {
    title: "Calendar",
    href: "/anime/calendar",
    description: "Schedule of Anime seasons.",
  },
  {
    title: "Anime Database",
    href: "/anime/search",
    description: "Browse, search, and filter all Anime.",
  },
];

const gamesLinks: { title: string; href: string; description: string }[] = [
  {
    title: "Calendar",
    href: "/video-games/calendar",
    description: "Check what games are scheduled to release on any date.",
  },
  {
    title: "Games Database",
    href: "/video-games/games",
    description: "Browse, search, and filter all games.",
  },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={clsx("rounded-3xl", {
              "bg-primary/10": pathname.includes(links[0].href),
            })}
          >
            Movies
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {moviesLinks.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={clsx("rounded-3xl", {
              "bg-primary/10": pathname.includes(links[1].href),
            })}
          >
            TV Shows
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {televisionLinks.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={clsx("rounded-3xl", {
              "bg-primary/10": pathname.includes(links[2].href),
            })}
          >
            Anime
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {animeLinks.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={clsx("rounded-3xl", {
              "bg-primary/10": pathname.includes(links[3].href),
            })}
          >
            Video Games
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {gamesLinks.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
