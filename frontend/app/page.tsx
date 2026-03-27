"use client";

import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    // Replace baseURL with your Laravel API if needed
    const api = axios.create({
      baseURL: "http://localhost:8000/api",
      withCredentials: true,
    });

    api
      .get("/test")
      .then((res) => console.log("API response:", res.data))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">

      <h1 className="text-2xl font-bold">Date Knight</h1>

    </main>
  );
}
