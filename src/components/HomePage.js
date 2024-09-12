import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/message">Chat with AI</Link></li>
            <li><Link to="/call">Speak Live</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <h1 className="welcome-heading">Welcome to Neighbor!</h1>
        <div className="button-container">
          <Link to="/message" className="button">
            Message Neighbor
          </Link>
          <Link to="/call" className="button">
            Call Neighbor
          </Link>
        </div>
        <div className="statements-container">
          <div className="statement">
            <p>What if you could call one person who is always available and knows everything there is to know about your technology?</p>
          </div>
          <div className="statement">
            <p>Well, no person can do that but you can call your personal tech assistant, Neighbor! An AI who's always around and ready to help!</p>
          </div>
        </div>
        <div className="info-container">
          <div className="info">
            <p>Printer won't print? Can't connect to your WiFi? Locked out of an account? It's hard to know who to call to fix it quickly!</p>
          </div>
          <div className="info">
            <p>Neighbor eliminates that problem by being a message or a call away!</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;