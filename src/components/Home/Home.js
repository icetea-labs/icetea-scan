import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../Layout/Layout";
import Banner from "./elements/Banner";
import BlocksBox from "./elements/BlocksBox";
import TransactionsBox from "./elements/TransactionsBox";
import ChainInfo from "./elements/ChainInfo";

import {
  getListBlockApi,
  getListTxApi
} from "../../service//api/get-list-data";
// import { getAllContracts } from "../../../service/blockchain/get-single-data";

let interval = null;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: true
    };
  }

  componentDidMount() {
    interval = setInterval(() => {
      getListBlockApi({ page_size: 10 });
      getListTxApi({ page_size: 10 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  render() {
    const { blocksInfo, transactionsInfo, totalContract } = this.props;

    return (
      <Layout>
        <div className="home">
          <Banner />
          <div className="blocks_transactions_view">
            <div className="container">
              <div className="chain-value">
                <ChainInfo
                  totalContract={totalContract}
                  blocksInfo={blocksInfo}
                />
              </div>
              <div className="flex">
                <BlocksBox blocksInfo={blocksInfo} />
                <TransactionsBox transactionsInfo={transactionsInfo} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { chainInfo } = state;
  return {
    blocksInfo: chainInfo.blocks,
    transactionsInfo: chainInfo.transactions,
    totalContract: chainInfo.totalContract
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
