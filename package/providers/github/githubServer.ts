import { cookies } from "next/headers";

interface Args {
  client_id: string;
  client_secret: string;
}

interface GitHubToken {
  access_token: string;
  token_type: string;
  scope: string;
}

export default async function GithubServer({ client_id, client_secret }: Args) {
  let cookie = cookies();
  let code = cookie.get("easy-github");
  let params =
    "?client_id=" +
    client_id +
    "&client_secret=" +
    client_secret +
    "&code=" +
    code?.value;

  let res = await fetch(
    "https://github.com/login/oauth/access_token" + params,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );

  let token: GitHubToken = await res.json();

  let userRes = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      authorization: "Bearer " + token.access_token,
    },
  });

  let userData = await userRes.json();

  return userData;
}
