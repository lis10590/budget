import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, updateExpense, updateIncome } from "../requests/users";

const initialUsersState = {
  users: [],
  user: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getUserByEmail = createAsyncThunk(
  "users/getUser",
  async (userId, thunkAPI) => {
    try {
      return await getUser(userId);
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

export const updateOneExpense = createAsyncThunk(
  "users/updateExpense",
  async (obj, thunkAPI) => {
    try {
      return await updateExpense(obj);
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

export const updateOneIncome = createAsyncThunk(
  "users/updateIncome",
  async (obj, thunkAPI) => {
    try {
      return await updateIncome(obj);
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

const userSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  extraReducers: (builder) => {
    builder

      .addCase(getUserByEmail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateOneExpense.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateOneExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateOneExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateOneIncome.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateOneIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateOneIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default userSlice.reducer;

//   export const selectAllIncomes = (state) => state.incomes.incomes;
