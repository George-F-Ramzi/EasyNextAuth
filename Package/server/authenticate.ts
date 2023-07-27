import { SignJWT } from "jose";
import { nanoid } from "nanoid";

export default async function Authenticate(payload: { [value: string]: any }) {
  try {
    let token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("10d")
      .sign(new TextEncoder().encode(process.env.AUTH_SECRET!));

    return token;
  } catch (error) {
    return error as Error;
  }
}
