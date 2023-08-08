"use client";

import React, { useEffect, useState } from "react";
import AuthContext from "../utils/authContext";
import { getCookie } from "cookies-next";

interface Prop {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Prop) {
  const [user, setUser] = useState<any | undefined>(undefined);

  useEffect(() => {
    let host = window.location.href;
    let token = getCookie("easy-next-token");
    if (!token) return;
    const getUserData = async () => {
      let res = await fetch(host + "/api/easyauth/me", {
        method: "GET",
      });
      if (!res.ok) throw Error(await res.text());
      let data = await res.json();
      setUser(data);
      return;
    };
    getUserData();
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
