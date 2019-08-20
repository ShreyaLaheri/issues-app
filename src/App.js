import React from 'react';
import './App.css';
import SignIn from './pages/SignIn/SignIn.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import Issues from './pages/Issues/Issues.jsx'
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={SignIn} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/Issues" component={Issues} />
      </div>
    </Router>
  );
}

export default App;
