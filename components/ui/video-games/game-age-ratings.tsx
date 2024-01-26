import Image from "next/image";
import { DetailsPageH2 } from "../details-page-h2";

type AgeRatingsType = {
  id: number;
  category: number;
  rating: number;
  synopsis: string | null;
  ratingCoverUrl: string | null;
  gameId: number;
  checksum: string;
}[];

export function GameAgeRatings({
  ageRatings,
}: {
  ageRatings?: AgeRatingsType;
}) {
  if (!ageRatings || !ageRatings.length) return null;

  const ratingEnum: { [key: number]: string } = {
    1: "Three",
    2: "Seven",
    3: "Twelve",
    4: "Sixteen",
    5: "Eighteen",
    6: "RP",
    7: "EC",
    8: "E",
    9: "E10",
    10: "T",
    11: "M",
    12: "AO",
  };

  return (
    <div className="mb-8 w-full">
      <DetailsPageH2>Age ratings</DetailsPageH2>
      <div className="flex items-center justify-start gap-2">
        {/* TODO: Add support for more ratings */}
        {ageRatings
          .filter((r) => r.category === 1 || r.category === 2)
          .map((r) => {
            const categoryName = r.category === 1 ? "esrb" : "pegi";
            const ratingName = ratingEnum[r.rating];
            return (
              <Image
                key={r.rating}
                src={`/${categoryName}/${ratingName}.svg`}
                width={r.category === 1 ? 68 : 56}
                height={r.category === 1 ? 68 : 68}
                alt={`${categoryName} ${ratingName}`}
              />
            );
          })}
      </div>
    </div>
  );
}
