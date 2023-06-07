import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const addPredefinedExpense = async (expense) => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/predefinedExpenses/newPredefinedExpense`,
      expense
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getPredefinedExpenses = async () => {
  try {
    const res = await axios.get(
      `${apiUrl}/api/predefinedExpenses/getPredefinedExpenses`,
      expense
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateBalance = async (obj) => {
  try {
    const res = await axios.put(
      `${apiUrl}/api/predefinedExpenses/updateBalance`,
      obj
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
