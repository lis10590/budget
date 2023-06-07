import User from "@/app/_utils/schemas/User";
import Budget from "@/app/_utils/schemas/Budget";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const budgetId = searchParams.get("budgetId");
  console.log(budgetId);

  try {
    const budget = await Budget.findById(budgetId)
      .populate("expenses")
      .populate("incomes")
      .populate("predefinedExpenses")
      .populate("predefinedIncomes");

    console.log(budget);

    return NextResponse.json(budget, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      { err, message: "getting budget failed" },
      { status: 400 }
    );
  }
}
