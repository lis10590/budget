import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import User from "@/app/_utils/schemas/User";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function PUT(req) {
  await connectDB();
  const body = await req.json();

  const res = await User.findOneAndUpdate(
    { email: body.email, "incomes.expenseName": body.incomeName },
    { $set: { "incomes.$.balance": body.newBalace } },
    { new: true }
  );

  return NextResponse.json(res, {
    status: 200,
  });
}
