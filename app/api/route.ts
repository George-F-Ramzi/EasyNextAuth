import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({ token: "SDfsdf", date: "2h" });
}
