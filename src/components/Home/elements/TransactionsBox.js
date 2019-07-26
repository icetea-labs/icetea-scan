import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './TransactionsBox.scss';
import { TxType, Address, Hash, TimeWithFormat, ShadowBox, FlexBox, TextOvewflow } from '../../elements/Common';

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
        <div className="wrapperRowBox" key={index}>
          <div className="innerRowBox">
            <FlexBox className="row title">
              <TextOvewflow width="75%" className="info-text padding-r">
                <span className="primary-color">TX#:</span>
                <Hash value={item.hash} />
              </TextOvewflow>
              <div className="secondary-color proxima-nova-regular">
                <TimeWithFormat value={item.time} />
              </div>
            </FlexBox>
            <FlexBox className="row">
              <div style={{ width: '75%' }} className="secondary-color padding-r">
                <TextOvewflow width="50%" className="padding-r">
                  <span>From: </span>
                  <Address className="secondary-color" value={item.from} />
                </TextOvewflow>
                <TextOvewflow width="50%">
                  <span>To: </span>
                  <Address className="secondary-color" value={item.to} />
                </TextOvewflow>
              </div>
              <div className="statusTx">
                <TxType value={item.data_op} />
              </div>
            </FlexBox>
          </div>
        </div>
      );
    });
  };

  render() {
    const { cssIcon } = this.state;

    return (
      <div className="transactions_box">
        <div className="flex_header">
          <div className="title">
            <i className={cssIcon} />
            <span>Transactions</span>
          </div>
          <Link to="/txs">View All >></Link>
        </div>
        <ShadowBox>{this.renderTransactions()}</ShadowBox>
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
