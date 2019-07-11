import React, { Component } from "react";
import "./TotalChain.scss";
import { connect } from "react-redux";
import moment from "moment";
import { getAllContracts } from "../../../service/blockchain/get-single-data";

class TotalChain extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      data: null,
      time: null,
      height: 0,
      total_txs: 0,
      total_accounts: 0
    };

    this.time = null;
  }

  async componentWillReceiveProps() {
    const { blocksInfo } = this.props;
    this._isMounted = true;
    let res = await getAllContracts();
    // let total_accounts;

    // if (res.code === 200) {
    //   total_accounts = res.data.length;
    // }
    if (blocksInfo.length !== 0 && this._isMounted) {
      this.setState({
        time: blocksInfo[0].time,
        height: blocksInfo[0].height,
        total_txs: blocksInfo[0].total_txs,
        total_accounts: res && res.data.length
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="total-chain">
        <ul>
          <li>
            <p className="info-stamp">
              {moment(this.state.time).format("DD/MM/YYYY HH:mm:ss")}
            </p>
            <p>Time of last block</p>
          </li>
          <li>
            <p className="info-stamp"># {this.state.height}</p>
            <p>Height Block</p>
          </li>
          <li>
            <p className="info-stamp">{this.state.total_txs}</p>
            <p>Total Transactions Counter</p>
          </li>
          <li>
            <p className="info-stamp">{this.state.total_accounts}</p>
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
    blocksInfo: chainInfo.blocks
  };
};

export default connect(
  mapStateToProps,
  null
)(TotalChain);
