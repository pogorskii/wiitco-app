"use client";

import { Button } from "@/components/ui/button";
import {
  fetchAndUpdateLanguages,
  fetchAndUpdateAgeRatingContentDescription,
} from "../lib/data";

export default async function Page() {
  const updateLanguages = async () => {
    await fetchAndUpdateLanguages();
  };
  const updateAgeRatingContentDescriptions = async () => {
    await fetchAndUpdateAgeRatingContentDescription();
    setTimeout(() => {
      console.log("Operation finished");
    }, 0);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Button onClick={updateLanguages}>Update Languages</Button>
      <Button onClick={updateAgeRatingContentDescriptions}>
        Update Age Ratings Descriptions
      </Button>
    </div>
  );
}
