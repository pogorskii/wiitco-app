import { Suspense } from "react";
import Image from "next/image";
import { HeroSectionLottie } from "@/components/lottie-components/hero-section-lottie";
import { UpcomingReleasesCarousel } from "@/components/ui/upcoming-releases-carousel";
import { HeroSlidingText } from "@/components/ui/hero-sliding-text";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <>
      <section
        className="mx-[-24px] grid rounded-b-3xl border-t border-foreground bg-gradient-to-tr from-fuchsia-500 to-cyan-500 px-6 sm:mx-[-40px] sm:h-[80dvh] sm:min-h-[400px] sm:grid-cols-2 sm:px-10 lg:mx-[-80px] lg:px-20"
        id="hero"
      >
        <div className="flex items-center justify-center p-4 sm:px-8">
          <h1 className="inline-block scroll-m-20 py-4 text-5xl font-bold tracking-tight text-foreground sm:text-start md:text-6xl">
            The best place
            <br />
            to keep up with
            <br />
            <HeroSlidingText />
          </h1>
        </div>
        <div className="flex items-center justify-center py-4 sm:px-10 sm:py-10">
          <HeroSectionLottie />
        </div>
      </section>
      <section className="grid gap-4 py-16 sm:grid-cols-2">
        <div className="flex items-center justify-center">
          <Image
            src="/about-image.png"
            alt="About WIITCO"
            width={500}
            height={500}
            className="max-w-[300px]"
          />
        </div>
        <div className="px-8">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            More than a &quot;movie database&quot;
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            You can use WIITCO to search for movies, TV shows, celebrities and
            video games, but the main focus of the project are calendars for all
            the releases relevant to your interests.
          </p>
        </div>
      </section>
      <section>
        <h2 className="mb-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          What&apos;s coming up this week?
        </h2>
        <Suspense fallback={<Skeleton className="h-80 w-full" />}>
          <UpcomingReleasesCarousel />
        </Suspense>
      </section>
      <section className="sm:grid-cols- grid gap-4 py-16">
        <div className="px-8">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            No fluff, no catch
          </h2>
          <p className="mb-8 leading-7 [&:not(:first-child)]:mt-6">
            WIITCO is built for users, not profit. There are no subscribtions,
            ads or other gotchas.
          </p>
          <p className="text-xs text-muted-foreground">
            However, if you&apos;re looking for a talented developer, let&apos;s
            get in touch!
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/trust-image.png"
            alt="WIITCO free"
            width={500}
            height={500}
            className="max-w-[300px]"
          />
        </div>
      </section>
      <section className="flex flex-col items-center rounded-3xl bg-accent px-8 py-4 text-accent-foreground sm:mx-16 sm:px-20 sm:py-10">
        <h2 className="mb-4 scroll-m-20 text-center text-3xl font-semibold tracking-tight first:mt-0">
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
