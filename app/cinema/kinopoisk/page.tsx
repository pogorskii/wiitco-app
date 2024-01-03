import { z } from "zod";
import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";

const KinopoiskMainSchema = z.object({
  nameRu: z.string().optional().nullable(),
  nameEn: z.string().optional().nullable(),
  nameOriginal: z.string().optional().nullable(),
  coverUrl: z.string().optional().nullable(),
  ratingAwaitCount: z.number().optional().nullable(),
  description: z.string().optional().nullable(),
  countries: z
    .array(
      z.object({
        country: z.string(),
      })
    )
    .optional(),
  genres: z
    .array(
      z.object({
        genre: z.string(),
      })
    )
    .optional(),
});
type KinopoiskMainSchema = z.infer<typeof KinopoiskMainSchema>;

const KinopoiskReleasesSchema = z.array(
  z.object({
    type: z.string(),
    subType: z.string().nullable(),
    date: z.string(),
    reRelease: z.boolean(),
    country: z
      .object({
        country: z.string(),
      })
      .nullable(),
  })
);
type KinopoiskReleasesSchema = z.infer<typeof KinopoiskReleasesSchema>;

const KinopoiskCreditsSchema = z.array(
  z.object({
    nameRu: z.string(),
    nameEn: z.string(),
    professionKey: z.string(),
  })
);
type KinopoiskCreditsSchema = z.infer<typeof KinopoiskCreditsSchema>;

const KinopoiskMovieListSchema = z.array(
  z.object({
    kinopoiskId: z.number(),
    premiereRu: z.string(),
  })
);

