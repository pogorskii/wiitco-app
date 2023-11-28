"use client";

import { Button } from "@/components/ui/button";
import {
  drop,
  fetchAndUpdateLanguages,
  fetchAndUpdateGameEngines,
  fetchTest,
  fetchAndUpdateRegions,
  fetchAndUpdateGenres,
  fetchAndUpdatePlayerPerspectives,
  fetchAndUpdateReleaseDateStatuses,
} from "../lib/data";

export default async function Page() {
  const updateLanguages = async () => {
    let result = await fetchAndUpdateLanguages();
    let iteration = 1;
    setTimeout(() => {
      console.log("First iteration finished");
    }, 0);

    while (result === "OK") {
      result = await fetchAndUpdateLanguages(iteration);
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

  const updateRegions = async () => {
    let result = await fetchAndUpdateRegions();
    let iteration = 1;
    setTimeout(() => {
      console.log("First iteration finished");
    }, 0);

    while (result === "OK") {
      result = await fetchAndUpdateRegions(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const updateGenres = async () => {
    let result = await fetchAndUpdateGenres();
    let iteration = 1;
    setTimeout(() => {
      console.log("First iteration finished");
    }, 0);

    while (result === "OK") {
      result = await fetchAndUpdateGenres(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const updatePlayerPerspectives = async () => {
    let result = await fetchAndUpdatePlayerPerspectives();
    let iteration = 1;
    setTimeout(() => {
      console.log("First iteration finished");
    }, 0);

    while (result === "OK") {
      result = await fetchAndUpdatePlayerPerspectives(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const updateReleaseDateStatuses = async () => {
    let result = await fetchAndUpdateReleaseDateStatuses();
    let iteration = 1;
    setTimeout(() => {
      console.log("First iteration finished");
    }, 0);

    while (result === "OK") {
      result = await fetchAndUpdateReleaseDateStatuses(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const handleDelete = async () => {
    await drop();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => fetchTest()}>TEST</Button>
        <Button onClick={updateLanguages}>Update Languages</Button>
        <Button onClick={updateGameEngines}>Update Game Engines</Button>
        <Button onClick={updateRegions}>Update Regions</Button>
        <Button onClick={updateGenres}>Update Genres</Button>
        <Button onClick={updatePlayerPerspectives}>
          Update Player Perspectives
        </Button>
        <Button onClick={updateReleaseDateStatuses}>
          Update Release Date Statuses
        </Button>

        <Button variant="destructive" onClick={handleDelete}>
          DROP game engines table
        </Button>
      </div>
    </div>
  );
}
