import Expense from "@/app/_utils/schemas/Expense";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req) {
  await connectDB();
  const expense = await req.json();
  const newExpense = await new Expense(expense);
  try {
    const savedExpense = await newExpense.save();

    return NextResponse.json(savedExpense, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      { err, message: "Saving expense failed" },
      { status: 400 }
    );
  }
}
