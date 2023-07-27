"use client";

import { createContext } from "react";
import { IAuthContext } from "./types";

let AuthContext = createContext<IAuthContext>({});

export default AuthContext;
