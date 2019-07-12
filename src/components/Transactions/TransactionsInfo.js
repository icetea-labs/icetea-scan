import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { diffTime, convertTxType } from "../../utils";
import Layout from "../Layout/Layout";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import * as findTime from "../../service/blockchain/find-time-return";
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
import moment from "moment";

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
      txStatus: "",
      txType: ""
    };
  }
  componentDidMount() {
    const hashId = this.props.match.params.hashId;
    this.loadTransaction(hashId);
  }

  async loadTransaction(hashId) {
    const response = await _get(null, singleTx + "/" + hashId);
    if (response.status === 200) {
      const { data } = response;
      const txInfo = data[0];
      console.log(response);
      this.setState({
        hash: hashId,
        txStatus: txInfo.result_code,
        height: txInfo.height,
        timeStamp: txInfo.time,
        txType: txInfo.data_op,
        gasused: txInfo.gasused,
        from: txInfo.from,
        to: txInfo.to,
        payer: txInfo.payer,
        gaslimit: txInfo.gaslimit,
        nonce: txInfo.nonce,
        returnvalue: txInfo.returnvalue
      });
    }
  }

  // async componentWillMount() {
  //   let hashId = this.props.match.params.hashId;
  //   let res_tx = await _get(null, singleTx + "/" + hashId);
  //   let res_data;
  //   let tx_data;
  //   let diffTime;
  //   let time;
  //   let height;
  //   let list_src = [];
  //   let txStatus;
  //   let txType;
  //   // let src = "";

  //   if (res_tx.status === 200) {
  //     res_data = res_tx.data;
  //     tx_data = res_data[0];
  //     height = tx_data.height;
  //     time = moment(tx_data.time).format("DD/MM/YYYY HH:mm:ss");
  //     // src = tx_data.data_src;
  //     diffTime = await findTime.diffTime(tx_data.time);
  //     if (tx_data) {
  //       txStatus = tx_data.result_code === null ? "Error" : "Success";
  //       txType = "transfer";
  //       if (tx_data) {
  //         if (tx_data.data_op === 0) {
  //           txType = "deploy";
  //         } else if (tx_data.data_op === 1) {
  //           txType = "call";
  //         }
  //       }
  //     }
  //   }

  // }

  render() {
    const {
      hash,
      txStatus,
      height,
      timeStamp,
      txType,
      gasused,
      from,
      to,
      payer,
      gaslimit,
      nonce,
      returnvalue
    } = this.state;
    return (
      <Layout>
        <div className="transaction_info mt_50">
          <div className="container">
            <div className="transaction_header page_info_header">
              <div className="wrap">
                <span className="wrap-title">Transactions</span>
                <span className="id_code">{hash}</span>
                <CopyToClipboard
                  text={hash}
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
                <i className="fa fa-list-alt" />
                <span>Transaction Information</span>
              </div>
              <div className="info_body">
                <div className="row_detail">
                  <span className="label">TxHash: </span>
                  <div className="text_wrap">{hash}</div>
                </div>
                <div className="row_detail">
                  <span className="label">TxReceipt Status:</span>
                  <div className="text_wrap">
                    <span
                      className={
                        txStatus !== 0 ? "error_color" : "success_color"
                      }
                    >
                      {txStatus !== 0 ? "Error" : "Success"}
                    </span>
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Block Height:</span>
                  <div className="text_wrap">
                    <Link to={`/block/${height}`}>{`# ${height}`}</Link>
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">TimeStamp:</span>
                  <div className="text_wrap">
                    {diffTime(timeStamp) + " [ " + timeStamp + " ]"}
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Transaction Type:</span>
                  <div className="text_wrap transaction_type">
                    {convertTxType(txType)}
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Gas Used:</span>
                  <div className="text_wrap">{`${gasused} TEA`}</div>
                </div>

                <div className="row_detail">
                  <span className="label">From:</span>
                  <div className="text_wrap">
                    {from ? (
                      <Link to={`/contract/${from}`}>{from}</Link>
                    ) : (
                      <span>--</span>
                    )}
                    <CopyToClipboard
                      text={from}
                      onCopy={() => {
                        notifi.info("Copy Succesful!");
                      }}
                    >
                      <i className="copy_to_add fa fa-clipboard" />
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">To:</span>
                  <div className="text_wrap">
                    {to ? (
                      <Link to={`/contract/${to}`}>{to}</Link>
                    ) : (
                      <span>--</span>
                    )}
                    <CopyToClipboard
                      text={to}
                      onCopy={() => {
                        notifi.info("Copy Succesful!");
                      }}
                    >
                      <i className="copy_to_add fa fa-clipboard" />
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Payer:</span>
                  <div className="text_wrap">
                    {payer ? (
                      <Link to={`/contract/${payer}`}>{payer}</Link>
                    ) : (
                      <span>--</span>
                    )}
                    <CopyToClipboard
                      text={payer}
                      onCopy={() => {
                        notifi.info("Copy Succesful!");
                      }}
                    >
                      <i className="copy_to_add fa fa-clipboard" />
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Gas Limit:</span>
                  <div className="text_wrap">
                    {gaslimit > 0 ? `${gaslimit} TEA` : "Not Set"}
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Nonce:</span>
                  <div className="text_wrap">{nonce}</div>
                </div>
                <div className="row_detail">
                  <span className="label">Result:</span>
                  <pre className="result_data">{returnvalue}</pre>
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
