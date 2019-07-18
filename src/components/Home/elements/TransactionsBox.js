import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { diffTime, convertTxType } from '../../../utils';
import './TransactionsBox.scss';

class TransactionsBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cssIcon: 'fa bi-spin fa-list-alt',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.cssIcon.indexOf('bi-spin') === -1) {
      return { cssIcon: 'fa bi-spin fa-list-alt' };
    } else {
      return { cssIcon: 'fa fa-list-alt' };
    }
  }

  renderTransactions = () => {
    const { transactionsInfo } = this.props;

    return transactionsInfo.map((item, index) => {
      return (
        <div className="wrapper-rowbox" key={index}>
          <div className="row_transactions">
            <div className="info_tx flex">
              <div className="tx">
                <span>TX#:</span>
                <Link to={`/tx/${item.hash}`}>{item.hash}</Link>
              </div>
              <div className="seconds_time">{diffTime(item.time)}</div>
            </div>
            <div className="transactions flex">
              <div className="from_to">
                <div className="from">
                  <span>From: </span>
                  <Link to={`/contract/${item.from}`}>{item.from ? item.from : '--'}</Link>
                </div>
                <div className="to">
                  <span>To: </span>
                  <Link to={`/contract/${item.to}`}>{item.to ? item.to : '--'}</Link>
                </div>
              </div>
              <div className="statusTx">{convertTxType(item.data_op)}</div>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    const { cssIcon } = this.state;

    return (
      <div className="transactions_box">
        <div className="header_top">
          <div className="title">
            <i className={cssIcon} />
            <span>Transactions</span>
          </div>
          <Link to="/txs">View All →</Link>
        </div>
        <div className="box_wrap">{this.renderTransactions()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { chainInfo } = state;
  return {
    transactionsInfo: chainInfo.transactions,
  };
};

export default connect(
  mapStateToProps,
  null
)(TransactionsBox);
