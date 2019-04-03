import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './sass/app.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import TransactionsInfo from './components/Transactions/TransactionsInfo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path={`/tx/:hashId` } component={TransactionsInfo} />;
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
