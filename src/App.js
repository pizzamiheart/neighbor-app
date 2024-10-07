import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import MessagePage from './components/MessagePage';
import CallPage from './components/CallPage';
import AuthPage from './components/AuthPage';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout user={user}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/message" element={<MessagePage user={user} />} />
            <Route path="/call" element={<CallPage user={user} />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;