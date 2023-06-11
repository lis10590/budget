import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addPredefinedIncome,
  getPredefinedIncomes,
} from "../requests/predefinedIncomes";

const initialPredefinedIncomesState = {
  predefinedIncomes: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const predefinedIncomeAddition = createAsyncThunk(
  "predefinedIncomes/newPredefinedIncome",
  async (income, thunkAPI) => {
    try {
      return await addPredefinedIncome(income);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllPredefinedIncomes = createAsyncThunk(
  "predefinedIncomes/getPredefinedIncomes",
  async (thunkAPI) => {
    try {
      return await getPredefinedIncomes();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const predefinedIncomeSlice = createSlice({
  name: "predefinedIncome",
  initialState: initialPredefinedIncomesState,
  extraReducers: (builder) => {
    builder
      .addCase(predefinedIncomeAddition.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(predefinedIncomeAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.predefinedIncomes.push(action.payload);
      })
      .addCase(predefinedIncomeAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllPredefinedIncomes.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllPredefinedIncomes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.predefinedIncomes = action.payload;
      })
      .addCase(getAllPredefinedIncomes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default predefinedIncomeSlice.reducer;

export const selectAllIncomes = (state) =>
  state.predefinedIncomes.predefinedIncomes;
