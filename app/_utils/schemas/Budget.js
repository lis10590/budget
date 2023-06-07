import { Schema, model, models } from "mongoose";

const budgetSchema = new Schema({
  name: { type: String },
  balance: { type: Number },
  incomesAmount: { type: Number },
  expensesAmount: { type: Number },
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
  incomes: [{ type: Schema.Types.ObjectId, ref: "Income" }],
  predefinedExpenses: [
    { type: Schema.Types.ObjectId, ref: "Predefinedexpense" },
  ],
  predefinedIncomes: [{ type: Schema.Types.ObjectId, ref: "Predefinedincome" }],
});

const Budget = models.Budget || model("Budget", budgetSchema);

export default Budget;
