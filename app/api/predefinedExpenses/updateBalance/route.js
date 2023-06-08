import PredefinedExpense from "@/app/_utils/schemas/PredefinedExpense";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import mongoose from "mongoose";

export async function PUT(req) {
  await connectDB();
  const { expenseId, newBalance } = await req.json();

  try {
    const expense = await PredefinedExpense.findByIdAndUpdate(
      expenseId,
      { $set: { balance: newBalance } },
      { new: true }
    );

    return NextResponse.json(expense, {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err, message: "updating expense failed" },
      { status: 400 }
    );
  }
}
