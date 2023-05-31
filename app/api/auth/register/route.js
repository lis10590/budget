import User from "@/app/_utils/schemas/User";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function POST(req) {
  await connectDB();
  const res = await req.json();

  const { firstName, lastName, email, password } = res;
  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json(
      { message: "Please fill in all the fields" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  //Hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Create user

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    expenses: [],
    incomes: [],
  });

  if (user) {
    return NextResponse.json(
      {
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ message: "Invalid user data" }, { status: 400 });
  }
}
