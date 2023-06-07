import PredefinedExpense from "@/app/_utils/schemas/PredefinedExpense";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function PUT(req) {
  await connectDB();
  const { expenseId, newBalance } = await req.json();

  try {
    const expense = PredefinedExpense.findByIdAndUpdate(
      expenseId,
      { balance: newBalance },
      { new: true }
    );

    return NextResponse.json(expense, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      { err, message: "updating expense failed" },
      { status: 400 }
    );
  }
}
