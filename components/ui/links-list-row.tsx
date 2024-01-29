import Link from "next/link";
import { v4 as uuid } from "uuid";

export function LinksListRow({
  links,
  singularName,
  pluralName,
  linkType,
  linkCategory,
}: {
  links?: { name: string | number; slug: string | number }[];
  singularName: string;
  pluralName: string;
  linkType: string;
  linkCategory?: string;
}) {
  if (!links || !links.length) return null;

  const linkHrefBase = `/${linkType}${linkCategory ? `/${linkCategory}` : ""}/`;

  return (
    <li>
      <span className="font-semibold">
        {links.length === 1 ? `${singularName}:` : `${pluralName}:`}
      </span>
      {links.map((link, i, arr) => (
        <span key={uuid()}>
          <> </>
          <Link
            className=" text-primary hover:text-primary/90 hover:underline hover:underline-offset-4"
            href={`${linkHrefBase}${link.slug}`}
          >
            {link.name}
          </Link>
          <>{i < arr.length - 1 && ","}</>
        </span>
      ))}
    </li>
  );
}
