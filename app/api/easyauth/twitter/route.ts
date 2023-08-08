import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ token: "George", date: "10h" });
}
