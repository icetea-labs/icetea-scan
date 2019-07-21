import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
import 'antd/dist/antd.css';
import './sass/reset.css';
import './sass/app.scss';
// import './sass/_responsive.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomeContainer, Layout } from './components/Layout/Layout';
import Home from './components/Home/Home';
import TransactionsInfo from './components/Transactions/TransactionsInfo';
import BlockInfo from './components/Blocks/BlockInfo';
import Blocks from './components/Blocks/Blocks';
import Transactions from './components/Transactions/Transactions';
import { NotFound, Exception } from './components/NotFound/NotFound';
import ContractInfo from './components/Contract/ContractInfo';
import ListContracts from './components/Contract/ListContracts';
import Address from './components/Address/Address';
import GlobaLoading from './components/elements/GlobaLoading';

function RouteWithLayout({ layout, component, ...rest }) {
  return (
    <Route {...rest} render={props => React.createElement(layout, props, React.createElement(component, props))} />
  );
}
class App extends Component {
  render() {
    const { isLoading } = this.props;
    return (
      <div className="App">
        <Router>
          <Switch>
            <RouteWithLayout layout={HomeContainer} exact path="/" component={Home} />
            <RouteWithLayout layout={Layout} exact path={`/tx/:hashId`} component={TransactionsInfo} />;
            <RouteWithLayout layout={Layout} exact path={`/block/:blockId`} component={BlockInfo} />;
            <RouteWithLayout layout={Layout} exact path={`/blocks`} component={Blocks} />;
            <RouteWithLayout layout={Layout} exact path={`/txs`} component={Transactions} />;
            <RouteWithLayout layout={Layout} exact path={'/contract/:address'} component={ContractInfo} />;
            <RouteWithLayout layout={Layout} exact path={`/contracts`} component={ListContracts} />
            <RouteWithLayout exact path={'/address/:address'} component={Address} />
            <RouteWithLayout layout={Layout} exact path={`/exception`} component={Exception} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        {isLoading && <GlobaLoading />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.globalData.isLoading,
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
