import Budget from "@/app/_utils/schemas/Budget";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req) {
  await connectDB();
  const budget = await req.json();
  const newBudget = await new Budget({
    name: budget.name,
    balance: budget.balance,
    incomesAmount: budget.incomesAmount,
    expensesAmount: budget.expensesAmount,
    predefinedExpenses: budget.predefinedExpenses,
    predefinedIncomes: budget.predefinedIncomes,
    expenses: [],
    incomes: [],
  });

  try {
    const savedBudget = await newBudget.save();
    return NextResponse.json(savedBudget, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      { err, message: "Saving budget failed" },
      { status: 400 }
    );
  }
}
