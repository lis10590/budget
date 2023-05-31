import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses";
import incomesReducer from "./incomes";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    incomes: incomesReducer,
  },
});

export default store;
