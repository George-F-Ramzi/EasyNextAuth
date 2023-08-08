import setToken from "./setToken";

export default async function AuthorizeClient(
  route: string,
  formData: FormData
) {
  let host = window.location.href;

  let res = await fetch(host + "/api/easyauth/" + route, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) return Error(await res.text());
  let data = await res.json();

  setToken({ date: data.date, token: data.token });
  window.location.replace("/");
  return;
}
