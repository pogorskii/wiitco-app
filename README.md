# ReleaseNexus

(Formerly known as WIITCO (When Is It Coming Out))

This is the ultimate Next.js web app to track release dates for movies, TV shows, and video games, built with the best possible UX in mind.

## The Problem: there are no sites to check release dates for various media in one place

Suprisingly enough, this is true. Despite the fact that many people watch movies and play video games, somehow, nobody provides a convinient all-in-one solution for the simple task: "I want to know, what's coming out this month?".

Sure, there are half-decent ways to view upcoming movies/TV shows and video games separately, but even they leave a lot to be desired.

By analysing existing popular sites (such as various movies/games databases), I've found a few common disadvantages:

- No calendar view of upcoming releases.
- No filters.
- Outdated or uninformative UI.
- No way for users to track releases they're interested in and form their own calendars.
- Bad search.

ReleaseNexus is designed to solve all of the above.

## The Stack

- **Next.js** – frontend and backend.
- **Vercel** — hosting.
- **TypeScript** – programming language.
- **TailwindCSS** — styling.
- **Shadcn** — UI library.
- **Zod** — data validation.
- **PostgreSQL** – robust database.
- **Prisma** — ORM that abstracts SQL code with readable and type-safe queries.
- **Framer Motion** — a few tactically placed animations.
- **Auth0** — signup / login.
- **Go** — additional backend to sync the database with external APIs.

## The Challenge: engineering the ultimate database instead of solely relying on API calls

This is where ReleaseNexus differs from all those "movie database" pet projects you might've seen. It's far more than just a simple frontend that makes a couple API calls.

Initially, I thought that it would be enough to design and build a modern frontend to use all the available external data with comfort and ease. Then I found out, that neither TMDB (the most popular movies/TV database) nor IGDB (the most extensive video games database backed by Twitch/Amazon) provide a simple way to fetch movies/shows/games by their release month.

While they are amazing platform with very generous policies for devs like me, the simply don't have endpoints/filters that satisfies a call that asks "fetch me everything of this media releasing in this specific month". Also, they provided very limited capabilities for filtering data, poor search endpoints, and/or subpar performance.

Because of that, I had to actually create my own database to store millions of entries from those platforms and actually make them usable for the project.

## The BIGGEST Challenge: remaking a messy noSQL database into reliable PostgreSQL

I soon found out a big and unexpected problem: turns out, IGDB stores its data in some kind of noSQL solution. Meaning, there are a lot of orphan records, some parent tables reference child tables that, in face, reference _other_ parents instead, etc., etc.

After dismantling this mess of a relations system, I came up with a DB structure and logic that fetches those records, filters out everything bad, and normalizes the rest.

You can view the full database schema [here](https://github.com/pogorskii/wiitco-db-blueprint).

## Another hurdle: how to constantly sync hundreds of thousands of records and not get timed out

Prisma is a friendly and nice ORM, Next.js is a great framework with amazing UX. However, combined, they share a big bottleneck: JavaScript.

While working on ReleaseNexus, I experienced firsthand, why JS isn't always the best choice for your _entire_ backend. In my case, it's the single-threaded nature of the engine that hurt me the most.

Let's just say, it's technically possible to fetch hundreds of thousands records from APIs (that have very small records per request limit), validate them and write in your DB. But it will take _hours_ every single time you're doing it.

So because of that, I looked for various solutions and ended up writing a separate backend on Go (an extremely performant asynchronous language) to serve as a utility API to handle this daunting task. You can check out the code in a separate repo [here](https://github.com/pogorskii/wiitco-db-api).

## The Backlog: how I plan to improve the project in the future

1. More informative content cards.
2. Additional microinteractions (animations).
3. Additional filters for calendars and search.
4. Ability to view release dates for specific countries/regions.
5. Calendar with celebrities birthdays.
6. Ability to track specific kind of releases (one season, digital release of the movie, full release of the game etc.) instead of all of them at once.
7. Profile customisation.
8. Optional push/email notification of when something that user tracks is coming up or get delayed.
9. Ability to export your personal calendar as a .csv file to add to your real calendar.
10. Either PWA version or even a native mobile Expo app.

## Authors

- **Stanislav Pogorskii** — that's me! I did everything, from design to code, myself.

## Contribution

If you have an idea on how to improve the project, feel free contact me here or via links in the site's footer.

## Acknowledgments

- **TMDB** and **IGDB** – this project wouldn't be possible without your generous APIs.
- **HowLongToBeat** and **JustWatch** — for providing additional useful information.
- **Everyone who gave their advices and feedback for the project** — you are amazing.
