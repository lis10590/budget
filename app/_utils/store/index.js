import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses";
import incomesReducer from "./incomes";
import authReducer from "./auth";
import usersReducer from "./users";
import modalReducer from "./modal";
import budgetReducer from "./budgets";
import predefinedExpensesReducer from "./predefinedExpenses";
import predefinedIncomesReducer from "./predefinedIncomes";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    incomes: incomesReducer,
    auth: authReducer,
    users: usersReducer,
    modal: modalReducer,
    budgets: budgetReducer,
    predefinedExpenses: predefinedExpensesReducer,
    predefinedIncomes: predefinedIncomesReducer,
  },
});

export default store;
