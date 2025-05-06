import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import SnippetForm from './components/SnippetForm';
import SnippetList from './components/SnippetList';
import Header from './components/Header';
import ErrorAlert from './components/ErrorAlert';
import SearchBar from './components/SearchBar';


const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

function App() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const fetchSnippets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await api.get('/test');
      
      const response = await api.get('/snippets');
      setSnippets(response.data);
    } catch (err) {
      console.error('Error fetching snippets:', err);
      setError('Failed to fetch snippets. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };
  
  const createSnippet = async (snippetData) => {
    try {
      setError(null);
      const response = await api.post('/snippets', snippetData);
      setSnippets([response.data, ...snippets]);
      return true;
    } catch (err) {
      console.error('Error creating snippet:', err);
      setError('Failed to create snippet. Please try again.');
      return false;
    }
  };
  
  const deleteSnippet = async (id) => {
    try {
      setError(null);
      await api.delete(`/snippets/${id}`);
      setSnippets(snippets.filter(snippet => snippet._id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting snippet:', err);
      setError('Failed to delete snippet. Please try again.');
      return false;
    }
  };
  
  const searchSnippets = async (query) => {
    if (!query.trim()) {
      fetchSnippets();
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/snippets/search/${query}`);
      setSnippets(response.data);
    } catch (err) {
      console.error('Error searching snippets:', err);
      setError('Failed to search snippets. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      fetchSnippets();
    }
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchSnippets(searchQuery);
  };
  
  useEffect(() => {
    fetchSnippets();
  }, []);
  
  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
        
        <div className="top-controls">
          <SearchBar 
            value={searchQuery} 
            onChange={handleSearchChange} 
            onSubmit={handleSearchSubmit} 
          />
          <button onClick={fetchSnippets} className="refresh-button">
            Refresh
          </button>
        </div>
        
        <div className="content-grid">
          <section className="form-section">
            <h2>Add New Snippet</h2>
            <SnippetForm onSubmit={createSnippet} />
          </section>
          
          <section className="list-section">
            <h2>Snippets</h2>
            {loading ? (
              <div className="loading">Loading snippets...</div>
            ) : (
              <SnippetList 
                snippets={snippets} 
                onDelete={deleteSnippet} 
              />
            )}
          </section>
        </div>
      </main>
      
      <footer className="footer">
        <p>Code Snippet Sharing &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;