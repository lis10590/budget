import User from "@/app/_utils/schemas/User";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function PUT(req) {
  await connectDB();
  const body = await req.json();

  try {
    const user = await User.findOneAndUpdate(
      { email: body.email },
      {
        $push: {
          budgets: {
            id: body.budgetId,
          },
        },
      }
    );
    return NextResponse.json(user, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      { err, message: "adding budget to user failed" },
      { status: 400 }
    );
  }
}
