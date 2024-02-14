"use client";

import { motion, useCycle } from "framer-motion";
import { SVGMotionProps } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserInfo from "./user-info";

interface Toggle {
  toggle: () => void;
}

type MenuToggle = React.FC<Toggle>;

export const MobileMenu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.nav
      className={clsx("", {
        fixed: isOpen,
      })}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <Navigation toggle={() => toggleOpen()} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

const variantsNavLinks = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const variantsMenu = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
      stiffness: 2000,
    },
    opacity: 1,
    x: 0,
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    opacity: 0,
    x: "100%",
  },
};

const Navigation: MenuToggle = ({ toggle }) => {
  // const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
  const colors = [
    "#fe01bf",
    "#ff97b0",
    "#e796a2",
    "#a9a595",
    "#88d8b4",
    "#7c91f4",
    "#70d1ff",
    "#659afe",
  ];

  const MenuLinks = navLinks.map((link, i) => {
    const style = {
      borderBottom: `2px solid ${colors[i]}`,
    };

    return (
      <motion.li
        key={i}
        style={{
          backgroundImage: `linear-gradient(300deg, ${colors[i]} 0%,
          ${colors[i]} 50%,
          transparent 50%
        )`,
          backgroundPositionX: "0%",
          backgroundSize: "225%",
        }}
        className="mb-4 block w-fit p-2 text-2xl transition-colors duration-100 hover:text-background sm:text-4xl"
        variants={variantsNavLinks}
        whileHover={{
          backgroundPositionX: "100%",
          transform: "translateX(0.5rem)",
        }}
        whileFocus={{
          backgroundPositionX: "100%",
          transform: "translateX(0.5rem)",
        }}
      >
        <Link href={link.href} onClick={toggle}>
          <div style={style}>{link.title}</div>
        </Link>
      </motion.li>
    );
  });

  return (
    <motion.ul
      className="fixed right-0 top-0 h-screen w-screen bg-background p-6 pe-16"
      variants={variantsMenu}
    >
      <div className="mb-6">
        <a
          className="ms-2 inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-none bg-primary p-4 text-xl font-semibold tracking-wider text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:m-0 sm:rounded-full sm:px-4 sm:py-2 sm:text-sm"
          href="/api/auth/login"
        >
          Log In
        </a>
      </div>
      {MenuLinks}
    </motion.ul>
  );
};

const navLinks: { title: string; href: string }[] = [
  {
    title: "Movies Calendar",
    href: "/cinema/calendar",
  },
  {
    title: "All Movies",
    href: "/cinema/search",
  },
  {
    title: "TV Shows Calendar",
    href: "/tv/calendar",
  },
  {
    title: "All TV Shows",
    href: "/tv/search",
  },
  {
    title: "Anime Calendar",
    href: "/anime/calendar",
  },
  {
    title: "All Anime Shows",
    href: "/anime/search",
  },
  {
    title: "Games Calendar",
    href: "/video-games/calendar",
  },
  {
    title: "All Games",
    href: "/video-games/search",
  },
];

const Path = (
  props: React.JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    React.RefAttributes<SVGPathElement>,
) => (
  <motion.path
    className="stroke-foreground"
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle: MenuToggle = ({ toggle }) => (
  <motion.button className="relative z-50 p-2" onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 20 20">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </motion.button>
);
