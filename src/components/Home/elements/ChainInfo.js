import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './ChainInfo.scss';
import moment from 'moment';
import { formatNumber } from '../../../utils';

class ChainInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
      height: 0,
      total_txs: 0,
      total_accounts: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.blocksInfo.length > 0 && nextProps.blocksInfo !== prevState.blocksInfo) {
      return {
        time: nextProps.blocksInfo[0].time,
        height: nextProps.blocksInfo[0].height,
        total_txs: nextProps.blocksInfo[0].total_txs,
        total_accounts: nextProps.totalContract,
      };
    } else {
      return null;
    }
  }

  render() {
    // console.log("render ChainInfo");
    const { time, height, total_txs, total_accounts } = this.state;

    return (
      <div className="total-chain">
        <ul>
          <li>
            <p className="info-stamp">{moment(time).format('DD/MM/YYYY HH:mm:ss')}</p>
            <p>Time of last block</p>
          </li>
          <li>
            <p className="info-stamp"># {height}</p>
            <p>Block Height </p>
          </li>
          <li>
            <p className="info-stamp">{formatNumber(total_txs)}</p>
            <p>Total Transactions</p>
          </li>
          <li>
            <p className="info-stamp">{formatNumber(total_accounts)}</p>
            <p>Total Accounts</p>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { chainInfo } = state;
  return {
    blocksInfo: chainInfo.blocks,
    totalContract: chainInfo.totalContract,
  };
};

export default connect(
  mapStateToProps,
  null
)(ChainInfo);
