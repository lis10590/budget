import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses";
import incomesReducer from "./incomes";
import authReducer from "./auth";
import usersReducer from "./users";
import modalReducer from "./modal";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    incomes: incomesReducer,
    auth: authReducer,
    users: usersReducer,
    modal: modalReducer,
  },
});

export default store;
