import React, { Component } from 'react';
import Layout from './Layout';
import Banner from './Banner';
import BlocksBox from './Blocks/BlocksBox';
import TransactionsBox from './Transactions/TransactionsBox';
import ChainValue from './ChainValue/ChainValue';

class Home extends Component {

  constructor(props){
    super(props)
    this.state={}
  }

  render() {
    return (
      <Layout>
        <div className="home">
          <Banner />
          <div className="blocks_transactions_view">
            <div className="chain-value">
              <ChainValue />
            </div>
            <div className="container">
              <BlocksBox />
              <TransactionsBox />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;