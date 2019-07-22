import React, { Component } from 'react';
import Layout from '../Layout/Layout';
import Banner from './elements/Banner/Banner';
import BlocksBox from './elements/BlockBox/BlocksBox';
import TransactionsBox from './elements/TransactionBox/TransactionsBox';
import ChainValue from './elements/ChainValue/ChainValue';
import { Row, Col } from 'react-bootstrap';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      is_loading: true
    }
  }

  render() {
    return (
      <Layout>
        <div className="home">
          <Banner />
          <div className="blocks_transactions_view">
            <ChainValue />
            <Row>
              <Col xs={12} sm={12} md={12} lg={5} xl={5}>
                <BlocksBox />
              </Col>
              <Col xs={12} sm={12} md={12} lg={7} xl={7}>
                <TransactionsBox />
              </Col>
            </Row>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;