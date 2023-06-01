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
