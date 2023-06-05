import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const addNewExpense = async (expense) => {
  try {
    const res = await axios.post(`${apiUrl}/api/expenses/newExpense`, expense);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getExpenses = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/expenses/getExpenses`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getExpensesByBudget = async (budgetId) => {
  try {
    const res = await axios.get(
      `${apiUrl}/api/expenses/getExpensesByBudget?budgetId=${budgetId}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
