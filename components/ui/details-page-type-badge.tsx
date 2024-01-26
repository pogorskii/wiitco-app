import { Badge } from "./badge";

export function DetailsPageTypeBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Badge
      variant="outline"
      className="w-full sm:w-fit justify-center sm:justify-start mb-2"
    >
      {children}
    </Badge>
  );
}
