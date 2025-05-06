import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="site-title">
          <span className="code-icon">{'</>'}</span> Code Snippet Sharing
        </h1>
        <p className="site-tagline">Store, share, and discover code snippets easily</p>
      </div>
    </header>
  );
}

export default Header;