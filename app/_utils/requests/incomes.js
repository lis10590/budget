import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const addNewIncome = async (income) => {
  try {
    const res = await axios.post(`${apiUrl}/api/incomes/newIncome`, income);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getIncomes = async (userId) => {
  try {
    const res = await axios.get(
      `${apiUrl}/api/incomes/getIncomes?userId=${userId}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
