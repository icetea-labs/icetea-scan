import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './ChainInfo.scss';
import { formatNumber } from '../../../utils';
import { TimeWithFormat, ShadowBox } from '../../elements/Common';

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
      <ShadowBox className="chaininfo_box">
        <div className="row border-bottom ">
          <TimeWithFormat className="title" value={time} />
          <div className="desc">Time of last block</div>
        </div>
        <div className="row border-bottom ">
          <div className="title"># {height}</div>
          <div className="desc">Block Height</div>
        </div>
        <div className="row border-bottom ">
          <div className="title">{formatNumber(total_txs)}</div>
          <div className="desc">Total Transactions</div>
        </div>
        <div className="row border-bottom ">
          <div className="title">{formatNumber(total_accounts)}</div>
          <div className="desc">Total Accounts</div>
        </div>
      </ShadowBox>
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