const fetchMovieKP = async (id: number) => {
  try {
    const response = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "c5687f29-b7d0-4b63-a480-29acf6d6fd4c",
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    const parsedData = KinopoiskMainSchema.parse(result);
    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

const fetchMovieReleasesKP = async (id: number) => {
  try {
    const response = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/distributions`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "c5687f29-b7d0-4b63-a480-29acf6d6fd4c",
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    const parsedData = KinopoiskReleasesSchema.parse(result.items);
    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

const fetchMovieCreditsKP = async (id: number) => {
  try {
    const response = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "c5687f29-b7d0-4b63-a480-29acf6d6fd4c",
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    const parsedData = KinopoiskCreditsSchema.parse(result);
    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

const fetchMovieDataKP = async (id: number) => {
  try {
    const base = await fetchMovieKP(id);
    // const releases = await fetchMovieReleasesKP(id);
    const credits = await fetchMovieCreditsKP(id);

    return { base, credits };
  } catch (err) {
    console.error(err);
  }
};

const fetchMoviePremieresListKP = async ({
  year = "2024",
  month,
}: {
  year?: string;
  month: string;
}) => {
  try {
    const response = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "c5687f29-b7d0-4b63-a480-29acf6d6fd4c",
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    const parsedData = KinopoiskMovieListSchema.parse(result.items);
    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

export default async function Page() {
  const movieIds = await fetchMoviePremieresListKP({ month: "DECEMBER" });
  if (!movieIds) return <p>Nothing found.</p>;
  const moviesCode = movieIds.map((m, i) => {
    if (i < 10)
      return (
        <div>
          <MovieCode id={m.kinopoiskId} releaseDate={m.premiereRu} />
        </div>
      );
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const moviesCode2 = movieIds.map((m, i) => {
    if (i >= 10 && i < 20)
      return (
        <div>
          <MovieCode id={m.kinopoiskId} releaseDate={m.premiereRu} />
        </div>
      );
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const moviesCode3 = movieIds.map((m, i) => {
    if (i >= 20 && i < 30)
      return (
        <div>
          <MovieCode id={m.kinopoiskId} releaseDate={m.premiereRu} />
        </div>
      );
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const moviesCode4 = movieIds.map((m, i) => {
    if (i >= 30 && i < 40)
      return (
        <div>
          <MovieCode id={m.kinopoiskId} releaseDate={m.premiereRu} />
        </div>
      );
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const moviesCode5 = movieIds.map((m, i) => {
    if (i >= 40 && i < 50)
      return (
        <div>
          <MovieCode id={m.kinopoiskId} releaseDate={m.premiereRu} />
        </div>
      );
  });

  return (
    <div>
      {moviesCode}
      {moviesCode2}
      {moviesCode3}
      {moviesCode4}
      {moviesCode5}
    </div>
  );
}

async function MovieCode({
  id,
  releaseDate,
}: {
  id: number;
  releaseDate: string;
}) {
  const result = await fetchMovieDataKP(id);
  if (!result) return;
  const { base, credits } = result;
  if (!base || !credits) return;
  if (!base.ratingAwaitCount || base.ratingAwaitCount < 500) return;

  function getMovieDate(dateString: string) {
    const date = parse(dateString, "yyyy-MM-dd", new Date(), {
      locale: ru,
    });
    const formattedDate = format(date, "d MMMM", {
      locale: ru,
    });
    return formattedDate;
  }

  // const russianDate = releases.find((r) => r.country?.country === "Россия");

  return (
    <code>
      &lt;h3&gt;
      {base?.nameRu && <>&laquo;{base?.nameRu}&raquo;</>}
      {base?.nameOriginal && base.nameOriginal !== base.nameRu ? (
        <> / {base?.nameOriginal}</>
      ) : (
        ""
      )}
      &lt;/h3&gt;
      <br />
      &lt;strong&gt;В российском прокате с {getMovieDate(releaseDate)}
      .&lt;/strong&gt;
      <br />
      &lt;ul&gt;
      <br />
      &lt;li&gt;&lt;strong&gt;Жанры:&lt;/strong&gt;{" "}
      {base?.genres &&
        base.genres.map((g, i, arr) => {
          if (i < 2) {
            if (i === 0) {
              if (arr.length > 1) {
                return <>{g.genre}, </>;
              } else {
                return <>{g.genre}</>;
              }
            } else {
              return <>{g.genre}</>;
            }
          }
        })}
      {"."}&lt;/li&gt;
      <br />
      &lt;li&gt;&lt;strong&gt;Страны производства:&lt;/strong&gt;{" "}
      {base?.countries &&
        base.countries.map((c, i, arr) => {
          if (i < 2) {
            if (i === 0) {
              if (arr.length > 1) {
                return <>{c.country}, </>;
              } else {
                return <>{c.country}</>;
              }
            } else {
              return <>{c.country}</>;
            }
          }
        })}
      {"."}
      <br />
      &lt;li&gt;&lt;strong&gt;Режиссер
      {credits?.filter((c) => c.professionKey === "DIRECTOR").length > 1 && (
        <>ы</>
      )}
      :&lt;/strong&gt;{" "}
      {credits
        .filter((c) => c.professionKey === "DIRECTOR")
        .map((d, i, arr) => {
          if (i < arr.length - 1) {
            return <>{d.nameRu}, </>;
          } else {
            return <>{d.nameRu}</>;
          }
        })}
      .&lt;/li&gt;
      <br />
      &lt;li&gt;&lt;strong&gt;В ролях:&lt;/strong&gt;{" "}
      {credits
        .filter((c) => c.professionKey === "ACTOR")
        .map((d, i, arr) => {
          if (i > 3) return;
          if (i < 3) {
            return <>{d.nameRu}, </>;
          } else {
            return <>{d.nameRu}</>;
          }
        })}{" "}
      и другие.&lt;/li&gt;
      <br />
      &lt;/ul&gt;
      <br />
      {base?.description ? (
        <>
          &lt;p&gt;{base.description}&lt;/p&gt;
          <br />
        </>
      ) : (
        ""
      )}
    </code>
  );
}

// export default async function Page() {
//   const result = await fetchMovieDataKP(301);
//   if (!result) return;
//   const { base, releases, credits } = result;
//   if (!base || !releases || !credits) return;

//   function getMovieDate(dateString: string) {
//     const date = parse(dateString, "yyyy-MM-dd", new Date(), {
//       locale: ru,
//     });
//     const formattedDate = format(date, "dd MMMM", {
//       locale: ru,
//     });
//     return formattedDate;
//   }

//   return (
//     <code>
//       &lt;p&gt;&lt;img src="{base.coverUrl}" alt="" width="730" height="auto"
//       /&gt;&lt;/p&gt;
//       <br />
//       &lt;ul&gt;
//       <br />
//       &lt;li&gt;&lt;strong&gt;
//       {base?.nameRu && <>&laquo;{base?.nameRu}&raquo;</>}
//       {base?.nameOriginal && base.nameOriginal !== base.nameRu ? (
//         <> / {base?.nameOriginal}</>
//       ) : (
//         ""
//       )}
//       &lt;/strong&gt;{" "}
//       {base?.genres &&
//         base.genres.map((g, i, arr) => {
//           if (i < 2) {
//             if (i === 0) {
//               if (arr.length > 1) {
//                 return <>({g.genre}, </>;
//               } else {
//                 return <>({g.genre})</>;
//               }
//             } else {
//               return <>{g.genre})</>;
//             }
//           }
//         })}{" "}
//       {base?.countries &&
//         base.countries.map((c, i, arr) => {
//           if (i < 2) {
//             if (i === 0) {
//               if (arr.length > 1) {
//                 return <>({c.country}, </>;
//               } else {
//                 return <>({c.country})</>;
//               }
//             } else {
//               return <>{c.country})</>;
//             }
//           }
//         })}{" "}
//       {releases.some((r) => r.country?.country === "Россия") ? (
//         <>
//           &ndash; в российском прокате с{" "}
//           {getMovieDate(
//             releases.find((r) => r.country?.country === "Россия")
//               ?.date as string
//           )}
//           .&lt;/li&gt;&lt;/ul&gt;
//         </>
//       ) : (
//         <>
//           &ndash; в мировом прокате с{" "}
//           {getMovieDate(
//             releases.find(
//               (r) => r.type === "PREMIRE" && r.country?.country === "США"
//             )?.date as string
//           )}
//           .&lt;/li&gt;&lt;/ul&gt;
//         </>
//       )}
//       <br />
//       {base?.description ? <>&lt;p&gt;{base.description}&lt;/p&gt;</> : ""}
//       <br />
//       &lt;p&gt;&lt;strong&gt;Режиссер
//       {credits?.filter((c) => c.professionKey === "DIRECTOR").length > 1 && (
//         <>ы</>
//       )}
//       :&lt;/strong&gt;{" "}
//       {credits
//         .filter((c) => c.professionKey === "DIRECTOR")
//         .map((d, i, arr) => {
//           if (i < arr.length - 1) {
//             return <>{d.nameRu}, </>;
//           } else {
//             return <>{d.nameRu}</>;
//           }
//         })}
//       .&lt;/p&gt;
//       <br />
//       &lt;p&gt;&lt;strong&gt;В ролях:&lt;/strong&gt;{" "}
//       {credits
//         .filter((c) => c.professionKey === "ACTOR")
//         .map((d, i, arr) => {
//           if (i > 3) return;
//           if (i < 3) {
//             return <>{d.nameRu}, </>;
//           } else {
//             return <>{d.nameRu}</>;
//           }
//         })}{" "}
//       и другие.&lt;/p&gt;
//     </code>
//   );
// }
