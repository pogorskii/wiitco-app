"use server";

import prisma from "../lib/prisma";
type RomanNumeral = keyof typeof romanNumerals;

const romanNumerals: Record<string, number> = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
  XI: 11,
  XII: 12,
  XIII: 13,
  XIV: 14,
  XV: 15,
  XVI: 16,
  XVII: 17,
  XVIII: 18,
  XIX: 19,
  XX: 20,
  XXI: 21,
  XXII: 22,
  XXIII: 23,
  XXIV: 24,
  XXV: 25,
  XXVI: 26,
  XXVII: 27,
  XXVIII: 28,
  XXIX: 29,
  XXX: 30,
  C: 100,
  CC: 200,
  CCC: 300,
  CD: 400,
  D: 500,
  DC: 600,
  DCC: 700,
  DCCC: 800,
  CM: 900,
  M: 1000,
  MM: 2000,
  MMM: 3000,
};

const romanToArabic = (romanString: RomanNumeral): number => {
  if (!romanNumerals.hasOwnProperty(romanString)) {
    throw new Error("Invalid Roman numeral");
  }

  let result = 0;
  for (let i = romanString.length - 1; i >= 0; i--) {
    const currentNumeral = romanNumerals[romanString[i]];
    const nextNumeral =
      i < romanString.length - 1 ? romanNumerals[romanString[i + 1]] : 0;

    if (currentNumeral < nextNumeral) {
      result -= currentNumeral;
    } else {
      result += currentNumeral;
    }
  }

  return result;
};

const arabicToRoman = (arabicNumber: number): string => {
  if (arabicNumber < 1 || arabicNumber > 3999) {
    throw new Error("Arabic number must be between 1 and 3999");
  }
  let result = "";
  for (const key in romanNumerals) {
    while (arabicNumber >= romanNumerals[key]) {
      result += key;
      arabicNumber -= romanNumerals[key];
    }
  }
  return result;
};

export const fetchGamesSearchDB = async ({
  search,
  engine,
  company,
  genre,
  itemsPerPage = 20,
  page = 1,
  categories = "main,dlc,expansion",
  platforms,
  sort = "relevance",
}: {
  search?: string;
  engine?: string;
  company?: string;
  genre?: string;
  itemsPerPage?: number;
  page?: number;
  categories?: string;
  platforms?: string;
  sort?: string;
}) => {
  try {
    // Custom fuzzy search for text quiery
    const searchQuery = search
      ? search
          ?.replace(/\s+/g, " ")
          .trim()
          .replaceAll(":", "")
          .replaceAll("-", "")
          .split(" ")
          .map((word) => {
            const romanNumeralRegex =
              /^M{0,3}(CM|CD|DCCC|CCCLX|CC|XC|L|XL|X|IX|VIII|VII|VI|V|IV|III|II|I)$/i;
            let convertedWord = "";
            if (/^[0-9]+/.test(word)) {
              const romanNumeral = arabicToRoman(Number(word));
              convertedWord = `( ${word} | ${romanNumeral} )`;
            }
            if (romanNumeralRegex.test(word)) {
              const arabicNumeral = romanToArabic(
                word.toUpperCase()
              ).toString();
              convertedWord = `( ${word} | ${arabicNumeral})`;
            } else {
              convertedWord = word;
            }
            return convertedWord;
          })
          .map((word) => {
            let result;
            if (/.{2,}s$/.test(word)) {
              const wordWithApostrophe = word.replace(
                /s$/,
                (match) => "'" + match
              );
              result = `( ${word} | ${wordWithApostrophe})`;
            } else {
              result = word;
            }
            return result;
          })
          .join(" & ")
      : undefined;

    // Convert 'categories' search param
    const categoriesEnum: { [key: string]: number } = {
      main: 0,
      dlc: 1,
      expansion: 2,
      bundle: 3,
      standalone: 4,
      mod: 5,
      episode: 6,
      season: 7,
      remake: 8,
      remaster: 9,
      expanded: 10,
      port: 11,
      update: 14,
    };
    const categoriesQuery = categories.split(",").map((x) => categoriesEnum[x]);

    // Handle 'platforms' search param
    const platformsQuery = platforms ? Number(platforms) : undefined;

    // Additional rules for 'where' if it's not the main Games page
    let categorySpecificQuery = {};
    if (engine) {
      categorySpecificQuery = {
        engines: {
          some: {
            engine: {
              slug: {
                search: engine,
              },
            },
          },
        },
      };
    }
    if (company) {
      categorySpecificQuery = {
        OR: [
          {
            developers: {
              some: {
                developer: {
                  slug: company,
                },
              },
            },
          },
          {
            publishers: {
              some: {
                publisher: {
                  slug: company,
                },
              },
            },
          },
        ],
      };
    }
    if (genre) {
      categorySpecificQuery = {
        genres: {
          some: {
            genre: {
              slug: {
                search: genre,
              },
            },
          },
        },
      };
    }

    // Using shorthand property 'where' of Prisma query
    const where = {
      AND: [
        {
          OR: [
            {
              name: {
                search: searchQuery,
              },
            },
            {
              altNames: {
                some: {
                  name: {
                    search: searchQuery,
                  },
                },
              },
            },
          ],
        },
        {
          platforms: {
            some: {
              platformId: platformsQuery,
            },
          },
        },
        {
          category: {
            in: categoriesQuery,
          },
        },
        categorySpecificQuery,
      ],
    };

    // Using shorthand property 'select' of Prisma query
    const select = {
      name: true,
      slug: true,
      category: true,
      firstReleaseDate: true,
      cover: {
        select: {
          imageId: true,
          width: true,
          height: true,
        },
      },
      platforms: {
        select: {
          platformId: true,
        },
      },
      altNames: {
        select: {
          name: true,
        },
      },
    };

    // Handle sorting rules (relevance is default)
    let results;
    if (sort === "relevance") {
      if (searchQuery) {
        results = await prisma.game.findMany({
          skip: (page - 1) * itemsPerPage,
          take: itemsPerPage,
          where,
          orderBy: [
            { follows: "desc" },
            {
              _relevance: {
                fields: ["name"],
                search: searchQuery,
                sort: "desc",
              },
            },
          ],
          select,
        });
      } else {
        results = await prisma.game.findMany({
          skip: (page - 1) * itemsPerPage,
          take: itemsPerPage,
          where,
          orderBy: {
            follows: "desc",
          },
          select,
        });
      }
    }
    if (sort === "date-newer") {
      results = await prisma.game.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        where,
        orderBy: {
          firstReleaseDate: { sort: "desc", nulls: "last" },
        },
        select,
      });
    }
    if (sort === "date-older") {
      results = await prisma.game.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        where,
        orderBy: {
          firstReleaseDate: { sort: "asc", nulls: "last" },
        },
        select,
      });
    }
    if (sort === "title-a-z") {
      results = await prisma.game.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        where,
        orderBy: {
          name: "asc",
        },
        select,
      });
    }
    if (sort === "title-z-a") {
      results = await prisma.game.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        where,
        orderBy: {
          name: "desc",
        },
        select,
      });
    }

    return results;
  } catch (error) {
    console.error("Search error: ", error);
  }
};
