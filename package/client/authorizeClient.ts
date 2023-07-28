import { setCookie } from "cookies-next";

export default async function authorizeClient(
  api: string,
  redirect: string,
  formData: FormData
) {
  let res = await fetch(api, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) return Error(await res.text());
  let token = await res.text();
  const date = new Date();
  date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000);
  date.toUTCString();
  setCookie("token", token, { expires: date });
  window.location.replace(redirect);
  return;
}
