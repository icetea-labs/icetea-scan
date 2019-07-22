import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TotalInfo, HeaderMap, Hash, Age, Block, Address, Balance, TxType } from '../elements/Common';
import './Transactions.scss';
import Select from 'rc-select';
import PaginationPro from '../elements/PaginationPro';
import { getListTxApi, getTotalTxsApi, getTotalTxsByHeighApi } from '../../service/api/get-list-data';
import * as actions from '../../store/actions';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 1,
      isShowTxForBlock: false,
      current: 1,
      pageSize: 15,
      value: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const search_params = new URLSearchParams(nextProps.location.search);
    const height = search_params.get('height');

    if (height !== prevState.height) {
      return { height };
    }
    return null;
  }

  componentDidMount() {
    this.loadTransactions();
  }

  componentDidUpdate(prevProps, prevState) {
    const { height } = this.state;

    if (prevState.height !== height) {
      this.loadTransactions();
    }
  }

  loadTransactions = () => {
    const { pageSize, height } = this.state;

    if (height) {
      getListTxApi({ height: height, page_size: pageSize });
      getTotalTxsByHeighApi(height);
      this.setState({ isShowTxForBlock: true, height });
    } else {
      getListTxApi({ page_size: pageSize });
      getTotalTxsApi();
      this.setState({ isShowTxForBlock: false });
    }
  };

  paginationOnChange = current => {
    const { pageSize } = this.state;
    getListTxApi({ page_size: pageSize, page_index: current });
  };

  renderThead() {
    return (
      <tr>
        <th width="20%">TxHash</th>
        <th width="7%">Height</th>
        <th width="12%">Age</th>
        <th width="8%">Type</th>
        <th width="20%">From</th>
        <th width="3%" />
        <th width="20%">To</th>
        <th width="10%">Value</th>
      </tr>
    );
  }

  renderTbody() {
    // window.location.reload();
    const { transactionsInfo } = this.props;

    if (transactionsInfo.length === 0) {
      return (
        <tr className="no_data">
          <td colSpan="8">
            <span>No Data</span>
          </td>
        </tr>
      );
    } else {
      return transactionsInfo.map((item, index) => {
        return (
          <tr key={index}>
            <td className="text_overflow">
              <Hash value={item.hash} />
            </td>
            <td>
              <Block value={item.height} />
            </td>
            <td>
              <Age value={item.time} />
            </td>
            <td className="statusTx">
              <TxType value={item.data_op} />
            </td>
            <td className="text_overflow">
              <Address value={item.from} />
            </td>
            <td className="text-center">
              {item.result_code === 0 ? (
                <span className="btn-success">
                  <i className="fa fa-long-arrow-right" aria-hidden="true" />
                </span>
              ) : (
                <span className="btn-error">
                  <i className="fa fa-times-circle" aria-hidden="true" />
                </span>
              )}
            </td>
            <td className="text_overflow">
              <Address value={item.to} />
            </td>
            <td>
              <Balance value={item.gasused} />
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    const { current, pageSize, isShowTxForBlock, height } = this.state;
    const { totalTxs } = this.props;

    return (
      <div className="transactions pc-container ">
        {isShowTxForBlock ? (
          <div className="flexBox flex-header">
            <h3>Transactions</h3>
            <span className="id_status">
              <span>{`For Block #${height}`}</span>
            </span>
          </div>
        ) : (
          <h3>Transactions</h3>
        )}
        <div className="flexBox">
          <TotalInfo total={totalTxs} text={['transactions', ['transaction']]} />
          <HeaderMap value={[{ path: '/', text: 'Home' }, { path: '/txs', text: 'Transactions' }]} />
        </div>

        <div className="table_data">
          <table>
            <thead>{this.renderThead()}</thead>
            <tbody>{this.renderTbody()}</tbody>
          </table>
        </div>
        <PaginationPro
          selectComponentClass={Select}
          showQuickJumper={false}
          showSizeChanger={false}
          defaultPageSize={pageSize}
          defaultCurrent={current}
          onChange={this.paginationOnChange}
          total={totalTxs}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { chainInfo } = state;
  return {
    transactionsInfo: chainInfo.transactions,
    totalTxs: chainInfo.totalTxs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: value => {
      dispatch(actions.setLoading(value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
