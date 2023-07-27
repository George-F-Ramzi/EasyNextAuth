"use client";

import GetUser from "@/Package/client/GetUser";

export default function Home() {
  let data = GetUser();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {!data ? "no data" : "Hell WOrld"}
    </main>
  );
}
