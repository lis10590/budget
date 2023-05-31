import { Schema, model, models } from "mongoose";

const incomeSchema = new Schema({
  list: [
    {
      incomeName: { type: String },
      sum: { type: Number },
    },
  ],
});

const Income = models.Income || model("Income", incomeSchema);

export default Income;
