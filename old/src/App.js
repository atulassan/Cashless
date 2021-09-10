import React, { } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from './pages/Login';
import Home from './pages/Home';
import Transaktionen from './pages/Transaktionen';
import Support from './pages/Support';
import Passwortandern from './pages/Passwortandern';


function App() {

  return (
      <Router>
        <Switch>
            <Route exact path="/"><Login /></Route>
            <Route exact path="/home"><Home /></Route>
            <Route exact path="/transaktionen"><Transaktionen /></Route>
            <Route exact path="/support"><Support /></Route>
            <Route exact path="/passwortandern"><Passwortandern /></Route>
       
        </Switch>
    </Router>
  );
}

export default App;
