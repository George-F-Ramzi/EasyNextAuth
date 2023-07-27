"use client";

import React, { useEffect, useState } from "react";
import AuthContext from "../utils/authContext";
import { getCookie } from "cookies-next";

interface Prop {
  children: React.ReactNode;
  userData: string;
}

export default function AuthProvider({ children, userData }: Prop) {
  const [user, setUser] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (userData === undefined) return;
    let token = getCookie("token");
    if (!token) return;
    const getUserData = async () => {
      let res = await fetch(userData, { method: "GET" });
      if (!res.ok) throw Error(await res.text());
      let data = await res.json();
      setUser(data);
      return;
    };
    getUserData();
  }, [userData, setUser]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
