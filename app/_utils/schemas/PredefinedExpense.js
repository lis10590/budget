import { Schema, model, models } from "mongoose";

const predefinedExpenseSchema = new Schema(
  {
    category: { type: String },
    sum: { type: Number },
    balance: { type: Number },
  },
  { collection: "predefinedexpenses" }
);

const PredefinedExpense =
  models["PredefinedExpense"] ||
  model("PredefinedExpense", predefinedExpenseSchema);

export default PredefinedExpense;
