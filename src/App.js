import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './sass/app.scss';
import 'bootstrap/dist/css/bootstrap.css';
import './sass/_responsive.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import TransactionsInfo from './components/TransactionInfo/TransactionInfo';
import BlockInfo from './components/BlockInfo/BlockInfo';
import Blocks from './components/Blocks/Blocks';
import Transactions from './components/Transactions/Transactions';
import NotFound from './components/NotFound/NotFound';
import Contract from './components/Contract/Contract';
import AllContract from './components/Contract/AllContract';
import Address from './components/Address/Address';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path={`/tx/:hashId`} component={TransactionsInfo} />;
            <Route exact path={`/block/:blockId`} component={BlockInfo} />;
            <Route exact path={`/blocks`} component={Blocks} />;
            <Route exact path={`/txs`} component={Transactions} />;
            <Route exact path={'/contract/:address'} component={Contract} />;
            <Route exact path={`/contracts`} component={AllContract} />
            <Route exact path={'/address/:address'} component={Address} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
