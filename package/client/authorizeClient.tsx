import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function AuthorizeClient(
  api: string,
  redirect: string,
  formData: FormData
) {
  const navigate = useRouter();

  const stringify = (date: string) => {
    let match = date.match(/(\d+)/);
    return Number(match![0]);
  };

  //
  return async () => {
    let res = await fetch(api, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) return Error(await res.text());
    let data = await res.json();

    const date = new Date();
    date.setTime(date.getTime() + stringify(data.date) * 24 * 60 * 60 * 1000);
    date.toUTCString();

    setCookie("easy-next-token", data.token, { expires: date });
    navigate.replace(redirect);

    return;
  };
}
