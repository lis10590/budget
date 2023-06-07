import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const addPredefinedIncome = async (income) => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/predefinedIncomes/newPredefinedIncome`,
      income
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getPredefinedIncomes = async () => {
  try {
    const res = await axios.get(
      `${apiUrl}/api/predefinedIncomes/getPredefinedIncomes`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
