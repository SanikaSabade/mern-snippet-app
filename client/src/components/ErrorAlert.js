import React from 'react';

const ErrorAlert = ({ message, onClose }) => (
  <div className="error-alert">
    <p>{message}</p>
    <button onClick={onClose}>Dismiss</button>
  </div>
);

export default ErrorAlert;
