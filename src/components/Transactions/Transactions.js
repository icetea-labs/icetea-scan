import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Layout from '../Layout';

const mapStateToProps = (state) => {
  return{
    blocks: state.Blocks,
    transactions: state.getRealTimeData.transactions,
  }
}

class Transactions extends Component {

  loadTransactions = () =>{
    const blocks = this.props.blocks;
    const transactions = this.props.transactions;

    // add time in transactions
    for(let b in blocks){
      for(let txn in transactions){
        if(blocks[b].header.height === transactions[txn].height){
          transactions[txn].time = blocks[b].header.time
        }
      }
    }

    const txns = transactions && transactions.map((item, index) => {
      var txType ='transfer';
      const txdata = JSON.parse(item.tx.data) || {}
      if (txdata.op === 0) {
        txType = 'deploy'
      } else if (txdata.op === 1) {
        txType = 'call'
      }
      // diffTime
      let currentTime  = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
      let txnTime = moment(item.time).format("DD/MM/YYYY HH:mm:ss");
      const ms = moment(currentTime,"DD/MM/YYYY HH:mm:ss").diff(moment(txnTime,"DD/MM/YYYY HH:mm:ss"));
      const d = moment.duration(ms);

      var diffTime = null;
      if(d.days() > 0){
        diffTime = `${d.days()} days ${d.hours()} hours ago`;
      }else if(d.hours() > 0){
        diffTime = `${d.hours()} hours ${d.minutes()} mins ago`;
      }else if(d.minutes() > 0){
        diffTime = `${d.minutes()} mins ${d.seconds()} secs ago`;
      }else{
        diffTime = `${d.seconds()} secs ago`;
      }

      return(
        <tr key={index}>
          <td className="text_overflow"> <Link to={`/tx/${item.hash}`}>{item.hash}</Link></td>
          <td><Link to={`/block/${item.height}`} title={item.height}>{item.height}</Link></td>
          <td>{diffTime}</td>
          <td className="tx_type">{txType}</td>
          <td className="text_overflow">
            {
              (item.tags['tx.from']) ? <Link to="/">{ item.tags['tx.from'] }</Link> : <span>--</span>
            }
          </td>
          <td className="text_overflow">
            {
              (item.tags['tx.to']) ? <Link to="/">{ item.tags['tx.to'] }</Link> : <span>--</span>
            }
          </td>
          <td>{(item.tx.value) ? item.tx.value : 0}</td>
        </tr>
      )
    })

    return txns;
  }


  render() {
    return (
      <Layout>
        <div className="block_page mt_50 mb_30">
          <div className="container">
            <div className="block_page page_info_header">
              <div className="wrap">Transactions</div>
              <div className="breadcrumb">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/">Transactions</Link></li>
                </ul>
              </div>
            </div>
            <div className="table_data">
              <table>
                <thead>
                  <tr>
                    <th>TxHash</th>
                    <th>Height</th>
                    <th>Age</th>
                    <th>Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  { this.loadTransactions() }
                </tbody>
              </table>
              
            </div>
            <div className="pagination">
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        
      </Layout>
    );
  }
}



export default connect(mapStateToProps)(Transactions);