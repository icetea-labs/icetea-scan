import React, { Component } from 'react';
import SearchBox from '../Layout/SearchBox/SearchBox';
import BlocksBox from './elements/BlocksBox';
import TransactionsBox from './elements/TransactionsBox';
import ChainInfo from './elements/ChainInfo';
import { FlexBox, FlexWidthBox } from '../elements/Common';
import { getListBlockApi, getListTxApi, getAllContracts } from '../../service';

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
        <div className="home_content">
          <FlexBox wrap="wrap" className="home_topContainer">
            <ChainInfo />
          </FlexBox>
          <FlexBox wrap="wrap">
            <FlexWidthBox width="40%">
              <BlocksBox />
            </FlexWidthBox>
            <FlexWidthBox width="60%">
              <TransactionsBox />
            </FlexWidthBox>
          </FlexBox>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
