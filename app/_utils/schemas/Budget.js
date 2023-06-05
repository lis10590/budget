import { Schema, model, models } from "mongoose";

const budgetSchema = new Schema({
  name: { type: String },
  balance: { type: Number },
  incomesAmount: { type: Number },
  expensesAmount: { type: Number },
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
  incomes: [{ type: Schema.Types.ObjectId, ref: "Income" }],
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
