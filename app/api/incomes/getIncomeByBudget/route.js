import Budget from "@/app/_utils/schemas/Budget";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const budgetId = searchParams.get("budgetId");
  try {
    const incomesByBudget = await Budget.findById(budgetId).populate("incomes");

    return NextResponse.json(incomesByBudget.incomes, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      { err, message: "getting incomes failed" },
      { status: 400 }
    );
  }
}
