import {
  FaExternalLinkAlt,
  FaWikipediaW,
  FaFacebookSquare,
  FaTwitch,
  FaInstagramSquare,
  FaYoutubeSquare,
  FaApple,
  FaAndroid,
  FaSteamSquare,
  FaRedditSquare,
  FaItchIo,
  FaDiscord,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiEpicgames, SiGogdotcom } from "react-icons/si";
import { IconType } from "react-icons/lib";

export function GameLinksList({
  links,
}: {
  links?: {
    url: string;
    category: number;
  }[];
}) {
  if (!links || !links.length) return null;

  const sortedLinks = links.sort((a, b) => a.category - b.category);

  const categoryEnum: { [key: number]: [string, IconType] } = {
    1: ["Official site", FaExternalLinkAlt],
    2: ["Wikia", FaExternalLinkAlt],
    3: ["Wikipedia", FaWikipediaW],
    4: ["Facebook", FaFacebookSquare],
    5: ["X (Twitter)", FaXTwitter],
    6: ["Twitch", FaTwitch],
    8: ["Instagram", FaInstagramSquare],
    9: ["YouTube", FaYoutubeSquare],
    10: ["iPhone", FaApple],
    11: ["iPad", FaApple],
    12: ["Android", FaAndroid],
    13: ["Steam", FaSteamSquare],
    14: ["Reddit", FaRedditSquare],
    15: ["Itch", FaItchIo],
    16: ["Epic Games", SiEpicgames],
    17: ["GOG", SiGogdotcom],
    18: ["Discord", FaDiscord],
  };

  const listItems = sortedLinks.map((l, i) => {
    const Icon = categoryEnum[l.category][1];
    return (
      <li key={i}>
        <a className="hover:underline hover:underline-offset-4" href={l.url}>
          <Icon className="me-1.5 inline-block" />
          <span>{categoryEnum[l.category][0]}</span>
        </a>
      </li>
    );
  });

  return (
    <ul className="mb-8 grid grid-cols-2 gap-2 md:grid-cols-3">{listItems}</ul>
  );
}
