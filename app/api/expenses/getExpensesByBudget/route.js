import Expense from "@/app/_utils/schemas/Expense";
import Budget from "@/app/_utils/schemas/Budget";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const budgetId = searchParams.get("budgetId");

  const budget = await Budget.findById(budgetId);

  if (budget) {
    let expenses = [];
    for (const id of budget.expenses) {
      const expense = await Expense.findById(id);
      expenses.push(expense);
    }

    return NextResponse.json(expenses, {
      status: 200,
    });
  }
}
