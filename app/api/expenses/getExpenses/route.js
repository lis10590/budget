import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Expense from "@/app/_utils/schemas/Expense";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET() {
  await connectDB();

  const res = await Expense.find({});
  return NextResponse.json(res, {
    status: 200,
  });
}
