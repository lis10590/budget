import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const addBudget = async (budget) => {
  try {
    const res = await axios.post(`${apiUrl}/api/budgets/newBudget`, budget);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getBudgets = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/budgets/getBudgets`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getBudget = async (budgetId) => {
  try {
    const res = await axios.get(
      `${apiUrl}/api/budgets/getBudget?budgetId=${budgetId}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addExpenseToBudget = async (obj) => {
  try {
    const res = await axios.put(
      `${apiUrl}/api/budgets/addExpenseToBudget`,
      obj
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addIncomeToBudget = async (obj) => {
  try {
    const res = await axios.put(`${apiUrl}/api/budgets/addIncomeToBudget`, obj);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getBudgetsByUser = async (userId) => {
  try {
    const res = await axios.get(
      `${apiUrl}/api/budgets/getBudgetsByUser?userId=${userId}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getBudgetByNameAndUser = async (budgetId) => {
  try {
    const res = await axios.get(
      `${apiUrl}/api/budgets/getBudgetByNameAndUser?budgetId=${budgetId}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addPredefinedExpenseToBudget = async (obj) => {
  try {
    const res = await axios.put(
      `${apiUrl}/api/budgets/addPredefinedExpense`,
      obj
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addPredefinedIncomeToBudget = async (obj) => {
  try {
    const res = await axios.put(
      `${apiUrl}/api/budgets/addPredefinedIncome`,
      obj
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
