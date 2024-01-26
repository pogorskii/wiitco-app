import { format, formatDistanceToNow } from "date-fns";

export function DisplayFullDate({
  startDate,
  endDate,
  addSuffix = false,
}: {
  startDate?: Date | null;
  endDate?: Date | null;
  addSuffix?: boolean;
}) {
  if (!startDate || isNaN(startDate.getTime())) return null;

  if (!endDate || isNaN(endDate.getTime()))
    return (
      <span>
        {format(startDate, "MMMM d yyyy")}
        {addSuffix && (
          <>
            {" "}
            (
            {formatDistanceToNow(startDate, {
              addSuffix: true,
            })}
            )
          </>
        )}
      </span>
    );

  return (
    <span>
      {format(startDate, "MMMM d yyyy")} – {format(endDate, "MMMM d yyyy")}
    </span>
  );
}
