import { User } from "@/app/_utils/schemas";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function PUT(req) {
  await connectDB();

  const { userId, budgetId } = await req.json();

  try {
    const user = await User.findByIdAndUpdate(userId, {
      chosenBudget: budgetId,
    });

    return NextResponse.json(budgetId, {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err, message: "updating chosen budget failed" },
      { status: 400 }
    );
  }
}
