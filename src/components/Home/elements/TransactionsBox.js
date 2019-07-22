import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './TransactionsBox.scss';
import { TxType, Address, Hash, TimeWithFormat } from '../../elements/Common';

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
                <Hash value={item.hash} />
              </div>
              <div className="seconds_time">
                <TimeWithFormat value={item.time} />
              </div>
            </div>
            <div className="transactions flex">
              <div className="from_to">
                <div className="from">
                  <span>From: </span>
                  <Address value={item.from} />
                </div>
                <div className="to">
                  <span>To: </span>
                  <Address value={item.to} />
                </div>
              </div>
              <div className="statusTx">
                <TxType value={item.data_op} />
              </div>
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
          <Link to="/txs">View All >></Link>
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
