import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async () => {
    setError("");
    setShortUrl("");

    if (!url) {
      setError("Please enter a URL");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/ShortURLGenerator/backend/shorten.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `url=${encodeURIComponent(url)}`,
        }
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setShortUrl(data.short_url);
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔗 Short URL Generator</h1>
        <p style={styles.subtitle}>Paste your long URL and get a short link instantly</p>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleShorten} style={styles.button}>
          Shorten URL
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {shortUrl && (
          <div style={styles.resultBox}>
            <p style={{ marginBottom: "5px" }}>Your short link:</p>
            <a href={shortUrl} target="_blank" rel="noreferrer" style={styles.link}>
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial",
    padding: "20px", // ✅ prevents edge sticking on small screens
    boxSizing: "border-box",
  },

  card: {
    background: "white",
    padding: "35px 30px", // ✅ balanced padding (top/bottom + left/right)
    borderRadius: "16px",
    width: "100%",
    maxWidth: "420px", // ✅ responsive clean width
    textAlign: "center",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
  },

  title: {
    marginBottom: "8px", // ✅ tighter heading spacing
    color: "#333",
    fontSize: "24px",
  },

  subtitle: {
    fontSize: "13px",
    color: "#777",
    marginBottom: "22px", // ✅ consistent spacing before input
    lineHeight: "1.4",
  },

  input: {
    width: "100%",
    padding: "12px 14px", // ✅ better internal spacing
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginBottom: "16px", // ✅ clean gap to button
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#667eea",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "10px", // ✅ spacing below button
  },

  error: {
    color: "red",
    marginTop: "10px",
    fontSize: "13px",
  },

  resultBox: {
    marginTop: "18px",
    padding: "14px",
    background: "#f5f5f5",
    borderRadius: "10px",
    fontSize: "14px",
  },

  link: {
    color: "#667eea",
    fontWeight: "bold",
    wordBreak: "break-all",
    display: "inline-block",
    marginTop: "6px",
  },
};

export default App;