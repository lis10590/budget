import Budget from "@/app/_utils/schemas/Budget";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function PUT(req) {
  await connectDB();
  const { incomeId, budgetId } = await req.json();
  try {
    const budget = await Budget.findByIdAndUpdate(
      budgetId,
      {
        $push: {
          incomes: incomeId,
        },
      },
      { new: true }
    )
      .populate("incomes")
      .populate("expenses");

    return NextResponse.json(budget, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      { err, message: "adding expense to budget failed" },
      { status: 400 }
    );
  }
}
