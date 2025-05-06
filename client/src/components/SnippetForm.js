import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SnippetForm() {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const languageOptions = [
    'javascript', 'python', 'java', 'c', 'cpp', 'csharp', 'go',
    'ruby', 'php', 'swift', 'kotlin', 'rust', 'typescript', 'html', 'css', 'sql'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !code) {
      setError('Title and code are required');
      return;
    }

    try {
      const response = await axios.post('/api/snippets', {
        title,
        language,
        code,
        description
      });
      
      navigate(`/snippet/${response.data._id}`);
    } catch (err) {
      setError('Failed to save snippet. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="snippet-form-container">
      <h2>Create New Snippet</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languageOptions.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="code">Code</label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here"
            rows={15}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some notes about your code snippet"
            rows={4}
          />
        </div>

        <button type="submit" className="submit-btn">Save Snippet</button>
      </form>
    </div>
  );
}

export default SnippetForm;