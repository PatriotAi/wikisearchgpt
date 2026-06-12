import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [link, setLink] = useState("");

  const generateLink = () => {
    if (!query.trim()) return;
    const encoded = encodeURIComponent(query);
    const url = `${window.location.origin}/search?q=${encoded}`;
    setLink(url);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") generateLink();
  };

  const copyLink = () => {
    if (!link) return;
    navigator.clipboard.writeText(link).catch(() => {});
    const toast = document.createElement("div");
    toast.innerText = "Посилання скопійовано!";
    toast.className = "toast";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  return (
    <div className="main-page">
      <h1 className="title">WikiSearchGPT</h1>
      <p className="subtitle">Замість того, щоб питати — спробуй сам 😉</p>

      <div className="input-box">
        <label htmlFor="search-input" className="sr-only">Пошуковий запит</label>
        <input
          id="search-input"
          className="search-input"
          placeholder="Введіть запит..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-btn" onClick={generateLink}>
          Створити посилання
        </button>
      </div>

      {link && (
        <div className="link-box">
          <p>Ваше посилання:</p>
          <a href={link} className="link" target="_blank" rel="noopener noreferrer">
            {link}
          </a>
          <div className="btn-group">
            <button className="copy-btn" onClick={copyLink}>
              Скопіювати
            </button>
            <a href={link} target="_blank" rel="noopener noreferrer" className="preview-btn">
              Попередній перегляд
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
