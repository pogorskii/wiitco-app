"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  drop,
  fetchAndUpdateGames,
  fetchAndUpdateLanguages,
  fetchAndUpdateAgeRatings,
  fetchAndUpdateGameEngines,
  fetchTest,
  fetchAndUpdateGenres,
  fetchAndUpdatePlayerPerspectives,
  fetchAndUpdateReleaseDateStatuses,
  fetchAndUpdateCovers,
  fetchAndCreateCompanies,
} from "../lib/data";

export default function Page() {
  const [iterationOffset, setIterationOffset] = useState(0);

  // const createCompanies = async () => {
  //   let result = await fetchAndCreateCompanies();
  //   let iteration = 1 + iterationOffset;
  //   setTimeout(() => {
  //     console.log(`First iteration (${iteration}) finished`);
  //   }, 0);

  //   while (result === "OK") {
  //     result = await fetchAndCreateCompanies(iteration);
  //     setTimeout(() => {
  //       console.log(`Iteration ${iteration} finished`);
  //     }, 0);
  //     iteration++;

  //     if (result === "EMPTY") console.log("Finished updating");
  //   }
  // };

  const handleDelete = async () => {
    await drop();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="flex flex-wrap gap-4">
        <Input
          type="number"
          onChange={(e) => setIterationOffset(Number(e.target.value))}
          placeholder={iterationOffset.toString()}
        ></Input>
        {/* <Button onClick={createCompanies}>CREATE Companies</Button> */}
        <Button onClick={() => fetchTest()}>TEST</Button>
        <Button variant="destructive" onClick={handleDelete}>
          DROP game engines table
        </Button>
      </div>
    </div>
  );
}
