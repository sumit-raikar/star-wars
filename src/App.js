import React, { Component } from 'react';
import Login from './login/login';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Dashboard from './dashboard/dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
