"use server";

import { movieReleasesSchema } from "./zod-schemas";

const headers = new Headers();
headers.set("Accept", "application/json");
headers.set("Authorization", `Bearer ${process.env.TMDB_ACCESS_TOKEN}`);

const options = {
  method: "GET",
  headers,
};

export const tmdbTest = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/authentication",
      options
    );
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export const fetchMoviesByMonth = async ({
  page = "1",
}: {
  page?: string | number;
}) => {
  try {
    // fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2023-11-01&primary_release_date.lte=2023-11-30&region=us&release_date.gte=2023-11-01&release_date.lte=2023-11-30&sort_by=primary_release_date.asc', options)
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&release_date.gte=2023-11-01&release_date.lte=2023-11-02&sort_by=primary_release_date.asc`,
      options
    );
    const fetchedData = await response.json();

    console.log(fetchedData);
    const parsedData = movieReleasesSchema.parse(fetchedData.results);
    // console.log(parsedData);
    return parsedData;
  } catch (error) {
    console.error(`Error fetching movies from TMDB (${error})`);
  }
};
