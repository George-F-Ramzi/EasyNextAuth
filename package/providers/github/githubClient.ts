import { setCookie } from "cookies-next";
import setToken from "../../client/setToken";

async function GithubClient(client_id: string) {
  let host = window.location.href;
  let param = "";

  let page = window.open(
    `https://github.com/login/oauth/authorize?client_id=${client_id}`,
    "",
    "height=800,width=800"
  );

  let pageClone = {};

  let watcher = setInterval(() => {
    if (!page) return;
    Object.assign(pageClone, page);
    //@ts-ignore
    let win = pageClone.location.search;
    let qrl = new URLSearchParams(win);
    let key = qrl.get("code");
    if (key) {
      param = key;
      page.close();
      FetchToken();
      clearInterval(watcher);
    }
  }, 60);

  const FetchToken = async () => {
    setCookie("easy-github", param);
    let res = await fetch(host + "/api/easyauth/github", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return Error(await res.text());

    let data = await res.json();

    setToken({ date: data.date, token: data.token });
    window.location.replace("/");
    return;
  };

  return;
}

export default GithubClient;
