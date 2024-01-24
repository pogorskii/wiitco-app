import { clsx } from "clsx";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";

type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx("text-lg")}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className="inline-block text-gray-900 dark:text-gray-100"
          >
            <Link
              className={clsx(
                {
                  "text-gray-900 dark:text-gray-100": breadcrumb.active,
                },
                {
                  "text-blue-500 hover:text-blue-400 hover:underline hover:underline-offset-2":
                    !breadcrumb.active,
                }
              )}
              href={breadcrumb.href}
            >
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && (
              <AiOutlineRight className="mx-3 inline-block" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
