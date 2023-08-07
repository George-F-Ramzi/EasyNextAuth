import GithubServer from "@/package/providers/github/githubServer";
import { NextResponse } from "next/server";

export async function POST() {
  console.log(
    await GithubServer({
      client_id: "18bab4811010faa93ed8",
      client_secret: "7b4c691a6d43e648b5a63093bc23b983e37a95fc",
    })
  );
  return NextResponse.json({ token: "George", date: "10h" });
}
