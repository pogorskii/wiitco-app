import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
export function AddToAccountButton({
  type,
}: {
  type: "movie" | "tv" | "anime" | "person" | "game";
}) {
  const buttonTextEnum: { [key: string]: string } = {
    movie: "Watch this movie",
    tv: "Watch this TV show",
    anime: "Watch this anime show",
    person: "Set birthday reminder",
    game: "Watch this video game",
  };

  return (
    <Button className="mt-4 md-2 md:mb-6 w-full">
      <FaPlus className="me-1" /> {buttonTextEnum[type]}
    </Button>
  );
}
