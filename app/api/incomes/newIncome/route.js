import User from "@/app/_utils/schemas/User";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req) {
  await connectDB();

  const income = await req.json();

  try {
    const existingIncome = await User.findOne({
      "incomes.incomeName": income.incomeName,
    }).populate("incomes");
    if (existingIncome) {
      return NextResponse.json("Income exists", {
        status: 400,
      });
    }
    try {
      let result = await User.findOneAndUpdate(
        { email: income.email },
        {
          $push: {
            incomes: {
              incomeName: income.incomeName,
              sum: income.sum,
            },
          },
        }
      );
      return NextResponse.json(result, {
        status: 200,
      });
    } catch (err) {
      return NextResponse.json(
        { err, message: "Saving income failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error, message: "getting incomes failed" },
      { status: 400 }
    );
  }
}
