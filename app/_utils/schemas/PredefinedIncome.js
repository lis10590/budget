import { Schema, model, models } from "mongoose";

const predefinedIncomeSchema = new Schema(
  {
    category: { type: String },
    sum: { type: Number },
  },
  { collection: "predefinedincomes" }
);

const PredefinedIncome =
  models["PredefinedIncome"] ||
  model("PredefinedIncome", predefinedIncomeSchema);

export default PredefinedIncome;
