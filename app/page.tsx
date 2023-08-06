"use client";

import authorizeClient from "@/package/client/authorizeClient";

export default function Home() {
  return (
    <main className='p-24 h-screen w-full flex items-center justify-center'>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let form = new FormData(e.currentTarget);
          authorizeClient({ token: "sdf", date: "10m" });
        }}
        className='flex flex-col gap-4'
      >
        <input
          className='border border-black'
          placeholder='email'
          name='email'
        />
        <input
          className='border border-black'
          placeholder='password'
          name='password'
        />
        <button
          className='border border-black'
          type='submit'
        >
          Join
        </button>
      </form>
    </main>
  );
}
