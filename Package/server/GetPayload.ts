import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export default async function GetPayload() {
  let cookie = cookies();
  let token = cookie.get("token");
  let { payload } = await jwtVerify(
    token?.value!,
    new TextEncoder().encode(process.env.AUTHSECRET!)
  );
  return payload;
}
