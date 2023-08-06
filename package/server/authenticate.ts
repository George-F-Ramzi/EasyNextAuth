import { SignJWT } from "jose";
import { nanoid } from "nanoid";

export default async function Authenticate(
  payload: { [value: string]: any },
  date: string
) {
  if (!process.env.AUTH_SECRET) {
    return Error("No Auth Secret Env Variable");
  }

  try {
    let token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime(date)
      .sign(new TextEncoder().encode(process.env.AUTH_SECRET));

    return { token, date };
  } catch (error) {
    return error;
  }
}
