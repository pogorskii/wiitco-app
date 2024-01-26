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
  if (!links) return null;

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
            className=" text-blue-500 hover:text-blue-400 hover:underline hover:decoration-solid hover:underline-offset-4"
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
