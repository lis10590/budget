import User from "@/app/_utils/schemas/User";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function POST(req) {
  await connectDB();
  const response = await req.json();
  const { email, password } = response;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return NextResponse.json(user, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Wrong email or password!" },
      { status: 400 }
    );
  }
}
