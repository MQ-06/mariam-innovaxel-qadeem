import React, { useState } from "react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: longUrl }),
      });
      if (!response.ok) {
        throw new Error("Failed to create short URL");
      }
      const data = await response.json();
      setShortUrl(data.shortCode);
      setStats(null);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewStats = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/stats/${shortUrl}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch statistics");
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      alert(error.message);
    }
  };
  
  const handleUpdate = async () => {
    const newUrl = prompt("Enter the new long URL:");
    if (!newUrl) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/shorten/${shortUrl}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: newUrl }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update URL");
      }
      const data = await response.json();
      setLongUrl(newUrl);
      alert("URL updated successfully!");
    } catch (error) {
      alert(error.message);
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/shorten/${shortUrl}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete URL");
      }
      setShortUrl("");
      setStats(null);
      alert("URL deleted successfully!");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-mono">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4 text-white animate-pulse">
          <span className="text-shadow-neon">URL</span>{" "}
          <span className="text-shadow-neon">SHORTENER</span>
        </h1>
        <p className="text-green-500 opacity-80 tracking-wider">
          CREATE • SHORTEN • TRACK
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-6 w-full max-w-lg"
      >
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="ENTER LONG URL..."
          className="p-4 w-full border-2 border-white bg-black text-white placeholder-white placeholder-opacity-50 rounded-lg tracking-wider"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-8 py-3 bg-black border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wider ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "GENERATING..." : "GENERATE SHORT URL"}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-12 w-full max-w-2xl space-y-6 bg-black p-8 rounded-lg border-2 border-white relative overflow-hidden">
          <h2 className="text-2xl font-bold mb-4 text-center uppercase tracking-wider relative z-10">
            YOUR SHORT URL
          </h2>
          <div className="flex items-center justify-center space-x-4 relative z-10">
            <a
              href={`http://localhost:5000/api/shorten/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl underline hover:text-black hover:bg-white transition-all duration-200 break-all p-1 rounded"
            >
              http://localhost:5000/api/shorten/{shortUrl}
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://localhost:5000/api/shorten/${shortUrl}`
                );
                alert("Copied to clipboard!");
              }}
              className="p-2 hover:bg-white hover:text-black rounded transition-all duration-200"
              title="COPY TO CLIPBOARD"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-6 relative z-10">
            <button
              onClick={handleViewStats}
              className="px-8 py-3 bg-black border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black hover:shadow-neon-green-glow transform hover:scale-105 transition-all duration-300 uppercase tracking-wider flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              VIEW STATS
            </button>
            <button
              onClick={handleUpdate}
              className="px-8 py-3 bg-black border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black hover:shadow-neon-green-glow transform hover:scale-105 transition-all duration-300 uppercase tracking-wider flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              UPDATE URL
            </button>
            <button
              onClick={handleDelete}
              className="px-8 py-3 bg-black border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black hover:shadow-neon-green-glow transform hover:scale-105 transition-all duration-300 uppercase tracking-wider flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              DELETE URL
            </button>
          </div>
        </div>
      )}

      {/* Display Statistics */}
      {stats && (
        <div className="mt-10 w-full max-w-2xl bg-black p-8 rounded-lg border-2 border-white relative overflow-hidden">
          <h2 className="text-3xl font-bold mb-6 text-center uppercase tracking-wider relative z-10">
            <span className="text-shadow-neon">URL STATISTICS</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* Basic Information */}
            <div className="bg-black p-6 rounded-lg border-2 border-neon-green">
              <h3 className="text-xl font-semibold mb-4 uppercase tracking-wider flex items-center">
                <span className="h-3 w-3 bg-white rounded-full mr-2"></span>
                BASIC INFORMATION
              </h3>
              <div className="space-y-3 font-mono">
                <p className="flex justify-between border-b border-white border-opacity-30 pb-2">
                  <span className="text-white text-opacity-80">
                    ORIGINAL URL:
                  </span>
                  <span className="text-right break-all">{stats.url}</span>
                </p>
                <p className="flex justify-between border-b border-white border-opacity-30 pb-2">
                  <span className="text-white text-opacity-80">CREATED:</span>
                  <span>{new Date(stats.createdAt).toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-white text-opacity-80">
                    LAST UPDATED:
                  </span>
                  <span>{new Date(stats.updatedAt).toLocaleString()}</span>
                </p>
              </div>
            </div>
            {/* Access Count */}
            <div className="bg-black p-6 rounded-lg border-2 border-white flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mb-4 uppercase tracking-wider flex items-center">
                <span className="h-3 w-3 bg-white rounded-full mr-2"></span>
                ACCESS COUNT
              </h3>
              <div className="text-6xl font-bold animate-pulse my-4">
                {stats.accessCount}
              </div>
              <p className="text-white text-opacity-80 uppercase tracking-wider">
                TOTAL CLICKS
              </p>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-16 text-center text-white text-opacity-70 text-sm uppercase tracking-wider">
        <p className="mt-2 text-xs">
            <span className="text-green-500">INNOVAXEL</span>
        </p>
      </footer>
    </div>
  );
}

export default App;