import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewIncome,
  getIncomes,
  getIncomesByBudget,
} from "../requests/incomes";

const initialIncomesState = {
  incomes: [],
  incomesByBudget: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const incomeAddition = createAsyncThunk(
  "incomes/newIncome",
  async (income, thunkAPI) => {
    try {
      return await addNewIncome(income);
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

export const getAllIncomes = createAsyncThunk(
  "incomes/getIncomes",
  async (thunkAPI) => {
    try {
      return await getIncomes();
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

export const getAllIncomesByBudget = createAsyncThunk(
  "incomes/getIncomesByBudget",
  async (budgetId, thunkAPI) => {
    try {
      return await getIncomesByBudget(budgetId);
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

const incomeSlice = createSlice({
  name: "incomes",
  initialState: initialIncomesState,
  extraReducers: (builder) => {
    builder
      .addCase(incomeAddition.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(incomeAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incomes.push(action.payload);
      })
      .addCase(incomeAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllIncomes.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllIncomes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incomes = action.payload;
      })
      .addCase(getAllIncomes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllIncomesByBudget.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllIncomesByBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incomesByBudget = action.payload;
      })
      .addCase(getAllIncomesByBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default incomeSlice.reducer;

export const selectAllIncomes = (state) => state.incomes.incomes;
