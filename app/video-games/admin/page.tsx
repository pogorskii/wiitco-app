"use client";

import { Button } from "@/components/ui/button";
import {
  fetchAndUpdateLanguages,
  fetchAndUpdateAgeRatingContentDescription,
  fetchAndUpdateGameEngines,
  fetchTemp,
} from "../lib/data";

export default async function Page() {
  const updateLanguages = async () => {
    await fetchAndUpdateLanguages();
  };

  const updateAgeRatingContentDescriptions = async () => {
    let result = await fetchAndUpdateAgeRatingContentDescription();
    let iteration = 1;
    setTimeout(() => {
      console.log("First iteration finished");
    }, 0);

    while (result === "OK") {
      result = await fetchAndUpdateAgeRatingContentDescription(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const updateGameEngines = async () => {
    let result = await fetchAndUpdateGameEngines();
    let iteration = 1;
    setTimeout(() => {
      console.log("First iteration finished");
    }, 0);

    while (result === "OK") {
      result = await fetchAndUpdateGameEngines(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Button onClick={updateLanguages}>Update Languages</Button>
      <Button onClick={updateAgeRatingContentDescriptions}>
        Update Age Ratings Descriptions
      </Button>
      <Button onClick={updateGameEngines}>Update Game Engines</Button>
      <Button onClick={() => fetchTemp()}>TEST</Button>
    </div>
  );
}
