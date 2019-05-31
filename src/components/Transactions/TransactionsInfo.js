import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../Layout/Layout';
import tweb3 from '../../tweb3';
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as findTime from "../../service/find-time-by-block";
import moment from 'moment';
import './TransactionsInfo.scss';
import { getMetadataContract, getDataTransaction, } from '../../service/get-single-data';
import { formatData } from '../../service/format-data';

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
      mode: 0,
      src: "null",
      op: 0,
      fee: 0,
      value: 0,
      diffTime: "",
      time: "",
      tx_from: '',
      tx_to: '',
      result: '',
      events: [],
      tags: null,
      metadata: null,
      contractInfo: null,
    }

    this.format = null;
    this.num_txs = 0;
    this.hashId = '';
    this.state.tx_data = 0;
    this.data = null;
  }

  async componentWillMount() {
    this.hash = this.props.match.params.hashId;
    let response = await getDataTransaction(this.props.match.params.hashId, 'hex');

    if (response.code === 200) {
      let tx_data = response.data;
      console.log(response);
      let height = response.height;
      let diffTime = await findTime.diffTime(height);
      let data_block = await tweb3.getBlock({ height: tx_data.height });
      let time = data_block.block_meta.header.time;

      this.setState({
        diffTime
      })

      if ('fee' in tx_data.tx) {
        this.setState({
          fee: tx_data.tx.fee
        })
      }

      if ('value' in tx_data.tx) {
        this.setState({
          value: tx_data.tx.value
        })
      }

      if ('events' in response) {
        this.setState({
          events: response.events
        })
      }


      if ('result' in tx_data) {

        this.setState({
          result: tx_data.result
        })

        try {
          let metadata_result = await getMetadataContract(tx_data.tags['tx.to']);

          if (metadata_result.code === 200) {
            this.setState({
              metadata: metadata_result.data
            })
          }
        } catch (err) {
          throw err
        }
      }
      
      this.setState({
        tx_data,
        from: tx_data.tags['tx.from'],
        to: tx_data.tags['tx.to'],
        data: tx_data.tx.data,
        time,
        tx_tags: tx_data.tags,
      })

      // console.log(blockInfo);
      this.transactionInfo();
    }
  }

  transactionInfo = () => {
    // check data
    if (this.state.tx_data) {
      this.txStatus = (this.state.tx_data.tx_result === null) ? 'Error' : 'Success';
      this.txType = 'transfer';
      if (this.state.tx_data) {

        const txdata = JSON.parse(this.state.tx_data.tx.data) || {};
        let contractInfo = formatData(txdata, this.state.tx_data.hash);

        this.setState({
          contractInfo
        })

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
                  <div className="text_wrap">{moment(this.state.time).format("DD/MM/YYYY HH:mm:ss") + ' [ ' + this.state.diffTime + ' ]'}</div>
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
                  <span className="label">Metadata:</span>
                  <div className="text_wrap">
                    <pre className="result_data">
                      {JSON.stringify(this.state.metadata, null, 2)}
                    </pre>
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Tags:</span>
                  <pre className="result_data">
                    {JSON.stringify(this.state.tx_tags, null, 2)}
                  </pre>
                </div>
                <div className="row_detail">
                  <span className="label">Result:</span>
                  <pre className="result_data">
                    {JSON.stringify(this.state.result)}
                  </pre>
                </div>
                <div className="row_detail">
                  <span className="label">Events:</span>
                  <pre className="result_data" >
                    {JSON.stringify(this.state.events, null, 2)}
                  </pre>
                </div>
                <div className="row_detail">
                  <span className="label">Contract info:</span>
                  <pre>
                    {this.state.contractInfo}
                  </pre>
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