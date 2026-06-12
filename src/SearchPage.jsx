import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import { copyWithToast } from "./toast";

const GPT_LINK_BASE =
  import.meta.env.VITE_GPT_URL ||
  "https://chat.openai.com/g/g-68bedab30d248191887be109dcf7aea6-wiki-analizator";

// Cap the total typing animation so very long queries don't animate for minutes
const MAX_ANIMATION_MS = 6000;
const CHAR_INTERVAL_MS = 120;

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [typed, setTyped] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!q) return;
    let i = 0;
    let timeout;
    const delay = Math.min(CHAR_INTERVAL_MS, MAX_ANIMATION_MS / q.length);
    const interval = setInterval(() => {
      setTyped(q.slice(0, i + 1));
      i++;
      if (i >= q.length) {
        clearInterval(interval);
        timeout = setTimeout(() => setFinished(true), 600);
      }
    }, delay);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [q]);

  const gptLink = `${GPT_LINK_BASE}?q=${encodeURIComponent(q || "")}`;

  const copyPageLink = () => {
    copyWithToast(window.location.href, "Посилання скопійовано!");
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
