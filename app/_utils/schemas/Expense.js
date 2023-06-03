import { Schema, model, models } from "mongoose";

const expenseSchema = new Schema({
  expenseName: { type: String },
  category: { type: String },
  sum: { type: Number },
  date: { type: Date },
});

const Expense = models.Expense || model("Expense", expenseSchema);

export default Expense;
