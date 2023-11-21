import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: GameTypesState;
};

type GameTypesState = {
  showGameTypes: number[];
};

// 0: "Main Game",
//     1: "DLC",
//     2: "Expansion",
//     3: "Bundle",
//     4: "Standalone DLC",
//     5: "Mod",
//     6: "Episode",
//     7: "Season",
//     8: "Remake",
//     9: "Remaster",
//     10: "Expanded Game",

const initialState: InitialState = {
  value: {
    showGameTypes: [0, 1, 2, 4, 6, 7, 8, 9, 10],
  },
};

// game.category != (3, 5, 11, 12, 13, 14)

export const gameFilters = createSlice({
  name: "game-filters",
  initialState,
  reducers: {
    resetFilters: () => initialState,
    checkMainGame: (state) => {
      let gameTypes = [...state.value.showGameTypes];
      if (gameTypes.includes(0)) {
        gameTypes = gameTypes.filter((x) => x !== 0);
      } else {
        gameTypes.push(0);
      }

      return {
        value: {
          showGameTypes: gameTypes,
        },
      };
    },
    checkDLC: (state) => {
      let gameTypes = [...state.value.showGameTypes];
      if (gameTypes.includes(1)) {
        gameTypes = gameTypes.filter((x) => x !== 1);
      } else {
        gameTypes.push(1);
      }

      return {
        value: {
          showGameTypes: gameTypes,
        },
      };
    },
  },
});

export const { resetFilters, checkMainGame, checkDLC } = gameFilters.actions;
export default gameFilters.reducer;
