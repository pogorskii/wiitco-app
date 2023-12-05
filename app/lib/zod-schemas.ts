import { z } from "zod";

const transformAgeRating = (r: number): string => {
  const ratingsEnum: { [key: number]: string } = {
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
  const ratingString = ratingsEnum[r] || "Not supported";
  return ratingString;
};

const transformGameCategory = (c: number): string => {
  const categoriesEnum: { [key: number]: string } = {
    0: "Main Game",
    1: "DLC",
    2: "Expansion",
    3: "Bundle",
    4: "Standalone DLC",
    5: "Mod",
    6: "Episode",
    7: "Season",
    8: "Remake",
    9: "Remaster",
    10: "Expanded Game",
    11: "Port",
    12: "Fork",
    13: "Pack",
    14: "Update",
  };
  const categoryString = categoriesEnum[c];
  return categoryString;
};

type Languages = z.infer<typeof languageSupportsSchema>;
export type FormattedLanguage = {
  nativeName: string;
  id: number;
  name: string;
  locale: string;
  supportType: {
    id: number;
    name: string;
  }[];
};

const transformLanguages = (langArrRaw: Languages): FormattedLanguage[] => {
  const languagesMap = new Map<number, any>();
  const mergeProp = "supportType" as any;

  for (const langObj of langArrRaw) {
    const id = langObj.language.id;
    const mergedLangObj = languagesMap.get(id) || ({} as any);

    for (const property in langObj) {
      if (property === mergeProp) {
        if (!Array.isArray(mergedLangObj[mergeProp])) {
          mergedLangObj[mergeProp] = [];
        }
        mergedLangObj[mergeProp].push((langObj as any)[mergeProp]);
      } else {
        (mergedLangObj as any)[property] = (langObj as any)[property];
      }
    }

    languagesMap.set(id, mergedLangObj);
  }

  const result = [];
  for (const [id, mergedLangObj] of Array.from(languagesMap)) {
    const obj = {
      ...mergedLangObj.language,
      supportType: mergedLangObj.supportType,
    };
    result.push(obj);
  }

  return result;
};

const coverSchema = z
  .object({
    url: z.string().transform((url) => "https:" + url),
    width: z.number(),
    height: z.number(),
  })
  .transform(({ url, ...rest }) => ({
    imageUrl: url.replace("t_thumb", "t_original"),
    blurUrl: url,
    ...rest,
  }))
  .optional();

const gameBaseSchema = z.object({
  name: z.string(),
  slug: z.string(),
  cover: coverSchema.optional(),
});

const languageSupportsSchema = z.array(
  z
    .object({
      language: z
        .object({
          id: z.number(),
          name: z.string(),
          native_name: z.string(),
          locale: z.string(),
        })
        .transform(({ native_name, ...rest }) => ({
          nativeName: native_name,
          ...rest,
        })),
      language_support_type: z.object({
        id: z.number(),
        name: z.string(),
      }),
    })
    .transform(({ language, language_support_type }) => ({
      language,
      supportType: language_support_type,
    }))
);

const collectionSchema = z.object({
  name: z.string(),
  slug: z.string(),
  games: z
    .array(
      z
        .object({
          id: z.number(),
          name: z.string(),
          slug: z.string(),
          cover: z
            .object({
              url: z.string().transform((url) => "https:" + url),
              width: z.number(),
              height: z.number(),
            })
            .optional(),
          category: z.number().default(0).transform(transformGameCategory),
          platforms: z
            .array(
              z
                .number()
                .or(z.object({ id: z.number() }))
                .transform((entry) =>
                  typeof entry === "object" ? entry.id : entry
                )
            )
            .optional(),
          parent_game: z
            .object({
              name: z.string(),
              slug: z.string(),
            })
            .optional(),
        })
        .transform(({ parent_game, ...rest }) => ({
          parentGame: parent_game,
          ...rest,
        }))
    )
    .optional(),
});
export type Collection = z.infer<typeof collectionSchema>;

export const gameSearchSchema = z.array(
  z
    .object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
      platforms: z.array(z.object({ id: z.number() })).optional(),
      category: z.number().default(0).transform(transformGameCategory),
      cover: z
        .object({
          url: z.string().transform((url) => "https:" + url),
          width: z.number().default(264),
          height: z.number().default(374),
        })
        .transform(({ url, ...rest }) => ({
          imageUrl: url.replace("t_thumb", "t_cover_big"),
          blurUrl: url.replace("t_thumb", "t_cover_small"),
          ...rest,
        }))
        .optional(),
      aggregated_rating: z.number().default(0),
      first_release_date: z
        .number()
        .transform((val) => new Date(val * 1000))
        .optional(),
      franchises: z
        .array(z.object({ name: z.string(), slug: z.string() }))
        .optional(),
      game_engines: z
        .array(z.object({ name: z.string(), slug: z.string() }))
        .optional(),
      genres: z
        .array(z.object({ name: z.string(), slug: z.string() }))
        .optional(),
      language_supports: z
        .array(
          z.object({ language: z.object({ id: z.number(), name: z.string() }) })
        )
        .optional(),
      involved_companies: z
        .array(
          z.object({
            company: z.object({ name: z.string(), slug: z.string() }),
          })
        )
        .optional(),
      parent_game: z
        .object({
          name: z.string(),
          slug: z.string(),
          first_release_date: z
            .number()
            .transform((val) => new Date(val * 1000))
            .optional(),
        })
        .transform(({ first_release_date, ...rest }) => ({
          releaseDate: first_release_date,
          ...rest,
        }))
        .optional(),
    })
    .transform(
      ({
        id,
        platforms,
        aggregated_rating,
        first_release_date,
        game_engines,
        language_supports,
        involved_companies,
        parent_game,
        ...rest
      }) => ({
        gameId: id,
        platforms: platforms?.map((p) => p.id),
        rating: aggregated_rating,
        releaseDate: first_release_date,
        gameEngines: game_engines,
        languages: language_supports,
        companies: involved_companies,
        parentGame: parent_game,
        ...rest,
      })
    )
);
