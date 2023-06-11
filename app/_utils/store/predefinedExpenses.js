import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addPredefinedExpense,
  getPredefinedExpenses,
  updateBalance,
} from "../requests/predefinedExpenses";

const initialPredefinedExpensesState = {
  predefinedExpenses: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const predefinedExpenseAddition = createAsyncThunk(
  "predefinedExpenses/newPredefinedExpense",
  async (expense, thunkAPI) => {
    try {
      return await addPredefinedExpense(expense);
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

export const getAllPredefinedExpenses = createAsyncThunk(
  "predefinedExpenses/getPredefinedExpenses",
  async (thunkAPI) => {
    try {
      return await getPredefinedExpenses();
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

export const updateExpenseBalance = createAsyncThunk(
  "predefinedExpenses/updateBalance",
  async (obj, thunkAPI) => {
    try {
      return await updateBalance(obj);
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

const predefinedExpenseSlice = createSlice({
  name: "predefinedExpenses",
  initialState: initialPredefinedExpensesState,
  extraReducers: (builder) => {
    builder
      .addCase(predefinedExpenseAddition.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(predefinedExpenseAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.predefinedExpenses.push(action.payload);
      })
      .addCase(predefinedExpenseAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllPredefinedExpenses.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllPredefinedExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.predefinedExpenses = action.payload;
      })
      .addCase(getAllPredefinedExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateExpenseBalance.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateExpenseBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.predefinedExpenses = action.payload;
      })
      .addCase(updateExpenseBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default predefinedExpenseSlice.reducer;

export const selectAllExpenses = (state) =>
  state.predefinedExpenses.predefinedExpenses;
