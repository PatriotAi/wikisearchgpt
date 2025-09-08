import React, { useEffect, useState } from "react";
import Loader from "./Loader";

export default function SearchPage() {
  const [typed, setTyped] = useState("");
  const [finished, setFinished] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");

  useEffect(() => {
    if (q) {
      let i = 0;
      const interval = setInterval(() => {
        setTyped(q.slice(0, i + 1));
        i++;
        if (i >= q.length) {
          clearInterval(interval);
          setFinished(true);
        }
      }, 120);
    }
  }, [q]);

  const gptLink = `https://chat.openai.com/g/g-68bedab30d248191887be109dcf7aea6-wiki-analizator?q=${encodeURIComponent(
    q || ""
  )}`;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-200 to-blue-300 p-6">
      <div className="border px-4 py-2 rounded-xl shadow w-96 bg-white">
        <input className="w-full outline-none" value={typed} readOnly />
      </div>

      {!finished && <Loader />}

      {finished && q && (
        <div className="mt-6 flex flex-col gap-3 items-center">
          <a
            href={gptLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow text-center hover:bg-blue-700"
          >
            Відкрити в Wiki-Аналізаторі
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="bg-gray-200 px-6 py-2 rounded-xl shadow"
          >
            Скопіювати посилання
          </button>
          <p className="text-gray-600 mt-4 italic">
            Бачиш, не так вже й складно 😉
          </p>
        </div>
      )}
    </div>
  );
}
