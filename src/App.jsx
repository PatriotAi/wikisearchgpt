import { useState } from "react";
import { copyWithToast } from "./toast";

export default function App() {
  const [query, setQuery] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const encoded = encodeURIComponent(query);
    setLink(`${window.location.origin}/search?q=${encoded}`);
  };

  const copyLink = () => {
    if (!link) return;
    copyWithToast(link, "Посилання скопійовано!");
  };

  return (
    <div className="main-page">
      <h1 className="title">WikiSearchGPT</h1>
      <p className="subtitle">Замість того, щоб питати — спробуй сам 😉</p>

      <form className="input-box" onSubmit={handleSubmit}>
        <label htmlFor="search-input" className="sr-only">Пошуковий запит</label>
        <input
          id="search-input"
          className="search-input"
          placeholder="Введіть запит..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-btn" disabled={!query.trim()}>
          Створити посилання
        </button>
      </form>

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
