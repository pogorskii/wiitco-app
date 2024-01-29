import { clsx } from "clsx";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
export function AddToAccountButton({
  className,
  type,
}: {
  className?: string;
  type: "movie" | "tv" | "anime" | "person" | "game";
}) {
  const buttonTextEnum: { [key: string]: string } = {
    movie: "Track this movie",
    tv: "Track this TV show",
    anime: "Track this anime",
    person: "Add birthday reminder",
    game: "Track this game",
  };

  return (
    <Button
      variant="default"
      className={clsx("md-2 mt-4 w-full font-semibold tracking-wider md:mb-6", {
        [className as string]: className,
      })}
    >
      <FaPlus className="me-1" /> {buttonTextEnum[type]}
    </Button>
  );
}
