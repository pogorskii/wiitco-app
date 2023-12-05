"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  drop,
  fetchTest,
  fetchAndCreateRegions,
  fetchAndCreateLanguages,
  fetchAndCreateLanguageSupportTypes,
  fetchAndCreateReleaseDateStatuses,
  fetchAndCreateCollectionTypes,
  fetchAndCreateFranchises,
  fetchAndCreateCompanyLogos,
  fetchAndCreateGenres,
  fetchAndCreateModes,
  fetchAndCreatePlayerPerspectives,
  fetchAndCreateEngineLogos,
  fetchAndCreateThemes,
  fetchAndCreatePlatformFamilies,
  fetchAndCreatePlatformLogos,
  fetchAndCreateCollections,
  fetchAndCreateParentCompanies,
  fetchAndCreateChildCompanies,
  fetchAndCreateEngines,
  fetchAndCreatePlatforms,
  fetchAndJoinEngines,
  fetchAndCreateParentGames,
  fetchAndCreateChildGames,
  fetchAndConnectCompanyGame,
  fetchAndConnectSimilarGames,
  fetchAndUpdateParentGames,
  fetchAndUpdateChildGames,
} from "../lib/data";

export default function Page() {
  const [iterationOffset, setIterationOffset] = useState(0);

  const createRegions = async () => {
    let result = await fetchAndCreateRegions();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateRegions(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createLanguages = async () => {
    let result = await fetchAndCreateLanguages();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateLanguages(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createLanguageSupportTypes = async () => {
    let result = await fetchAndCreateLanguageSupportTypes();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateLanguageSupportTypes(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createReleaseDateStatuses = async () => {
    let result = await fetchAndCreateReleaseDateStatuses();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateReleaseDateStatuses(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createCollectionTypes = async () => {
    let result = await fetchAndCreateCollectionTypes();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateCollectionTypes(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createFranchises = async () => {
    let result = await fetchAndCreateFranchises();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateFranchises(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createCompanyLogos = async () => {
    let result = await fetchAndCreateCompanyLogos();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateCompanyLogos(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createGenres = async () => {
    let result = await fetchAndCreateGenres();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateGenres(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createModes = async () => {
    let result = await fetchAndCreateModes();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateModes(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createPlayerPerspectives = async () => {
    let result = await fetchAndCreatePlayerPerspectives();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreatePlayerPerspectives(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createEngineLogos = async () => {
    let result = await fetchAndCreateEngineLogos();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateEngineLogos(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createThemes = async () => {
    let result = await fetchAndCreateThemes();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateThemes(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createPlatformFamilies = async () => {
    let result = await fetchAndCreatePlatformFamilies();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreatePlatformFamilies(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createPlatformLogos = async () => {
    let result = await fetchAndCreatePlatformLogos();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreatePlatformLogos(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  // Second order

  const createCollections = async () => {
    let result = await fetchAndCreateCollections();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateCollections(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createParentCompanies = async () => {
    let result = await fetchAndCreateParentCompanies();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateParentCompanies(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createChildCompanies = async () => {
    let result = await fetchAndCreateChildCompanies();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateChildCompanies(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createEngines = async () => {
    let result = await fetchAndCreateEngines();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateEngines(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createPlatforms = async () => {
    let result = await fetchAndCreatePlatforms();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreatePlatforms(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const joinEngines = async () => {
    let result = await fetchAndJoinEngines();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndJoinEngines(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createParentGames = async () => {
    let result = await fetchAndCreateParentGames();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateParentGames(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const createChildGames = async () => {
    let result = await fetchAndCreateChildGames();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndCreateChildGames(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const connectCompanyGame = async () => {
    let result = await fetchAndConnectCompanyGame();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndConnectCompanyGame(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const connectSimilarGames = async () => {
    let result = await fetchAndConnectSimilarGames();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndConnectSimilarGames(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const updateParentGames = async () => {
    let result = await fetchAndUpdateParentGames();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndUpdateParentGames(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  const updateChildGames = async () => {
    let result = await fetchAndUpdateChildGames();
    let iteration = 1 + iterationOffset;
    setTimeout(() => {
      console.log(`First iteration (${iteration}) finished`);
    }, 0);

    while (result === "OK") {
      result = await fetchAndUpdateChildGames(iteration);
      setTimeout(() => {
        console.log(`Iteration ${iteration} finished`);
      }, 0);
      iteration++;

      if (result === "EMPTY") console.log("Finished updating");
    }
  };

  //

  const handleDelete = async () => {
    await drop();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="flex flex-col gap-4">
        <Input
          type="number"
          onChange={(e) => setIterationOffset(Number(e.target.value))}
          placeholder={iterationOffset.toString()}
        ></Input>
        <div className="flex flex-wrap gap-2">
          <Button onClick={createRegions}>CREATE Regions</Button>
          <Button onClick={createLanguages}>CREATE Languages</Button>
          <Button onClick={createLanguageSupportTypes}>
            CREATE LanguageSupportTypes
          </Button>
          <Button onClick={createReleaseDateStatuses}>
            CREATE ReleaseDateStatuses
          </Button>
          <Button onClick={createCollectionTypes}>
            CREATE CollectionTypes
          </Button>
          <Button onClick={createFranchises}>CREATE Franchises</Button>
          <Button onClick={createCompanyLogos}>CREATE CompanyLogos</Button>
          <Button onClick={createGenres}>CREATE Genres</Button>
          <Button onClick={createModes}>CREATE Modes</Button>
          <Button onClick={createPlayerPerspectives}>
            CREATE PlayerPerspectives
          </Button>
          <Button onClick={createEngineLogos}>CREATE EngineLogos</Button>
          <Button onClick={createThemes}>CREATE Themes</Button>
          <Button onClick={createPlatformFamilies}>
            CREATE PlatformFamilies
          </Button>
          <Button onClick={createPlatformLogos}>CREATE PlatformLogos</Button>
        </div>
        <h2>Second Order</h2>
        <div className="flex flex-wrap gap-2">
          <Button onClick={createCollections}>CREATE Collections</Button>
          <Button onClick={createParentCompanies}>
            CREATE ParentCompanies
          </Button>
          <Button onClick={createChildCompanies}>CREATE ChildCompanies</Button>
          <Button onClick={createEngines}>CREATE Engines</Button>
          <Button onClick={createPlatforms}>CREATE Platforms</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={joinEngines}>JOIN Engines</Button>
        </div>
        <h2>Games!</h2>
        <div className="flex flex-wrap gap-2">
          <Button onClick={createParentGames}>CREATE ParentGames</Button>
          <Button onClick={createChildGames}>CREATE ChildGames</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={connectCompanyGame}>CONNECT CompanyGame</Button>
          <Button onClick={connectSimilarGames}>CONNECT SimilarGames</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={updateParentGames}>UPDATE ParentGames</Button>
          <Button onClick={updateChildGames}>UPDATE ChildGames</Button>
        </div>
        <Button onClick={() => fetchTest()}>TEST</Button>
        <Button variant="destructive" onClick={handleDelete}>
          DROP game engines table
        </Button>
      </div>
    </div>
  );
}
