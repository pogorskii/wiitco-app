import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const currDate = new Date();
const currYear = currDate.getFullYear();
const currMonth = currDate.getMonth();

type InitialState = {
  value: DateState;
};

type DateState = {
  month: number;
  year: number;
};

const initialState: InitialState = {
  value: {
    month: currMonth,
    year: currYear,
  },
};

export const date = createSlice({
  name: "date",
  initialState,
  reducers: {
    decMonth: (state) => {
      let month = state.value.month;
      let year = state.value.year;

      if (month === 0) {
        month = 11;
        year--;
      } else {
        month--;
      }

      return {
        value: {
          month,
          year,
        },
      };
    },
    incMonth: (state) => {
      let month = state.value.month;
      let year = state.value.year;

      if (month === 11) {
        month = 0;
        year++;
      } else {
        month++;
      }

      return {
        value: {
          month,
          year,
        },
      };
    },
    setDate: (_state, action: PayloadAction<DateState>) => {
      return {
        value: {
          month: action.payload.month,
          year: action.payload.year,
        },
      };
    },
  },
});

export const { decMonth, incMonth, setDate } = date.actions;
export default date.reducer;
