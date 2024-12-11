import React, { useState } from "react";
import "./UrlShortener.css";
const backendUrl = "https://trim-me.vercel.app/";

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(originalUrl)) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }),
      });
      const data = await response.json();
      setShortenedUrl(`${backendUrl}/${data.shortUrl}`);
    } catch (error) {
      console.error(error);
      setError("Error al acortar la URL");
    }
  };

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };


  return (
    <div className="url-body">
      <div className="container">
        <header>
          <h1>Recortador.link</h1>
          <p>¡Acorte sus URL largas en un instante!</p>
        </header>
        <main>
          <form onSubmit={handleSubmit} className="url-form">
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Ingresa tu URL aqui"
            />
            <button type="submit">Recortar</button>
          </form>
          {error && <p className="error">{error}</p>}
          <div>
            <p>URL recortada:</p>
            <div className="shortened-url">
              <input type="text" value={shortenedUrl || ""} readOnly />
              <button onClick={handleCopy}>Copiar</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UrlShortener;