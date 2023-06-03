import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, addBudgetToUser } from "../requests/users";

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

export const budgetAdditionToUser = createAsyncThunk(
  "users/addBudgetToUser",
  async (userId, thunkAPI) => {
    try {
      return await addBudgetToUser(userId);
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
      .addCase(budgetAdditionToUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(budgetAdditionToUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(budgetAdditionToUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default userSlice.reducer;

//   export const selectAllIncomes = (state) => state.incomes.incomes;
