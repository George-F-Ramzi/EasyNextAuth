import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export default async function GetPayload() {
  try {
    let cookie = cookies();
    let token = cookie.get("token");
    let { payload } = await jwtVerify(
      token?.value!,
      new TextEncoder().encode(process.env.AUTH_SECRET!)
    );
    return payload;
  } catch (error) {
    return Error("Invalid Token");
  }
}
