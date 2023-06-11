import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Income from "@/app/_utils/schemas/Income";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET() {
  await connectDB();
  const res = await Income.find({});

  return NextResponse.json(res, {
    status: 200,
  });
}
