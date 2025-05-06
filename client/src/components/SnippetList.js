import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SnippetList() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await axios.get('/api/snippets');
        setSnippets(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch snippets');
        setLoading(false);
        console.error(err);
      }
    };

    fetchSnippets();
  }, []);

  if (loading) return <div className="loading">Loading snippets...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="snippet-list">
      <h2>Recent Code Snippets</h2>
      
      {snippets.length === 0 ? (
        <p>No snippets found. Be the first to share a code snippet!</p>
      ) : (
        <div className="snippets-grid">
          {snippets.map(snippet => (
            <div key={snippet._id} className="snippet-card">
              <h3>{snippet.title}</h3>
              <div className="snippet-meta">
                <span className="language">{snippet.language}</span>
                <span className="date">{new Date(snippet.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="snippet-preview">{snippet.code.substring(0, 100)}...</p>
              <Link to={`/snippet/${snippet._id}`} className="view-btn">View Snippet</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SnippetList;