import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <circle id="loader-circle" cx="40" cy="40" r="32"></circle>
        </svg>
        <div className="loader-text">Loading</div>
      </div>
    </div>
  );
};

export default Loader;
