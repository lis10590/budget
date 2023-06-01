import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addNewExpense } from "../requests/expenses";

const initialExpensesState = {
  expenses: [],
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
      });
  },
});

export default expenseSlice.reducer;

export const selectAllExpenses = (state) => state.expenses.expenses;
