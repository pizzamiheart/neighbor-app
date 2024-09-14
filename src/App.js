import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import MessagePage from './components/MessagePage';
import CallPage from './components/CallPage';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="/call" element={<CallPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;