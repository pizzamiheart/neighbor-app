import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to Neighbor!</h1>
      <h3>What if you could call one person who is always avaialbe and knows everything there is to know about your technology?</h3>
      <h3>well, that person doesn't exist but you can call your personal tech assisant Neighbor! An AI who's already around and ready to help!</h3>
      <h2>When your printer won't print, or you can't connect to your WiFi, it's hard to know who to call.</h2>
      <h2>Neighbor eliminates that problem by being a message or a call away</h2>
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