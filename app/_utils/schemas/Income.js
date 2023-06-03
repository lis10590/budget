import { Schema, model, models } from "mongoose";

const incomeSchema = new Schema({
  incomeName: { type: String },
  category: { type: String },
  sum: { type: Number },
  date: { type: Date },
});

const Income = models.Income || model("Income", incomeSchema);

export default Income;
