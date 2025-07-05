"use client";

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

type Article = {
  id: string;
  url: string;
  title: string;
  description: string;
  source: string;
  published_at: string;
  fetched_at: string;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select()
        .order("fetched_at", { ascending: false })
        .order("published_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error(error);
        setError("記事の取得に失敗しました。");
      } else {
        console.log("fetched!");
        setArticles(data);
      }
    };

    fetchArticles();
  }, []);

  return (
    <main className="container mx-auto py-8 px-2 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">📚️トレンド記事</h1>
      {error && <p>{error}</p>}
      <ul className="divide-y divide-gray-300 w-full max-w-2xl">
        {articles.map((article) => (
          <li
            key={article.id}
            className="p-2 hover:bg-gray-100 transition delay-50"
          >
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1"
            >
              <h2 className="text-sm md:text-base font-semibold text-gray-800">
                {article.title}
              </h2>
              <p className="text-xs md:text-sm text-gray-400 line-clamp-2">
                {article.description}
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                🕒 {new Date(article.published_at).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
