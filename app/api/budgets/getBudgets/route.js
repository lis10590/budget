import Budget from "@/app/_utils/schemas/Budget";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET() {
  await connectDB();

  try {
    const budgets = await Budget.find({});
    return NextResponse.json(budgets, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      { err, message: "getting budgets failed" },
      { status: 400 }
    );
  }
}
