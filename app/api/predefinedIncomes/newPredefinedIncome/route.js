import PredefinedIncome from "@/app/_utils/schemas/PredefinedIncome";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req) {
  await connectDB();
  const predefinedIncome = await req.json();

  const newPredefinedIncome = await new PredefinedIncome(predefinedIncome);

  try {
    const savedIncome = await newPredefinedIncome.save();

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
