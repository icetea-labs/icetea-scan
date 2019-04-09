import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class TransactionsBox extends Component {

  loadTransactionsData = () => {
    return(
      this.props.allTransactions && this.props.allTransactions.map((item, index) => {
        var txType ='transfer'
        const txdata = JSON.parse(item.tx.data) || {}
        if (txdata.op === 0) {
          txType = 'deploy'
          // t.to = fmtHex(t.tx_result.data);
        } else if (txdata.op === 1) {
          txType = 'call'
        }
        
        return(
          <div className="row_transactions" key={index}>
            <div className="info_tx flex">
                <div className="tx">
                  TX#: 
                  <Link to={`/tx/${item.hash}`} >{item.hash}</Link>
                  {/* <button onClick={() => this.getHashId(item.hash)}>{item.hash}</button> */}
                </div>
                <div className="seconds_time">1 sec ago</div>
            </div>
            <div className="transactions flex">
              <div className="from_to">
                <div className="from">
                  From: <Link to="/address/">{item.tags['tx.from'] ? item.tags['tx.from'] : '--'}</Link>
                </div>
                <div className="to">
                  To: <Link to="/address/">{item.tags['tx.to'] ? item.tags['tx.to'] : '--'}</Link>
                </div>
              </div>
              <div className="status_order">
                <span className="fa fa-circle"></span> { txType }
              </div>
            </div>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <div className="transactions_box">
        <div className="header_top">
          <h3 className="title"><i className="fa fa-tasks"></i>Transactions</h3>
          <Link to="/txs">View All →</Link>
        </div>

        <div className="box_wrap">
          { this.loadTransactionsData() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    allTransactions: state.Transactions,
    hashId: state.HashIdChange,
  }
}

export default connect(mapStateToProps)(TransactionsBox);