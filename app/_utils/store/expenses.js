import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewExpense,
  getExpenses,
  getExpensesByBudget,
} from "../requests/expenses";

const initialExpensesState = {
  expenses: [],
  expensesByBudget: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const expenseAddition = createAsyncThunk(
  "expenses/newExpense",
  async (expense, thunkAPI) => {
    try {
      return await addNewExpense(expense);
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

export const getAllExpenses = createAsyncThunk(
  "expenses/getExpenses",
  async (thunkAPI) => {
    try {
      return await getExpenses();
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

export const getAllExpensesByBudget = createAsyncThunk(
  "expenses/getExpensesByBudget",
  async (budgetId, thunkAPI) => {
    try {
      return await getExpensesByBudget(budgetId);
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

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  extraReducers: (builder) => {
    builder
      .addCase(expenseAddition.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(expenseAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses.push(action.payload);
      })
      .addCase(expenseAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllExpenses.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses = action.payload;
      })
      .addCase(getAllExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllExpensesByBudget.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllExpensesByBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expensesByBudget = action.payload;
      })
      .addCase(getAllExpensesByBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default expenseSlice.reducer;

export const selectAllExpenses = (state) => state.expenses.expenses;
