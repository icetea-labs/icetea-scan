import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../Layout/Layout";
import { toTEA, convertTxType } from "../../utils";
import "./Transactions.scss";
import moment from "moment";
import Select from "rc-select";
import PaginationPro from "../elements/PaginationPro";
import {
  getListTxApi,
  getTotalTxsApi,
  getTotalTxsByHeighApi
} from "../../service/api/get-list-data";
import * as actions from "../../store/actions";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 1,
      isShowTxForBlock: false,
      pageIndex: 1,
      to: "",
      from: "",
      current: 1,
      pageSize: 10
    };
  }

  componentDidMount() {
    const { pageSize } = this.state;
    const search_params = new URLSearchParams(window.location.search);
    const height = search_params.get("height");

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
        <th width="15%">Age</th>
        <th width="8%">Type</th>
        <th width="20%">From</th>
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
        </tr>
      );
    } else {
      return transactionsInfo.map((item, index) => {
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
            <td>{moment(item.time).format("MMMM-DD-YYYY h:mm:ss")}</td>
            <td className="statusTx">{convertTxType(item.data_op)}</td>
            <td className="text_overflow">
              {item.from ? (
                <Link to={`/address/${item.from}`}>{item.from}</Link>
              ) : (
                <span>--</span>
              )}
            </td>
            <td className="text_overflow">
              {item.to ? (
                <Link to={`/address/${item.to}`}>{item.to}</Link>
              ) : (
                <span>--</span>
              )}
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
      <Layout>
        <div className="block_page mt_50 mb_30">
          <div className="container">
            <div className="block_page page_info_header">
              <h3>Transactions</h3>
              <span
                className="sub-tilter"
                style={{ display: isShowTxForBlock ? "block" : "none" }}
              >
                <span>{`For Block #${height}`}</span>
              </span>
              <div className="breadcrumb">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/txs">Transactions</Link>
                  </li>
                </ul>
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
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { chainInfo } = state;
  return {
    transactionsInfo: chainInfo.transactions,
    totalTxs: chainInfo.totalTxs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: value => {
      dispatch(actions.setLoading(value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
