import Budget from "@/app/_utils/schemas/Budget";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req) {
  await connectDB();
  const { expenseId, budgetId } = await req.json();
  try {
    Budget.findByIdAndUpdate(budgetId, {
      $push: {
        expenses: expenseId,
      },
    });
    const budgets = Budget.find({});
    return NextResponse.json(budgets, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      { err, message: "adding expense to budget failed" },
      { status: 400 }
    );
  }
}
