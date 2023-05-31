import { Schema, model, models } from "mongoose";
import Expense from "./Expense";
import Income from "./Income";

const userSchema = new Schema({
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
  expenses: [Expense],
  incomes: [Income],
});

const User = models.User || model("User", userSchema);

export default User;
