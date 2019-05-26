import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../Layout/Layout';
import tweb3 from '../../tweb3';
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as findTime from "../../service/find-time-by-block";
import moment from 'moment';

const mapStateToProps = (state) => {
  return {
    transactions: state.handleTransactions,
    blocks: state.Blocks
  }
}

class TransactionsInfo extends Component {

  constructor() {
    super();
    this.state = {
      tx_data: null,
      blockInfo: null,
      from: null,
      to: null,
      data: null,
      mode: "null",
      src: "null",
      op: "null",
      fee: "null",
      value: "null",
      diffTime: "",
      time: "",
    }

    this.format = null;
    this.num_txs = 0;
    this.hashId = '';
    this.state.tx_data = 0;
    this.data = null;
  }

  async componentWillMount() {
    this.hash = this.props.match.params.hashId;
    const response = await tweb3.getTransaction(this.props.match.params.hashId, 'hex');
    let height = response.height;
    let diffTime = await findTime.diffTime(height);
    let data_block = await tweb3.getBlock({height: response.height});
    let time = data_block.block_meta.header.time;

    this.setState({
      diffTime
    })

    if ('fee' in response.tx) {
      this.setState({
        fee: response.tx.fee
      })
    }

    if ('value' in response.tx) {
      this.setState({
        value: response.tx.value
      })
    }

    this.setState({
      tx_data: response,
      from: response.tags['tx.from'],
      to: response.tags['tx.to'],
      data: response.tx.data,
      time
    })

    // console.log(blockInfo);
    this.transactionInfo();
  }

  transactionInfo = () => {

    // check data
    if (this.state.tx_data) {
      this.txStatus = (this.state.tx_data.tx_result === null) ? 'Error' : 'Success';
      this.txType = 'transfer';
      if (this.state.tx_data) {
        const txdata = JSON.parse(this.state.tx_data.tx.data) || {}
        if (txdata.op === 0) {
          this.txType = 'deploy'
          // t.to = fmtHex(t.tx_result.data);
        } else if (txdata.op === 1) {
          this.txType = 'call'
        }
      }

      if (this.state.data !== null) {
        this.data = JSON.parse(this.state.data);
        this.setState({
          op: this.data.op,
          mode: this.data.mode,
          src: this.data.src
        })
      }
    }
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
                <CopyToClipboard text={this.state.from} onCopy={() => { alert('Copied :' + this.state.tx_data.hash) }}>
                  <span className="copy_to_add fa fa-clipboard"></span>
                </CopyToClipboard>
              </div>
              <div className="breadcrumb">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/txs">Transactions</Link></li>
                  <li><Link to="/">Tx Info</Link></li>
                </ul>
              </div>
            </div>

            <div className="transaction_content page_info_content">
              <div className="title">
                <i className="fa fa-tasks"></i>
                <span>Transaction Information</span>
              </div>
              <div className="info_body">
                <div className="row_detail">
                  <span className="label">TxHash: </span>
                  <div className="text_wrap">{this.state.tx_data.hash}</div>
                </div>
                <div className="row_detail">
                  <span className="label">TxReceipt Status:</span>
                  <div className="text_wrap"><span className={(this.state.tx_data && this.state.tx_data.tx_result === null) ? 'error_color' : 'success_color'}>{this.txStatus}</span></div>
                </div>
                <div className="row_detail">
                  <span className="label">Block Height:</span>
                  <div className="text_wrap"><Link to={`/block/${this.state.tx_data.height}`}>#{this.state.tx_data.height}</Link></div>
                </div>
                <div className="row_detail">
                  <span className="label">TimeStamp:</span>
                  <div className="text_wrap">{ moment(this.state.time).format("DD/MM/YYYY HH:mm:ss") +' [ ' + this.state.diffTime + ' ]'}</div>
                </div>
                <div className="row_detail">
                  <span className="label">Transaction Type:</span>
                  <div className="text_wrap transaction_type">{this.txType}</div>
                </div>
                <div className="row_detail">
                  <span className="label">Fee:</span>
                  <div className="text_wrap">{this.state.tx_data && this.state.fee} ITEA</div>
                </div>
                <div className="row_detail">
                  <span className="label">From:</span>
                  <div className="text_wrap">
                    {
                      (this.state.tx_data && this.state.tx_data.tags['tx.from']) ? <Link to="/">{this.state.tx_data.tags['tx.from']}</Link> : <span>--</span>
                    }

                    <CopyToClipboard text={this.state.from} onCopy={() => { alert('Copied address ' + this.state.from) }}>
                      <i className="copy_to_add fa fa-clipboard"></i>
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">To:</span>
                  <div className="text_wrap">
                    {
                      (this.state.tx_data && this.state.tx_data.tags['tx.to']) ? <Link to="/">{this.state.tx_data.tags['tx.to']}</Link> : <span>--</span>
                    }
                    <CopyToClipboard text={this.state.to} onCopy={() => { alert('Copied address ' + this.state.to) }}>
                      <i className="copy_to_add fa fa-clipboard"></i>
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Value:</span>
                  <div className="text_wrap">{this.state.tx_data && this.state.value} ITEA</div>
                </div>
                <div className="row_detail">
                  <span className="label">Data:</span>
                  <div className="text_wrap">
                    <div className="datacode">
                      <p>"fee" : {this.state.fee}</p>
                      <p>"value": {this.state.value}</p>
                      <p>"op": {this.state.op}</p>
                      <p>"mode": {this.state.mode}</p>
                      <p>"src": {this.state.src}</p>
                    </div>
                  </div>
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