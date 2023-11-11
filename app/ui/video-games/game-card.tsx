import Image from "next/image";
import { GamePlatforms } from "./game-platforms";

export function GameCardVertical({
  id,
  title,
  imageUrl,
  blurUrl,
  platforms,
}: {
  id: number;
  title: string;
  imageUrl: string;
  blurUrl: string;
  platforms: number[];
}) {
  return (
    <div
      key={id}
      className="col-span-1 shadow border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden h-auto max-w-full rounded-lg"
    >
      <div className="grow-0 relative z-10 overflow-hidden">
        <Image
          className="hover:scale-105 duration-200 ease-in-out"
          src={imageUrl}
          alt={title}
          width={600}
          height={900}
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL={blurUrl}
        />
      </div>
      <div className="grow relative p-5 pt-0 pb-6">
        <div className="absolute z-0 inset-x-0 h-full max-w-lg bg-gradient-to-r from-rose-50/50 to-teal-50/50 dark:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] dark:from-sky-500 dark:to-indigo-900"></div>
        <h3 className="relative pt-5 mb-3 text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="relative">
          <GamePlatforms platforms={platforms} />
        </div>
      </div>
    </div>
  );
}

export function GameCardHorizontal({
  id,
  title,
  imageUrl,
  blurUrl,
  platforms,
}: {
  id: number;
  title: string;
  imageUrl: string;
  blurUrl: string;
  platforms: number[];
}) {
  return (
    <div
      key={id}
      className="mb-5 relative shadow border border-gray-200 dark:border-gray-800 grid grid-cols-2 overflow-hidden h-auto max-h-[250px] max-w-full rounded-lg"
    >
      <div className="relative col-span-1 flex flex-col justify-start p-5 pt-0 pb-6">
        <div className="absolute z-0 inset-x-0 m-auto h-full max-w-lg bg-gradient-to-r from-rose-50/50 to-teal-50/50 dark:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] dark:from-sky-500 dark:to-indigo-900"></div>
        <h3 className="relative pt-5 mb-3 text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="z-10">
          <GamePlatforms platforms={platforms} />
        </div>
      </div>
      <div className="relative col-span-1 overflow-hidden max-w-full">
        <Image
          className="hover:scale-105 duration-200 ease-in-out"
          src={imageUrl}
          alt={title}
          width={500}
          height={900}
          style={{ objectFit: "contain" }}
          placeholder="blur"
          blurDataURL={blurUrl}
        />
      </div>
    </div>
  );
}
