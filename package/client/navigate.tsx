"use client";

import { useRouter } from "next/navigation";

export default function Navigate() {
  const navigate = useRouter();
  return navigate;
}
