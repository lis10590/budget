import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
  expenses: [
    {
      expenseName: { type: String },
      sum: { type: Number },
      balance: { type: Number },
    },
  ],
  incomes: [
    {
      incomeName: { type: String },
      sum: { type: Number },
    },
  ],
});

const User = models.User || model("User", userSchema);

export default User;
