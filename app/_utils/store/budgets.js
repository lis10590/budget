import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addBudget,
  getBudget,
  getBudgets,
  addExpenseToBudget,
  addIncomeToBudget,
  getBudgetsByUser,
  getBudgetByNameAndUser,
  addPredefinedExpenseToBudget,
  addPredefinedIncomeToBudget,
} from "../requests/budgets";

const initialBudgetState = {
  budgets: [],
  budgetsByUser: [],
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

export const expenseAdditionToBudget = createAsyncThunk(
  "budgets/addExpenseToBudget",
  async (obj, thunkAPI) => {
    try {
      return await addExpenseToBudget(obj);
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

export const incomeAdditionToBudget = createAsyncThunk(
  "budgets/addIncomeToBudget",
  async (obj, thunkAPI) => {
    try {
      return await addIncomeToBudget(obj);
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

export const getAllBudgetsByUser = createAsyncThunk(
  "budgets/getBudgetsByUser",
  async (userId, thunkAPI) => {
    try {
      return await getBudgetsByUser(userId);
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
export const getBudgetByName = createAsyncThunk(
  "budgets/getBudgetByNameAndUser",
  async (obj, thunkAPI) => {
    try {
      return await getBudgetByNameAndUser(obj);
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

export const predefinedExpenseAdditionToBudget = createAsyncThunk(
  "budgets/addPredefinedExpense",
  async (obj, thunkAPI) => {
    try {
      return await addPredefinedExpenseToBudget(obj);
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

export const predefinedIncomeAdditionToBudget = createAsyncThunk(
  "budgets/addPredefinedIncome",
  async (obj, thunkAPI) => {
    try {
      return await addPredefinedIncomeToBudget(obj);
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
        state.budget = action.payload;
      })
      .addCase(getBudgetById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(expenseAdditionToBudget.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(expenseAdditionToBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.budget = action.payload;
      })
      .addCase(expenseAdditionToBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(incomeAdditionToBudget.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(incomeAdditionToBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.budget = action.payload;
      })
      .addCase(incomeAdditionToBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllBudgetsByUser.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllBudgetsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.budgetsByUser = action.payload;
      })
      .addCase(getAllBudgetsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBudgetByName.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getBudgetByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.budget = action.payload;
      })
      .addCase(getBudgetByName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(predefinedExpenseAdditionToBudget.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(predefinedExpenseAdditionToBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.budgets = action.payload;
      })
      .addCase(predefinedExpenseAdditionToBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(predefinedIncomeAdditionToBudget.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(predefinedIncomeAdditionToBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.budgets = action.payload;
      })
      .addCase(predefinedIncomeAdditionToBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default budgetSlice.reducer;

export const selectAllBudgets = (state) => state.budgets.budgets;
