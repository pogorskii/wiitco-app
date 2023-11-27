"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  fetchAndUpdateLanguages,
  fetchAndUpdateAgeRatingContentDescription,
} from "../lib/data";

export default async function Page() {
  const [iteration, setIteration] = useState(0);

  const updateLanguages = async () => {
    await fetchAndUpdateLanguages();
  };
  const updateAgeRatingContentDescriptions = async () => {
    await fetchAndUpdateAgeRatingContentDescription(iteration);
    setTimeout(() => {
      console.log("Operation finished");
    }, 0);
    setIteration(iteration + 1);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Button onClick={updateLanguages}>Update Languages</Button>
      <Button onClick={updateAgeRatingContentDescriptions}>
        Update Age Ratings Descriptions ({iteration})
      </Button>
    </div>
  );
}
