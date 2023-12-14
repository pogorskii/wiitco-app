import { tmdbTest, fetchMoviesByMonth } from "./lib/actions";

export default async function Page() {
  await fetchMoviesByMonth({});
  return (
    <main>
      <h1>HOLA DORA!!!!</h1>
    </main>
  );
}
