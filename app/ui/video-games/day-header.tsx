export function DayHeader({
  day,
  displayDate,
}: {
  day: number;
  displayDate: string;
}) {
  return (
    <h2
      key={day !== 50 ? day : "TBD"}
      className="flex flex-col self-start col-span-1 scroll-m-20 border-b-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0"
    >
      {day !== 50 ? `${displayDate}` : "Without a date"}
    </h2>
  );
}
