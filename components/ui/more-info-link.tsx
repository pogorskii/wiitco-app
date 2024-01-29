import Link from "next/link";
import { clsx } from "clsx";

export function MoreInfoLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <Link
      className={clsx(
        "flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-semibold tracking-wider text-primary-foreground ring-offset-background transition-all hover:gap-4 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      href={href}
    >
      <span>More info</span>
      <span>&rarr;</span>
    </Link>
  );
}
