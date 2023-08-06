import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ token: "George", date: "10h" });
}
