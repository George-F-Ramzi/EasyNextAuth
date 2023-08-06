"use client";

import AuthorizeClient from "@/package/client/authorizeClient";
import GithubClient from "@/package/providers/github/githubClient";

export default function Home() {
  return (
    <main className='p-24 h-screen w-full flex items-center justify-center'>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let form = new FormData(e.currentTarget);
          await AuthorizeClient(
            "http://localhost:3000/api",
            "http://localhost:3000/",
            form
          );
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
        <button
          onClick={() => {
            GithubClient("", "18bab4811010faa93ed8");
          }}
          className='border border-black'
        >
          Github
        </button>
      </form>
    </main>
  );
}
