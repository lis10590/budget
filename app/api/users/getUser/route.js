import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import User from "@/app/_utils/schemas/User";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const res = await User.findOne({ email: userId });

  return NextResponse.json(res, {
    status: 200,
  });
}
