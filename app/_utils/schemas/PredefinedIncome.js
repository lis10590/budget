import { Schema, model, models } from "mongoose";

const predefinedIncomeSchema = new Schema({
  category: { type: String },
  sum: { type: Number },
});

const PredefinedIncome =
  models.Predefinedincome || model("Predefinedincome", predefinedIncomeSchema);

export default PredefinedIncome;
