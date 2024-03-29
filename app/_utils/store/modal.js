import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  addExpensesModalOpen: false,
  addIncomesModalOpen: false,
  updateComponentModalOpen: false,
  chooseBudgetModalOpen: false,
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
    updateComponentModalOpen(state) {
      state.updateComponentModalOpen = true;
    },
    updateComponentModalClose(state) {
      state.updateComponentModalOpen = false;
    },
    chooseBudgetModalOpen(state) {
      state.chooseBudgetModalOpen = true;
    },
    chooseBudgetModalClose(state) {
      state.chooseBudgetModalOpen = false;
    },
  },
});

export default modalSlice.reducer;
export const modalActions = modalSlice.actions;
