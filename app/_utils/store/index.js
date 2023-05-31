import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses";
import incomesReducer from "./incomes";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    incomes: incomesReducer,
    auth: authReducer,
  },
});

export default store;
