import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function AuthorizeClient(
  api: string,
  redirect: string,
  formData: FormData
) {
  const navigate = useRouter();

  //
  return async () => {
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
    navigate.replace(redirect);
    return;
  };
}
