import User from "@/app/_utils/schemas/User";

import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  console.log(userId);
  try {
    const user = await User.findById(userId).populate("budgets");

    console.log(user);

    return NextResponse.json(user.budgets, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err, message: "getting budgets failed" },
      { status: 400 }
    );
  }
}
