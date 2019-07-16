import React, { Component } from "react";
import { connect } from "react-redux";
import "font-awesome/css/font-awesome.min.css";
import "./sass/app.scss";
import "./sass/_responsive.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import TransactionsInfo from "./components/Transactions/TransactionsInfo";
import BlockInfo from "./components/Blocks/BlockInfo";
import Blocks from "./components/Blocks/Blocks";
import Transactions from "./components/Transactions/Transactions";
import NotFound from "./components/NotFound/NotFound";
import Contract from "./components/Contract/Contract";
import ListContracts from "./components/Contract/ListContracts";
import Address from "./components/Address/Address";
import GlobaLoading from "./components/elements/GlobaLoading";
class App extends Component {
  render() {
    const { isLoading } = this.props;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path={`/tx/:hashId`} component={TransactionsInfo} />;
            <Route exact path={`/block/:blockId`} component={BlockInfo} />;
            <Route exact path={`/blocks`} component={Blocks} />;
            <Route exact path={`/txs`} component={Transactions} />;
            <Route exact path={"/contract/:address"} component={Contract} />;
            <Route exact path={`/contracts`} component={ListContracts} />
            <Route exact path={"/address/:address"} component={Address} />
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
    isLoading: state.globalData.isLoading
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
