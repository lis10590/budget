import { Expense } from "@/app/_utils/schemas";
import Income from "@/app/_utils/schemas";
import PredefinedExpense from "@/app/_utils/schemas";
import PredefinedIncome from "@/app/_utils/schemas";
import Budget from "@/app/_utils/schemas/Budget";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const budgetName = searchParams.get("budgetName");

  try {
    const budget = await Budget.find({ name: budgetName })
      .populate({
        path: "expenses",
      })
      .populate({ path: "incomes" })
      .populate({ path: "predefinedExpenses" })
      .populate({ path: "predefinedIncomes" });
    return NextResponse.json(budget, {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err, message: "getting budget failed" },
      { status: 400 }
    );
  }
}
