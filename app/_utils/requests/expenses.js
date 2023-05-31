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

export const getExpenses = async (userId) => {
  try {
    const res = await axios.get(
      `${apiUrl}/api/expenses/getExpenses?userId=${userId}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
