import React, { useState } from "react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

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
      setModalContent(
        <div>
          <h2 className="text-2xl font-bold mb-4">URL Statistics</h2>
          <p>
            <strong>Original URL:</strong> {data.url}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(data.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(data.updatedAt).toLocaleString()}
          </p>
          <p>
            <strong>Access Count:</strong> {data.accessCount}
          </p>
        </div>
      );
      setIsModalOpen(true);
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
      setModalContent(<p>URL updated successfully!</p>);
      setIsModalOpen(true);
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
      setModalContent(<p>URL deleted successfully!</p>);
      setIsModalOpen(true);
      setShortUrl("");
      setStats(null);
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
              className="text-xl underline break-all p-1 rounded"
            >
              http://localhost:5000/api/shorten/{shortUrl}
            </a>
          
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-6 relative z-10">
            <button
              onClick={handleViewStats}
              className="px-8 py-3 bg-black border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black hover:shadow-neon-green-glow transform hover:scale-105 transition-all duration-300 uppercase tracking-wider"
            >
              VIEW STATS
            </button>
            <button
              onClick={handleUpdate}
              className="px-8 py-3 bg-black border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black hover:shadow-neon-green-glow transform hover:scale-105 transition-all duration-300 uppercase tracking-wider"
            >
              UPDATE URL
            </button>
            <button
              onClick={handleDelete}
              className="px-8 py-3 bg-black border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black hover:shadow-neon-green-glow transform hover:scale-105 transition-all duration-300 uppercase tracking-wider"
            >
              DELETE URL
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-black p-8 rounded-lg border-2 border-white relative w-full max-w-md">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-red-500"
            >
              &times;
            </button>
            <div>{modalContent}</div>
          </div>
        </div>
      )}

      <footer className="mt-16 text-center text-white text-opacity-70 text-sm uppercase tracking-wider">
        <p className="mt-2 text-lg">
          <span className="text-green-500">INNOVAXEL</span>
        </p>
      </footer>
    </div>
  );
}

export default App;