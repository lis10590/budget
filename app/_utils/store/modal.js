import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  addExpensesModalOpen: false,
  addIncomesModalOpen: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    addExpensesModalOpen(state) {
      state.addExpensesModalOpen = true;
    },
    addExpensesModalClose(state) {
      state.addExpensesModalOpen = false;
    },
    addIncomesModalOpen(state) {
      state.addIncomesModalOpen = true;
    },
    addIncomesModalClose(state) {
      state.addIncomesModalOpen = false;
    },
  },
});

export default modalSlice.reducer;
export const modalActions = modalSlice.actions;
