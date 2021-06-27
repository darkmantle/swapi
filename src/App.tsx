import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';
import View from './components/view';
import Home from './components/home';

import logo from "./logo.png";

function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid d-flex justify-content-center">
                    <img src={logo} alt="logo" data-testid="logo" />
                </div>
            </nav>
            <Switch>
                <Route path="/view/:id">
                    <View />
                </Route>

                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
