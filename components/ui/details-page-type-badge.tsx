import { Badge } from "./badge";

export function DetailsPageTypeBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Badge
      variant="outline"
      className="mb-2 w-full justify-center sm:w-fit sm:justify-start"
    >
      {children}
    </Badge>
  );
}
