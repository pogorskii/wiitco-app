export function NoResultsFound({ type }: { type: "calendar" | "search" }) {
  return (
    <div className="py-8 flex justify-center">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {type === "calendar"
          ? "Nothing scheduled for this month."
          : "Nothing found. Try changing the search parameters."}
      </h2>
    </div>
  );
}
