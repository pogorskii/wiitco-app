import {
  FaExternalLinkAlt,
  FaWikipediaW,
  FaFacebookSquare,
  FaInstagramSquare,
  FaImdb,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IconType } from "react-icons/lib";

export function CinemaLinksList({
  homepage,
  links,
}: {
  homepage: string | null;
  links: {
    imdb_id: string | null;
    wikidata_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
  };
}) {
  if (!Object.values(links).some((e) => e !== null)) return null;

  const categoryEnum: { [key: string]: [string, IconType, string] } = {
    imdb_id: ["IMDb", FaImdb, "https://www.imdb.com/title/"],
    tvdb_id: ["TheTVDB", FaExternalLinkAlt, "https://thetvdb.com/series/"],
    tvrage_id: ["TVRage", FaExternalLinkAlt, "https://www.tvrage.com/shows/"],
    wikidata_id: ["Wikipedia", FaWikipediaW, "https://www.wikidata.org/wiki/"],
    facebook_id: ["Facebook", FaFacebookSquare, "https://www.facebook.com/"],
    twitter_id: ["X (Twitter)", FaXTwitter, "https://twitter.com/"],
    instagram_id: [
      "Instagram",
      FaInstagramSquare,
      "https://www.instagram.com/",
    ],
  };

  const listItems = Object.entries(links).map((link, i) => {
    if (!link[1] || !categoryEnum[link[0]]) return;
    const Icon = categoryEnum[link[0]][1];
    return (
      <li key={i}>
        <a
          className="hover:underline hover:underline-offset-4"
          href={`${categoryEnum[link[0]][2]}${link[1]}`}
        >
          <Icon className="me-1.5 inline-block" />
          <span>{categoryEnum[link[0]][0]}</span>
        </a>
      </li>
    );
  });

  return (
    <ul className="mb-8 grid grid-cols-2 gap-2 md:grid-cols-3">
      {homepage && (
        <li>
          <a
            className="hover:underline hover:underline-offset-4"
            href={homepage}
          >
            <FaExternalLinkAlt className="me-1.5 inline-block" />
            <span>Official site</span>
          </a>
        </li>
      )}
      {listItems}
    </ul>
  );
}
