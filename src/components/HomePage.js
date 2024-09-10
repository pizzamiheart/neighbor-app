import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to Neighbor!</h1>
      <h3>Your personal tech assistant</h3>
      <div className="button-container">
        <Link to="/message" className="button">
          Message Neighbor
        </Link>
        <Link to="/call" className="button">
          Call Neighbor
        </Link>
      </div>
    </div>
  );
}

export default HomePage;