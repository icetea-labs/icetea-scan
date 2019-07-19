import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../Layout/Layout";
import MaterialIcon from "material-icons-react";
import "./Transactions.scss";
import * as handleData from "../../service/blockchain/handle-data";
// import diffTime from "../../service/find-time-return";
import { getFirstTxsData } from "../../service/blockchain/init-store";
import { setPageSate } from "../../service/blockchain/get-realtime-data";
import { getListTxApi } from "../../service/api/get-list-data";
import moment from 'moment';
import Paging from "../Layout/elements/Paging/Paging";

const mapStateToProps = state => {
  return {
    transactions: state.handleTransactions,
    pageState: state.changePageState
  };
};

class Transactions extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      height: null,
      show_paging: false,
      to: '',
      from: '',
    };
  }

  async componentWillMount() {
    setPageSate();
  }

  async componentWillReceiveProps(nextProps) {
    this._isMounted = true;

    let search = this.props.location.search;

    // Check is searching txs
    if (this.props !== nextProps) {
      if (this.props.location.search !== "") {
        let data = search.split("?block=");
        this.setState({
          height: Number(data[1].height),
          show_paging: false
        });
        this.getTxsByHeight(this.state.height);
      } else {
        if (this.props.handleTransactions === []) {
          getFirstTxsData();
        }

        this.setState({
          show_paging: true
        });

        if (this.state.pageIndex === 1) {
          this.getTransaction(1);
        }
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getTransaction(pageIndex) {

    if (pageIndex <= 1) {
      pageIndex = 1;
    }

    if (pageIndex >= this.props.pageState.pageTxsLimit) {
      pageIndex = this.props.pageState.pageTxsLimit;
    }

    this.setState({
      pageIndex
    });

    getListTxApi({ page_index: this.state.pageIndex, page_size: this.props.pageState.page_size })
  }

  getTxsByHeight() {
    handleData.getTransactions(
      null,
      null,
      this.state.height,
      this.props.pageState.total_blocks,
      this.props.pageState.total_txs
    );
  }

  loadTransactions() {
    // window.location.reload();
    if (this.props.transactions.length === 0) {
      return (
        <tr className="no_data">
          <td />
          <td />
          <td />
          <td>No Data</td>
          <td />
          <td />
          <td />
        </tr>
      );
    } else {
      this.listTxs = this.props.transactions.map((item, index) => {
        let txType = "transfer";

        if (item.data_op === 0) {
          txType = "deploy";
        } else if (item.data_op === 1) {
          txType = "call";
        }

        let to = item.to;
        let head_to = "";
        let end_to = "";
        let from = item.from;
        let head_from = "";
        let end_from = "";
        let hash = item.hash;
        let head_hash = "";
        let end_hash = "";

        for (let i = 0; i < 10; i++) {
          head_to += to[i];
          head_from += from[i];
          head_hash += hash[i];
          end_to += to[to.length - 10 + i];
          end_from += from[from.length - 10 + i];
          end_hash += hash[hash.length - 10 + i];
        }

        // diffTime
        return (
          <tr key={index}>
            {/* hash */}
            <td >
              {" "}
              <Link to={`/tx/${item.hash}`}>{head_hash + "..." + end_hash}</Link>
            </td>
            {/* height */}
            <td>
              <Link to={`/block/${item.height}`} title={item.height}>
                {item.height}
              </Link>
            </td>
            {/* time */}
            <td>
              {moment(item.time).format("MMMM-DD-YYYY h:mm:ss")}
            </td>
            {/* type */}
            <td >
              <div className='name-type'>
                <div className="circle-span" style={{ background: item.data_op === 0 ? "green" : "blue" }}></div>
                <span>{txType}</span>
              </div>
            </td>
            {/* from */}
            <td>
              {item.from ? (<Link to={`/address/${item.from}`}>{head_from + "..." + end_from}</Link>) : (<span>--</span>)}
            </td>
            {/* to */}
            <td >
              {item.to ? (<Link to={`/address/${item.to}`}>{head_to + "..." + end_to}</Link>) : (<span>--</span>)}
            </td>
            {/* Gas */}
            <td>{item.gasused ? item.gasused : 0} TEA</td>
          </tr>
        );
      });
    }
    return this.listTxs;
  }

  render() {
    return (
      <Layout>
        <div className="block_page mt_50 mb_50">
          <div className="container">
            <div className="block_page page_info_header">
              <h2>Transactions</h2>
              <span className="sub-tilter" style={{ display: this.state.show_paging ? "none" : "block" }}>
                {" "}
                For Block #{this.state.height}
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
                <thead>
                  <tr>
                    <th width="200">TxHash</th>
                    <th width="90">Height</th>
                    <th width="180">Age</th>
                    <th width="80">Type</th>
                    <th width="220">From</th>
                    <th width="220">To</th>
                    <th width="120">Value</th>
                  </tr>
                </thead>
                <tbody>{this.loadTransactions()}</tbody>
              </table>
            </div>
          </div>
          <Paging data={'txs'}/>
        </div>
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Transactions);
