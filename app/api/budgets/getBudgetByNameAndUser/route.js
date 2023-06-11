import Expense from "@/app/_utils/schemas/Expense";
import Income from "@/app/_utils/schemas/Income";
import PredefinedExpense from "@/app/_utils/schemas/PredefinedExpense";
import PredefinedIncome from "@/app/_utils/schemas/PredefinedIncome";
import Budget from "@/app/_utils/schemas/Budget";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import mongoose from "mongoose";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const budgetId = searchParams.get("budgetId");
  console.log(budgetId);

  try {
    const budget = await Budget.findById(budgetId)
      .populate({
        path: "expenses",
      })
      .populate({ path: "incomes" })
      .populate({ path: "predefinedExpenses" })
      .populate({ path: "predefinedIncomes" });

    console.log(budget);

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
