import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toTEA, convertTxType, diffTime, formatNumber } from '../../utils';
import './Transactions.scss';
// import moment from 'moment';
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
      pageIndex: 1,
      to: '',
      from: '',
      current: 1,
      pageSize: 15,
    };
  }

  componentDidMount() {
    const { pageSize } = this.state;
    const search_params = new URLSearchParams(window.location.search);
    const height = search_params.get('height');

    if (height) {
      getListTxApi({ height: height, page_size: pageSize });
      getTotalTxsByHeighApi(height);
      this.setState({ isShowTxForBlock: true, height });
    } else {
      getListTxApi({ page_size: pageSize });
      getTotalTxsApi();
    }
  }

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
          <th />
          <th />
          <th />
          <th>No Data</th>
          <th />
          <th />
          <th />
          <th />
        </tr>
      );
    } else {
      return transactionsInfo.map((item, index) => {
        // console.log('transactionsInfo', transactionsInfo);
        return (
          <tr key={index}>
            <td className="text_overflow">
              <Link to={`/tx/${item.hash}`}>{item.hash}</Link>
            </td>
            <td>
              <Link to={`/block/${item.height}`} title={item.height}>
                {item.height}
              </Link>
            </td>
            <td>{diffTime(item.time)}</td>
            <td className="statusTx">{convertTxType(item.data_op)}</td>
            <td className="text_overflow">
              {item.from ? <Link to={`/contract/${item.from}`}>{item.from}</Link> : <span>--</span>}
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
              {item.to ? <Link to={`/contract/${item.to}`}>{item.to}</Link> : <span>--</span>}
            </td>
            <td>
              <span>{toTEA(item.gasused)} TEA</span>
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
          <div className="sub-title">
            More than > <span>{formatNumber(totalTxs)}</span> transactions found
          </div>
          <div className="breadcrumb">
            <span className="breadcrumb-item">
              <Link to="/">Home</Link>
            </span>
            <div className="breadcrumb-separator">/</div>
            <span className="breadcrumb-item">
              <Link to="/txs">Transactions</Link>
            </span>
          </div>
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
