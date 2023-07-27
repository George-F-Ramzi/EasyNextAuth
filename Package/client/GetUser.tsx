"use client";

import { useContext } from "react";
import AuthContext from "../utils/authContext";

export default function GetUser() {
  const { user } = useContext(AuthContext);

  if (user === undefined) return undefined;

  return user;
}
