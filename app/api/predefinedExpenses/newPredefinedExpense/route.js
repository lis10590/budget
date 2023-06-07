import PredefinedExpense from "@/app/_utils/schemas/PredefinedExpense";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req) {
  await connectDB();
  const predefinedExpense = await req.json();

  const newPredefinedExpense = await new PredefinedExpense(predefinedExpense);

  try {
    const savedExpense = await newPredefinedExpense.save();

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
