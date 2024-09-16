import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import MessagePage from './components/MessagePage';
import CallPage from './components/CallPage';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/message" component={MessagePage} />
          <Route path="/call" component={CallPage} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;