import React, { Component } from "react";
import Layout from "../Layout/Layout";
import Banner from "./elements/Banner";
import BlocksBox from "../Blocks/BlocksBox";
import TransactionsBox from "../Transactions/TransactionsBox";
import ChainValue from "../ChainValue/ChainValue";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: true
    };
  }

  render() {
    return (
      <Layout>
        <div className="home">
          <Banner />
          <div className="blocks_transactions_view">
            <div className="container">
              <div className="chain-value">
                <ChainValue />
              </div>
              <div className="flex">
                <BlocksBox />
                <TransactionsBox />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
