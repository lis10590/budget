import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import User from "@/app/_utils/schemas/User";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET() {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const res = await User.findById(userId);

  return NextResponse.json(res.incomes, {
    status: 200,
  });
}
