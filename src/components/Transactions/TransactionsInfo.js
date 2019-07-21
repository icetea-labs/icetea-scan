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
      txInfo: {
        hash: '',
        txStatus: '',
        height: '',
        timeStamp: '',
        txType: '',
        gasused: '',
        from: '',
        to: '',
        payer: '',
        gaslimit: '',
        nonce: '',
        returnvalue: '',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const hashId = nextProps.match.params.hashId;
    console.log('getDerivedStateFromProps');
    if (hashId !== prevState.hashId) {
      return { hashId };
    }
    return null;
  }

  componentDidMount() {
    this.loadTransaction();
  }

  componentDidUpdate(prevProp, prevState) {
    const { hashId } = this.state;
    console.log('prevState.hashId !== hashId', prevState.hashId !== hashId);
    if (prevState.hashId !== hashId) {
      this.loadTransaction();
    }
  }

  async loadTransaction() {
    const { hashId } = this.state;

    const response = await _get(null, singleTx + '/' + hashId);
    // console.log('response', response);
    if (response.status === 200 && response.data[0]) {
      const { data } = response;
      const txInfo = data[0];
      // console.log(response);
      this.setState({
        txInfo: {
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
        },
      });
    } else {
      // load to not found
      this.props.history.push('/exception');
    }
  }

  render() {
    const { txInfo } = this.state;

    return (
      <div className="detailTransactions detailBlocks pc-container">
        <div className="flex-wrap">
          <div className="flexBox">
            <h3>Transactions</h3>
            <span className="id_status">#{txInfo.hash}</span>
            <CopyToClipboard
              text={txInfo.hash}
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
                <Link to={`/tx/${txInfo.hash}`}>Tx Info</Link>
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
              <div className="text_wrap">{txInfo.hash}</div>
            </div>
            <div className="row_detail">
              <span className="label">TxReceipt Status:</span>
              <div className="text_wrap">
                <span className={txInfo.txStatus !== 0 ? 'error_color' : 'success_color'}>
                  {txInfo.txStatus !== 0 ? 'Error' : 'Success'}
                </span>
              </div>
            </div>
            <div className="row_detail">
              <span className="label">Block Height:</span>
              <div className="text_wrap">
                <Link to={`/block/${txInfo.height}`}>{`# ${txInfo.height}`}</Link>
              </div>
            </div>
            <div className="row_detail">
              <span className="label">TimeStamp:</span>
              <div className="text_wrap">{diffTime(txInfo.timeStamp) + ' [ ' + txInfo.timeStamp + ' ]'}</div>
            </div>
            <div className="row_detail">
              <span className="label">Transaction Type:</span>
              <div className="text_wrap statusTx">{convertTxType(txInfo.txType)}</div>
            </div>
            <div className="row_detail">
              <span className="label">Gas Used:</span>
              <div className="text_wrap">{`${txInfo.gasused} TEA`}</div>
            </div>

            <div className="row_detail">
              <span className="label">From:</span>
              <div className="text_wrap">
                {txInfo.from ? <Link to={`/address/${txInfo.from}`}>{txInfo.from}</Link> : <span>--</span>}
                <CopyToClipboard
                  text={txInfo.from}
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
                {txInfo.to ? <Link to={`/address/${txInfo.to}`}>{txInfo.to}</Link> : <span>--</span>}
                <CopyToClipboard
                  text={txInfo.to}
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
                {txInfo.payer ? <Link to={`/address/${txInfo.payer}`}>{txInfo.payer}</Link> : <span>--</span>}
                <CopyToClipboard
                  text={txInfo.payer}
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
              <div className="text_wrap">{txInfo.gaslimit > 0 ? `${txInfo.gaslimit} TEA` : 'Not Set'}</div>
            </div>
            <div className="row_detail">
              <span className="label">Nonce:</span>
              <div className="text_wrap">{txInfo.nonce}</div>
            </div>
            <div className="row_detail">
              <span className="label">Result:</span>
              <pre className="result_data">{txInfo.returnvalue}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionsInfo;
