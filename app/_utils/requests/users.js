import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getUser = async (userId) => {
  try {
    const res = await axios.get(`${apiUrl}/api/users/getUser?userId=${userId}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addBudgetToUser = async (obj) => {
  try {
    const res = await axios.put(`${apiUrl}/api/users/addBudgetToUser`, obj);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addChosenBudget = async (obj) => {
  try {
    const res = await axios.put(`${apiUrl}/api/users/addChosenBudget`, obj);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// export const updateExpense = async (obj) => {
//   try {
//     const res = await axios.put(`${apiUrl}/api/users/updateExpense`, obj);
//     return res.data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const updateIncome = async (obj) => {
//   try {
//     const res = await axios.put(`${apiUrl}/api/users/updateIncome`, obj);
//     return res.data;
//   } catch (err) {
//     console.error(err);
//   }
// };
