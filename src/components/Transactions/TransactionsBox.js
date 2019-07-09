import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as findTime from "../../service/find-time-by-block";
import "./TransactionsBox.scss";

const mapStateToProps = state => {
  return {
    allTransactions: state.getRealTimeData.transactions,
    hashId: state.HashIdChange
  };
};

class TransactionsBox extends Component {
  constructor() {
    super();

    this.state = {
      blockInfo: null
    };

    this.listDiffTime = [];
    this.listType = [];
  }

  async componentWillReceiveProps() {
    if (this.props.allTransactions !== null) {
      for (let i = 0; i < this.props.allTransactions.length; i++) {
        let item = this.props.allTransactions[i];
        let txType = "transfer";
        const txdata = JSON.parse(item.tx.data) || {};
        let diffTime = await findTime.diffTime(item.height);

        if (txdata.op === 0) {
          txType = "deploy";
          // t.to = fmtHex(t.tx_result.data);
        } else if (txdata.op === 1) {
          txType = "call";
        }
        // console.log(diffTime);
        this.listDiffTime.push(diffTime);
        this.listType.push(txType);
      }
    }
  }

  loadTransactionsData = () => {
    if (this.props.allTransactions !== null) {
      this.listTxs = this.props.allTransactions.map((item, index) => {
        let diffTime = this.listDiffTime[index];
        return (
          <div className="row_transactions" key={index}>
            <div className="info_tx flex">
              <div className="tx">
                TX#:
                <Link to={`/tx/${item.hash}`}>{item.hash}</Link>
              </div>
              <div className="seconds_time">{diffTime}</div>
            </div>
            <div className="transactions flex">
              <div className="from_to">
                <div className="from">
                  From:{" "}
                  <Link to={`/contract/${item.tags["tx.from"]}`}>
                    {item.tags["tx.from"] ? item.tags["tx.from"] : "--"}
                  </Link>
                </div>
                <div className="to">
                  To:{" "}
                  <Link to={`/contract/${item.tags["tx.to"]}`}>
                    {item.tags["tx.to"] ? item.tags["tx.to"] : "--"}
                  </Link>
                </div>
              </div>
              <div className="status_order">
                <span className="fa fa-circle">{this.listType[index]}</span>
              </div>
            </div>
          </div>
        );
      });
    }

    this.listDiffTime = [];
    this.listType = [];

    return this.listTxs;
  };

  render() {
    return (
      <div className="transactions_box">
        <div className="header_top">
          <div className="title">
            <i className="fa fa-tasks" />
            <span>Transactions</span>
          </div>
          <Link to="/txs">View All →</Link>
        </div>
        <div className="box_wrap">{this.loadTransactionsData()}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TransactionsBox);
