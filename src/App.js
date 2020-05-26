import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import About from "./about";
import Users from "./User/users";
import Home from "./home";
import Header from "./Header/header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/about" render={(props) => <About {...props} />} />
          <Route path="/users/:id" render={(props) => <Users {...props} />} />
          <Route path="/users" render={(props) => <Users {...props} />} />
          <Route path="/" render={(props) => <Home {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
