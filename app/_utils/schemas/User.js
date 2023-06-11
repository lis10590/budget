import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
  budgets: [{ type: Schema.Types.ObjectId, ref: "Budget" }],
  chosenBudget: { type: Schema.Types.ObjectId, ref: "Budget" },
});

const User = models.User || model("User", userSchema);

export default User;
