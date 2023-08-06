"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Prop {
  api: string;
  redirect: string;
  client_id: "string";
}

function GithubClient({ api, client_id, redirect }: Prop) {
  const navigate = useRouter();

  useEffect(() => {}, []);

  return async () => {
    navigate.push(
      `https://github.com/login/oauth/authorize?client_id=${client_id}`
    );
    return;
  };
}

export default GithubClient;
