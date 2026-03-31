"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";

interface DateItem {
  id: number;
  title: string;
  description: string;
  is_public: boolean;
  user: {
    id: number,
    name: string
  };
}

export default function HomePage() {
  const [dates, setDates] = useState<DateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDates() {
      try {
        const res = await api.get<DateItem[]>("/api/dates", {
          withCredentials: true,
        });
        console.log(res.data);
        setDates(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDates();
  }, []);
  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Dates</h1>
      {dates.length > 0 && (
        <section className="max-w-3xl mx-auto">
          <ul>
            {dates.map((date) => (
              <li key={date.id} className="mb-2 border border-1 border-sky-300 p-2 rounded-xl">
                <span >Created by: {date.user.name}</span>
                <hr />
                <strong>{date.title}</strong>: {date.description}{" "}
                {date.is_public ? "(Public)" : "(Private)"}
              </li>
            ))}
          </ul>
        </section>
      )}

    </div>
  );
}
