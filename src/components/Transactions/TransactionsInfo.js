import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../Layout';

const mapStateToProps = (state) => {
  return{
    transactions: state.Transactions,
    blocks: state.Blocks
  }
}

class TransactionsInfo extends Component {

  transactionInfo = () => {
    const hashId = this.props.match.params.hashId;
    const tsn = this.props.transactions.length > 0 && this.props.transactions.find(t => t.hash === hashId);

    if(tsn){
      const txStatus = (tsn.tx_result.code) ? 'Error' : 'Success';
      var txType ='transfer';
      if(tsn){
        const txdata = JSON.parse(tsn.tx.data) || {}
        if (txdata.op === 0) {
          txType = 'deploy'
          // t.to = fmtHex(t.tx_result.data);
        } else if (txdata.op === 1) {
          txType = 'call'
        }
      }
      // diffTime
      const timeStamp = (this.props.blocks.length > 0) && this.props.blocks.find(b => b.header.height === tsn.height);
      let currentTime  = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
      let txnTime = moment(timeStamp.header.time).format("DD/MM/YYYY HH:mm:ss");
      const ms = moment(currentTime,"DD/MM/YYYY HH:mm:ss").diff(moment(txnTime,"DD/MM/YYYY HH:mm:ss"));
      const d = moment.duration(ms);

      var diffTime = null;
      if(d.days() > 0){
        diffTime = ` ${d.days()} days ${d.hours()} hours ago `;
      }else if(d.hours() > 0){
        diffTime = ` ${d.hours()} hours ${d.minutes()} mins ago `;
      }else if(d.minutes() > 0){
        diffTime = ` ${d.minutes()} mins ${d.seconds()} secs ago `;
      }else{
        diffTime = ` ${d.seconds()} secs ago `;
      };

      return(
        <div className="transaction_info mt_50">
          <div className="container">
            <div className="transaction_header page_info_header">
              <div className="wrap">
                Transactions
                <span className="id_code">{ tsn.hash }</span>
                <span className="copy_id fa fa-clipboard"></span>
              </div>
              <div className="breadcrumb">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/">Transactions</Link></li>
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
                  <div className="text_wrap">{ tsn.hash }</div>
                </div>
                <div className="row_detail">
                  <span className="label">TxReceipt Status:</span>
                  <div className="text_wrap"><span className={(tsn && tsn.tx_result.code) ? 'error_color': 'success_color'}>{ txStatus }</span></div>
                </div>
                <div className="row_detail">
                  <span className="label">Block Height:</span>
                  <div className="text_wrap"><Link to={`/block/${tsn.height}`}>{ tsn.height }</Link></div>
                </div>
                <div className="row_detail">
                  <span className="label">TimeStamp:</span>
                  <div className="text_wrap">{ timeStamp && diffTime + ' [ ' + moment(timeStamp.header.time).format("MMMM-DD-YYYY h:mm:ss") + ' ]' }</div>
                </div>
                <div className="row_detail">
                  <span className="label">Transaction Type:</span>
                  <div className="text_wrap transaction_type">{ txType }</div>
                </div>
                <div className="row_detail">
                  <span className="label">Fee:</span>
                  <div className="text_wrap">{tsn && tsn.tx.fee} BNB</div>
                </div>
                <div className="row_detail">
                  <span className="label">From:</span>
                  <div className="text_wrap">
                    {
                      (tsn && tsn.tags['tx.from']) ? <Link to="/">{ tsn.tags['tx.from'] }</Link> : <span>--</span>
                    }
                    {(tsn && tsn.tags['tx.from']) && <i className="copy_to_add fa fa-clipboard"></i>}
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">To:</span>
                  <div className="text_wrap">
                    {
                      (tsn && tsn.tags['tx.to']) ? <Link to="/">{ tsn.tags['tx.to'] }</Link> : <span>--</span>
                    }
                    {(tsn && tsn.tags['tx.to']) && <i className="copy_to_add fa fa-clipboard"></i>}
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Value:</span>
                  <div className="text_wrap">{ tsn && tsn.tx.value } BNB</div>
                </div>
                <div className="row_detail">
                  <span className="label">Data:</span>
                  <div className="text_wrap">
                    <div className="datacode">
                        "symbol": "XRP.B-585_BNB", <br/>
                        "orderType": "limit",<br/>
                        "side": "buy",<br/>
                        "price": 0.0183527,<br/>
                        "quantity": 2527.9,<br/>
                        "timeInForce": "GTE",<br/>
                        "orderId": "B83A15A103F2EFAFB4870937D59E1C6B7015A0A3-12614"<br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <Layout>
        { this.transactionInfo() }
      </Layout>
    );
  }
}
export default connect(mapStateToProps)(TransactionsInfo);