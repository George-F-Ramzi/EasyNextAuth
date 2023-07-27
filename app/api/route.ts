import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let form = await req.formData();
  return NextResponse.json({ token: "hello", user: "George" });
}
