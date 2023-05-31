import User from "@/app/_utils/schemas/User";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req) {
  await connectDB();

  const expense = await req.json();
  console.log(expense);

  try {
    const user = await User.findOne({ email: expense.email });
    for (const item of user.expenses) {
      if (expense.expenseName === item.expenseName) {
        return NextResponse.json("Expense exists", {
          status: 400,
        });
      }
    }

    try {
      let result = await User.findOneAndUpdate(
        { email: expense.email },
        {
          $push: {
            expenses: {
              expenseName: expense.expenseName,
              sum: expense.sum,
              balance: expense.sum,
            },
          },
        }
      );
      return NextResponse.json(result, {
        status: 200,
      });
    } catch (err) {
      return NextResponse.json(
        { err, message: "Saving expense failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error, message: "getting expenses failed" },
      { status: 400 }
    );
  }
}
