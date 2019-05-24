import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './sass/app.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import TransactionsInfo from './components/Transactions/TransactionsInfo';
import BlockInfo from './components/Blocks/BlockInfo';
import Blocks from './components/Blocks/Blocks';
import Transactions from './components/Transactions/Transactions';
import Assets from './components/Assets/Assets';
import NotFound from './components/NotFound/NotFound';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path={`/tx/:hashId` } component={TransactionsInfo} />;
            <Route exact path={`/block/:blockId` } component={BlockInfo} />;
            <Route exact path={`/blocks` } component={Blocks} />;
            <Route exact path={`/txs` } component={Transactions} />;
            <Route exact path={`/assets`} component={Assets} />;
            <Route component = {NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
