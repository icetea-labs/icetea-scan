import React, { Component } from 'react';
import SearchBox from '../Layout/SearchBox/SearchBox';
import BlocksBox from './elements/BlocksBox';
import TransactionsBox from './elements/TransactionsBox';
import ChainInfo from './elements/ChainInfo';

import { getListBlockApi, getListTxApi } from '../../service//api/get-list-data';
import { getAllContracts } from '../../service/blockchain/get-single-data';

let interval = null;

function Banner() {
  return (
    <div className="banner-container">
      <h3>ICETEA CHAIN EXPLORER (TESTNET)</h3>
      <div className="searh-box">
        <SearchBox />
      </div>
    </div>
  );
}
class Home extends Component {
  componentDidMount() {
    interval = setInterval(() => {
      getListBlockApi({ page_size: 10 });
      getListTxApi({ page_size: 10 });
      getAllContracts();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  render() {
    // const { blocksInfo, transactionsInfo, totalContract } = this.props;
    return (
      <React.Fragment>
        <Banner />
        <div className="blocks_transactions_view">
          <div className="container">
            <div className="chain-value">
              <ChainInfo />
            </div>
            <div className="flex">
              <BlocksBox />
              <TransactionsBox />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
