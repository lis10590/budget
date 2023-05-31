import { Schema, model, models } from "mongoose";

const expenseSchema = new Schema({
  list: [
    {
      expenseName: { type: String },
      sum: { type: Number },
      balance: { type: Number },
    },
  ],
});

const Expense = models.Expense || model("Expense", expenseSchema);

export default Expense;
