"use client";

import authorizeClient from "@/package/client/authorizeClient";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const test = async () => {
      let form = new FormData();
      await authorizeClient("http://localhost:3000/api/", "/home", form);
    };
    test();
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'></main>
  );
}
