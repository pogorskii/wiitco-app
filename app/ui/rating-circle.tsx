import clsx from "clsx";

export async function RatingCircle({ rating }: { rating: number }) {
  return (
    <figure className="relative">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          pathLength="1"
          className={clsx(
            "fill-none stroke-[8%]",
            {
              "stroke-green-100": rating >= 70,
            },
            { "stroke-yellow-100": rating >= 40 && rating < 70 },
            { "stroke-red-100": rating < 40 && rating > 0 },
            { "stroke-gray-100": rating === 0 }
          )}
          style={{ strokeDashoffset: 0 }}
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          pathLength="100"
          className={clsx(
            "fill-none stroke-[8%]",
            {
              "stroke-green-500": rating >= 70,
            },
            { "stroke-yellow-500": rating >= 40 && rating < 70 },
            { "stroke-red-500": rating < 40 && rating > 0 },
            { "stroke-gray-500": rating === 0 }
          )}
          style={{
            strokeDashoffset: 100 - rating,
            strokeDasharray: "100 100",
            strokeLinecap: "round",
          }}
        />
      </svg>
      <div className="absolute font-semibold top-[50%] start-[50%] translate-y-[-50%] translate-x-[-50%] text-5xl flex flex-col items-center">
        <p>{rating > 0 ? Math.round(rating) : "??"}</p>
      </div>
    </figure>
  );
}
