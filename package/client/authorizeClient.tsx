import setToken from "./setToken";
import navigate from "./navigate";

export default async function AuthorizeClient(
  api: string,
  redirect: string,
  formData: FormData
) {
  let res = await fetch(api, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) return Error(await res.text());
  let data = await res.json();

  setToken({ date: data.date, token: data.token });
  navigate().replace(redirect);
  return;
}
