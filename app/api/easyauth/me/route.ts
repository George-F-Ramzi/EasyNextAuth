import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ name: "George", date: "10h" });
}
