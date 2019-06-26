import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../Layout/Layout";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as findTime from "../../service/find-time-return";
import "./TransactionsInfo.scss";
// import moment from "moment";
// import tweb3 from "../../tweb3";
// import {
//   getMetadataContract,
//   getDataTransaction,
//   getDataContract
// } from "../../service/get-single-data";
// import { formatData } from "../../service/format-data";
import notifi from "../elements/Notification";
import { _get } from "../../service/api/base-api";
import { singleTx } from "../../service/api/list-api";
import moment from 'moment';

const mapStateToProps = state => {
  return {
    transactions: state.handleTransactions,
    blocks: state.Blocks
  };
};

class TransactionsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // height: null,
      tx_data: {},
      list_src: [],
      time: null,
      diffTime: null,
      txStatus: '',
      txType: ''
    };
  }

  async componentWillMount() {
    let hashId = this.props.match.params.hashId;
    let res_tx = await _get(null, singleTx + '/' + hashId);
    let res_data;
    let tx_data;
    let diffTime;
    let time;
    let height;
    let list_src = [];
    let txStatus;
    let txType;
    // let src = "";

    if (res_tx.status === 200) {
      res_data = res_tx.data;
      tx_data = res_data[0];
      height = tx_data.height;
      time = moment(tx_data.time).format("DD/MM/YYYY HH:mm:ss");;
      // src = tx_data.data_src;
      diffTime = await findTime.diffTime(tx_data.time);
      if (tx_data) {
        txStatus = tx_data.result_code === null ? "Error" : "Success";
        txType = "transfer";
        if (tx_data) {
          if (tx_data.data_op === 0) {
            txType = "deploy";
          } else if (tx_data.data_op === 1) {
            txType = "call";
          }
        }
      }
    }

    this.setState({
      hashId,
      tx_data,
      diffTime,
      time,
      list_src,
      height,
      txType,
      txStatus
    });
  }

  render() {
    return (
      <Layout>
        <div className="transaction_info mt_50">
          <div className="container">
            <div className="transaction_header page_info_header">
              <div className="wrap">
                Transactions
                <span className="id_code">{this.state.tx_data.hash}</span>
                <CopyToClipboard
                  text={this.state.tx_data.hash}
                  onCopy={() => {
                    notifi.info("Copy Succesful!");
                  }}
                >
                  <span className="copy_to_add fa fa-clipboard" />
                </CopyToClipboard>
              </div>
              <div className="breadcrumb">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/txs">Transactions</Link>
                  </li>
                  <li>
                    <Link to="/">Tx Info</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="transaction_content page_info_content">
              <div className="title">
                <i className="fa fa-tasks" />
                <span>Transaction Information</span>
              </div>
              <div className="info_body">
                {/* TxHash */}
                <div className="row_detail">
                  <span className="label">TxHash: </span>
                  <div className="text_wrap">{this.state.tx_data.hash}</div>
                </div>
                <div className="row_detail">
                  <span className="label">TxReceipt Status:</span>
                  <div className="text_wrap">
                    <label className={
                        this.state.tx_data && this.state.tx_data.result_code !== 0
                          ? "error_color"
                          : "success_color"}>
                      {this.state.txStatus}
                    </label>
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Block Height:</span>
                  <div className="text_wrap">
                    <Link to={`/block/${this.state.height}`}>
                      #{this.state.tx_data.height}
                    </Link>
                  </div>
                </div>
                {/* TimeStamp */}
                <div className="row_detail">
                  <span className="label">TimeStamp:</span>
                  <div className="text_wrap">
                    {this.state.time + " [ " + this.state.diffTime + " ]"}
                  </div>
                </div>
                {/* TransactionType */}
                <div className="row_detail">
                  <span className="label">Transaction Type:</span>
                  <div className="text_wrap transaction_type">
                    {this.state.txType}
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Gas Used:</span>
                  <div className="text_wrap">{this.state.tx_data && this.state.tx_data.gasused} TEA</div>
                </div>

                {/* From */}
                <div className="row_detail">
                  <span className="label">From:</span>
                  <div className="text_wrap">
                    {this.state.tx_data && this.state.tx_data.from ? (
                      <Link to={`/contract/${this.state.tx_data.from}`}>{this.state.tx_data.from}</Link>
                    ) : (
                        <span>--</span>
                      )}

                    <CopyToClipboard
                      text={this.state.tx_data.from}
                      onCopy={() => {
                        notifi.info("Copy Succesful!");
                      }}
                    >
                      <i className="copy_to_add fa fa-clipboard" />
                    </CopyToClipboard>
                  </div>
                </div>

                {/* To */}
                <div className="row_detail">
                  <span className="label">To:</span>
                  <div className="text_wrap">
                    {this.state.tx_data && this.state.tx_data.to ? (
                      <Link to={`/contract/${this.state.tx_data.to}`}>{this.state.tx_data.to}</Link>
                    ) : (
                        <span>--</span>
                      )}
                    <CopyToClipboard
                      text={this.state.tx_data.from}
                      onCopy={() => {
                        notifi.info("Copy Succesful!");
                      }}
                    >
                      <i className="copy_to_add fa fa-clipboard" />
                    </CopyToClipboard>
                  </div>
                </div>

                {/* Payer */}
                <div className="row_detail">
                  <span className="label">Payer:</span>
                  <div className="text_wrap">
                    {this.state.tx_data && this.state.tx_data.payer ? (
                      <Link to={`/contract/${this.state.tx_data.payer}`}>{this.state.tx_data.payer}</Link>
                    ) : (
                        <span>--</span>
                      )}
                    <CopyToClipboard
                      text={this.state.tx_data.from}
                      onCopy={() => {
                        notifi.info("Copy Succesful!");
                      }}
                    >
                      <i className="copy_to_add fa fa-clipboard" />
                    </CopyToClipboard>
                  </div>
                </div>

                {/* GasLimit */}
                <div className="row_detail">
                  <span className="label">Gas Limit:</span>
                  <div className="text_wrap">{this.state.tx_data && this.state.tx_data.gaslimit} TEA</div>
                </div>

                {/* Nonce */}
                <div className="row_detail">
                  <span className="label">Nonce:</span>
                  <div className="text_wrap">{this.state.tx_data && this.state.tx_data.nonce} </div>
                </div>

                {/* Result */}
                <div className="row_detail">
                  <span className="label">Result:</span>
                  <pre className="result_data">{JSON.stringify(this.state.tx_data.result_data)}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default connect(mapStateToProps)(TransactionsInfo);
