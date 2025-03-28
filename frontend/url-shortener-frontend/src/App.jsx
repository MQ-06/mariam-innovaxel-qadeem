import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [stats, setStats] = useState(null);

  // Function to shorten a long URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/shorten', { url: longUrl });
      setShortUrl(response.data.shortCode);
      setStats(null); // Clear stats when a new short URL is created
    } catch (error) {
      alert('Failed to shorten URL');
    }
  };

  // Function to view statistics for a short URL
  const handleViewStats = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/stats/${shortUrl}`);
      setStats(response.data);
    } catch (error) {
      alert('Failed to fetch stats');
    }
  };

  // Function to delete a short URL
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/shorten/${shortUrl}`);
      setShortUrl('');
      setStats(null);
      alert('Short URL deleted successfully');
    } catch (error) {
      alert('Failed to delete short URL');
    }
  };

  // Function to update a short URL
  const handleUpdate = async () => {
    try {
      const newUrl = prompt('Enter the new long URL:');
      if (!newUrl) return;

      await axios.put(`http://localhost:3001/shorten/${shortUrl}`, { url: newUrl });
      alert('Short URL updated successfully');
      setLongUrl(newUrl); // Update the input field with the new long URL
    } catch (error) {
      alert('Failed to update short URL');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8 text-neon-green animate-pulse">URL Shortener</h1>

      {/* Form to shorten URL */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full max-w-md">
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          className="p-3 w-full border border-neon-green bg-black text-white placeholder-gray-500 rounded focus:outline-none focus:border-green-600 transition-colors"
          required
        />
        <button
          type="submit"
          className="px-8 py-3 bg-neon-green text-black font-bold rounded-lg shadow-neon-green-glow transition-all duration-300 hover:bg-green-600"
        >
          Generate Short URL
        </button>
      </form>

      {/* Display short URL */}
      {shortUrl && (
        <div className="mt-8 text-center w-full max-w-md space-y-4">
          <p className="text-lg">
            Shortened URL:{' '}
            <a
              href={`http://localhost:3001/shorten/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-green underline hover:text-green-600 transition-colors"
            >
              http://localhost:3001/shorten/{shortUrl}
            </a>
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleViewStats}
              className="px-6 py-3 bg-neon-green text-black font-bold rounded-lg shadow-neon-green-glow transition-all duration-300 hover:bg-green-600"
            >
              View Stats
            </button>
            <button
              onClick={handleUpdate}
              className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-blue-glow transition-all duration-300 hover:bg-blue-600"
            >
              Update URL
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-red-glow transition-all duration-300 hover:bg-red-600"
            >
              Delete URL
            </button>
          </div>
        </div>
      )}

      {/* Display stats */}
      {stats && (
        <div className="mt-8 text-center w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-neon-green">Statistics</h2>
          <p>Original URL: {stats.url}</p>
          <p>Created At: {new Date(stats.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(stats.updatedAt).toLocaleString()}</p>
          <p className="text-xl font-bold">Access Count: {stats.accessCount}</p>
        </div>
      )}
    </div>
  );
}

export default App;