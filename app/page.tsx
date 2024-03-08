import { Suspense } from "react";
import Image from "next/image";
import { HeroSectionLottie } from "@/components/lottie-components/hero-section-lottie";
import { UpcomingReleasesCarousel } from "@/components/ui/upcoming-releases-carousel";
import { HeroSlidingText } from "@/components/ui/hero-sliding-text";
import { Skeleton } from "@/components/ui/skeleton";
import { MdDateRange, MdSearch } from "react-icons/md";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Movies, TV shows and video games releases calendar | ReleaseNexus`,
  };
}

export default function Page() {
  return (
    <>
      <section
        className="mx-[-24px] px-10 sm:mx-[-40px] lg:mx-[-80px] lg:px-20"
        id="hero"
      >
        <div className="mb-8 grid grid-cols-2 pt-10 sm:grid-cols-4">
          <div className="col-span-2 pe-8">
            <h1 className="block scroll-m-20 py-4 text-5xl font-bold tracking-tight text-foreground sm:text-start md:text-6xl">
              The best place
              <br />
              to keep up with
              <br />
              <HeroSlidingText />
            </h1>
          </div>
          <div className="col-span-2 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="col-span-1 flex flex-col justify-between gap-4 rounded-2xl bg-accent p-4 pe-8 text-accent-foreground sm:p-6">
              <MdDateRange size={36} />
              <p className="max-w-[300px] leading-7">
                Browse calendars with upcoming movies, TV shows,
                and&nbsp;video&nbsp;games.
              </p>
            </div>
            <div className="col-span-1 flex flex-col justify-between gap-4 rounded-2xl bg-accent p-4 pe-8 text-accent-foreground sm:p-6">
              <MdSearch size={36} />
              <p className="max-w-[300px] leading-7">
                Search the entire database and form your own
                personal&nbsp;calendars.
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex min-h-[22rem] items-end justify-start rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-cyan-500 p-4 sm:p-6">
          <HeroSectionLottie className="absolute right-1/2 top-[-4rem] translate-x-1/2 sm:right-10 sm:translate-x-0" />
          <a
            className="flex h-16 w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white px-4 py-2 text-2xl font-semibold tracking-wider text-black ring-offset-background transition-all hover:gap-4 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:max-w-xs"
            href="/api/auth/login"
          >
            <span>Sign Up</span>
            <span>&rarr;</span>
          </a>
        </div>
      </section>
      <section className="grid gap-4 py-16 sm:grid-cols-2">
        <div className="flex items-center justify-center">
          <Image
            src="/about-image.svg"
            alt="About ReleaseNexus"
            width={500}
            height={500}
            className="max-h-[200px] w-auto"
          />
        </div>
        <div className="flex flex-col justify-center px-8">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            More than a &quot;movie&nbsp;database&quot;
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The search functionality is included, but ReleaseNexus&apos; main
            focus are calendars for all the releases relevant
            to&nbsp;your&nbsp;interests.
          </p>
        </div>
      </section>
      <section>
        <h2 className="mb-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          What&apos;s coming up this week?
        </h2>
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <UpcomingReleasesCarousel />
        </Suspense>
      </section>
      <section className="grid gap-4 py-16 sm:grid-cols-2">
        <div className="px-8">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            No fluff, no&nbsp;catch
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            ReleaseNexus is built for users, not&nbsp;profit.
          </p>
          <p className="mb-6 leading-7">
            There are no subscribtions, ads or other&nbsp;gotchas.
          </p>
          <p className="text-xs text-muted-foreground">
            However, if you&apos;re looking for a talented developer,
            let&apos;s&nbsp;get&nbsp;in&nbsp;touch!
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/trust-image.svg"
            alt="WIITCO free"
            width={500}
            height={500}
            className="max-h-[200px] w-auto"
          />
        </div>
      </section>
      <section className="flex flex-col items-center rounded-3xl bg-accent p-6 text-accent-foreground md:mx-32">
        <h2 className="mb-2 scroll-m-20 text-center text-4xl font-semibold tracking-tight first:mt-0">
          Join now
        </h2>
        <p className="mb-8">And never miss a release date again!</p>
        <a
          className="flex h-16 w-full max-w-xs items-center justify-center gap-2 whitespace-nowrap rounded-3xl bg-primary px-4 py-2 text-2xl font-semibold tracking-wider text-primary-foreground ring-offset-background transition-all hover:gap-4 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          href="/api/auth/login"
        >
          <span>Sign Up</span>
          <span>&rarr;</span>
        </a>
      </section>
    </>
  );
}
