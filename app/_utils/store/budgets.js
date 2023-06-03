import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addBudget, getBudget, getBudgets } from "../requests/budgets";

const initialBudgetState = {
  budgets: [],
  budget: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const budgetAddition = createAsyncThunk(
  "budgets/newBudget",
  async (budget, thunkAPI) => {
    try {
      return await addBudget(budget);
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

export const getAllBudgets = createAsyncThunk(
  "budgets/getBudgets",
  async (thunkAPI) => {
    try {
      return await getBudgets();
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

export const getBudgetById = createAsyncThunk(
  "budgets/getBudget",
  async (thunkAPI) => {
    try {
      return await getBudget();
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

const budgetSlice = createSlice({
  name: "budgets",
  initialState: initialBudgetState,
  extraReducers: (builder) => {
    builder
      .addCase(budgetAddition.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(budgetAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.budgets.push(action.payload);
      })
      .addCase(budgetAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllBudgets.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllBudgets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.budgets = action.payload;
      })
      .addCase(getAllBudgets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBudgetById.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getBudgetById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.budgets = action.payload;
      })
      .addCase(getBudgetById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default budgetSlice.reducer;

export const selectAllBudgets = (state) => state.budgets.budgets;
