import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { diffTime, convertTxType } from '../../utils';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './TransactionsInfo.scss';
import notifi from '../elements/Notification';
import { _get } from '../../service/api/base-api';
import { singleTx } from '../../service/api/list-api';

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
      txType: '',
    };
  }
  componentDidMount() {
    const hashId = this.props.match.params.hashId;
    this.loadTransaction(hashId);
  }

  async loadTransaction(hashId) {
    const response = await _get(null, singleTx + '/' + hashId);
    if (response.status === 200) {
      const { data } = response;
      const txInfo = data[0];
      // console.log(response);
      txInfo &&
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
          returnvalue: txInfo.returnvalue,
        });
    }
  }

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
      returnvalue,
    } = this.state;

    return (
      <div className="detailTransactions detailBlocks pc-container">
        <div className="flex-wrap">
          <div className="flexBox">
            <h3>Transactions</h3>
            <span className="id_status">#{hash}</span>
            <CopyToClipboard
              text={hash}
              onCopy={() => {
                notifi.info('Copy Succesful!');
              }}
            >
              <span className="copy_to_add fa fa-clipboard" />
            </CopyToClipboard>
          </div>
          <div className="flexBox">
            <div className="breadcrumb">
              <span className="breadcrumb-item">
                <Link to="/">Home</Link>
              </span>
              <div className="breadcrumb-separator">/</div>
              <span className="breadcrumb-item">
                <Link to="/txs">Transactions</Link>
              </span>
              <div className="breadcrumb-separator">/</div>
              <span className="breadcrumb-item">
                <Link to={`/tx/${hash}`}>Tx Info</Link>
              </span>
            </div>
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
                <span className={txStatus !== 0 ? 'error_color' : 'success_color'}>
                  {txStatus !== 0 ? 'Error' : 'Success'}
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
              <div className="text_wrap">{diffTime(timeStamp) + ' [ ' + timeStamp + ' ]'}</div>
            </div>
            <div className="row_detail">
              <span className="label">Transaction Type:</span>
              <div className="text_wrap statusTx">{convertTxType(txType)}</div>
            </div>
            <div className="row_detail">
              <span className="label">Gas Used:</span>
              <div className="text_wrap">{`${gasused} TEA`}</div>
            </div>

            <div className="row_detail">
              <span className="label">From:</span>
              <div className="text_wrap">
                {from ? <Link to={`/contract/${from}`}>{from}</Link> : <span>--</span>}
                <CopyToClipboard
                  text={from}
                  onCopy={() => {
                    notifi.info('Copy Succesful!');
                  }}
                >
                  <i className="copy_to_add fa fa-clipboard" />
                </CopyToClipboard>
              </div>
            </div>
            <div className="row_detail">
              <span className="label">To:</span>
              <div className="text_wrap">
                {to ? <Link to={`/contract/${to}`}>{to}</Link> : <span>--</span>}
                <CopyToClipboard
                  text={to}
                  onCopy={() => {
                    notifi.info('Copy Succesful!');
                  }}
                >
                  <i className="copy_to_add fa fa-clipboard" />
                </CopyToClipboard>
              </div>
            </div>
            <div className="row_detail">
              <span className="label">Payer:</span>
              <div className="text_wrap">
                {payer ? <Link to={`/contract/${payer}`}>{payer}</Link> : <span>--</span>}
                <CopyToClipboard
                  text={payer}
                  onCopy={() => {
                    notifi.info('Copy Succesful!');
                  }}
                >
                  <i className="copy_to_add fa fa-clipboard" />
                </CopyToClipboard>
              </div>
            </div>
            <div className="row_detail">
              <span className="label">Gas Limit:</span>
              <div className="text_wrap">{gaslimit > 0 ? `${gaslimit} TEA` : 'Not Set'}</div>
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
    );
  }
}

export default TransactionsInfo;
