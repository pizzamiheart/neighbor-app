import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import MessagePage from './components/MessagePage';
import CallPage from './components/CallPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/call" element={<CallPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;