import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "./Loader";

const GPT_LINK_BASE =
  "https://chat.openai.com/g/g-68bedab30d248191887be109dcf7aea6-wiki-analizator";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [typed, setTyped] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!q) return;
    let i = 0;
    const interval = setInterval(() => {
      setTyped(q.slice(0, i + 1));
      i++;
      if (i >= q.length) {
        clearInterval(interval);
        setTimeout(() => setFinished(true), 600);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [q]);

  const gptLink = `${GPT_LINK_BASE}?q=${encodeURIComponent(q || "")}`;

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    const toast = document.createElement("div");
    toast.innerText = "Посилання скопійовано!";
    toast.className = "toast";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  return (
    <div className="search-page">
      <div className="query-box">
        <label htmlFor="query-input" className="sr-only">Ваш запит</label>
        <input id="query-input" className="query-input" value={typed} readOnly />
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
