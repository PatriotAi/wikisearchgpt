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
          setTimeout(() => setFinished(true), 600);
        }
      }, 120);
    }
  }, [q]);

  const gptLink = `https://chat.openai.com/g/g-68bedab30d248191887be109dcf7aea6-wiki-analizator?q=${encodeURIComponent(
    q || ""
  )}`;

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    const toast = document.createElement("div");
    toast.innerText = "Посилання скопійовано!";
    toast.className = "toast";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  return (
    <div className="search-page">
      <div className="query-box">
        <input className="query-input" value={typed} readOnly />
      </div>

      {!finished && <Loader />}

      {finished && q && (
        <div className="result-box">
          <a
            href={gptLink}
            target="_blank"
            rel="noopener noreferrer"
            className="open-btn"
          >
            Відкрити в Wiki-Аналізаторі
          </a>
          <button className="copy-btn" onClick={copyPageLink}>
            Скопіювати посилання
          </button>
          <p className="final-text">Бачиш, не так вже й складно 😉</p>
        </div>
      )}
    </div>
  );
}
