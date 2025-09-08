import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [link, setLink] = useState("");

  const generateLink = () => {
    const encoded = encodeURIComponent(query);
    const url = `${window.location.origin}/search?q=${encoded}`;
    setLink(url);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">WikiSearchGPT</h1>
      <input
        className="border rounded-xl px-4 py-2 w-96 shadow"
        placeholder="Введіть запит..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow"
        onClick={generateLink}
      >
        Створити посилання
      </button>

      {link && (
        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="mb-2">Ваше посилання:</p>
          <a href={link} className="text-blue-600 underline">
            {link}
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(link);
              alert("Посилання скопійовано!");
            }}
            className="bg-gray-200 px-4 py-2 rounded-xl shadow"
          >
            Скопіювати
          </button>
        </div>
      )}
    </div>
  );
}
