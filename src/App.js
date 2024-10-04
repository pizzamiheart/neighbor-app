import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import MessagePage from './components/MessagePage';
import CallPage from './components/CallPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/call" element={<CallPage />} />
      </Routes>
    </Router>
  );
}

export default App;