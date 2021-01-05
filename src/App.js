import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./assets/css/reflex.css";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/:username" exact component={Profile} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
