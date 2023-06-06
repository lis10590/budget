import User from "@/app/_utils/schemas/User";
import Budget from "@/app/_utils/schemas/Budget";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const budgetName = searchParams.get("budgetName");

  try {
    const user = await User.findById(userId).populate("budgets");

    if (user) {
      for (const item of user.budgets) {
        if (item.name === budgetName) {
          const budget = await Budget.findById(item._id)
            .populate("expenses")
            .populate("incomes");

          return NextResponse.json(budget, {
            status: 200,
          });
        }
      }
    }
  } catch (err) {
    return NextResponse.json(
      { err, message: "getting budget failed" },
      { status: 400 }
    );
  }
}
