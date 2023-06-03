import { Schema, model, models } from "mongoose";
import Expense from "./Expense";
import Income from "./Income";

const budgetSchema = new Schema({
  name: { type: String },
  balance: { type: Number },
  incomesAmount: { type: Number },
  expensesAmount: { type: Number },
  expenses: [{ type: Schema.Types.ObjectId, ref: Expense }],
  incomes: [{ type: Schema.Types.ObjectId, ref: Income }],
  predefinedExpenses: [
    {
      _id: false,
      category: { type: String },
      sum: { type: Number },
      balance: { type: Number },
    },
  ],
  predefinedIncomes: [
    {
      _id: false,
      category: { type: String },
      sum: { type: Number },
    },
  ],
});

const Budget = models.Budget || model("Budget", budgetSchema);

export default Budget;
