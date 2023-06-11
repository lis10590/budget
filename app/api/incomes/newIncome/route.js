import Income from "@/app/_utils/schemas/Income";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req) {
  await connectDB();
  const income = await req.json();
  const newIncome = await new Income(income);
  try {
    const savedIncome = await newIncome.save();

    return NextResponse.json(savedIncome, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      { err, message: "Saving income failed" },
      { status: 400 }
    );
  }
}
