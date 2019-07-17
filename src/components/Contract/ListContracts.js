/* eslint-disable no-undef */
import React, { Component } from 'react';
import { ContractMode } from '@iceteachain/common';
import { connect } from 'react-redux';
import Select from 'rc-select';
import PaginationPro from '../elements/PaginationPro';
import { Link } from 'react-router-dom';
import { toTEA } from '../../utils';
import { getAllContracts, getDataContract } from '../../service/blockchain/get-single-data';
import * as actions from '../../store/actions';
class ListContracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      total: 0,
      dataCurrentPage: [],
      allContractsAddress: [],
    };
  }

  async componentDidMount() {
    const res = await getAllContracts();
    // console.log(res);
    // if (res.status === 200) {
    //   let data_res = res.data;
    //   this.loadData(data_res);
    // }
    const { setLoading } = this.props;
    setLoading(true);
    this.loadData(res.data);
  }

  async loadData(data) {
    const { current, pageSize } = this.state;
    const total = data.length;
    const from = (current - 1) * pageSize;
    let to = from + pageSize;
    let contract = [];

    if (total > 0) {
      if (to > total) to = total;
      console.log('from: ', from, '-to', to);
      contract = data.filter((item, index) => {
        return index >= from && index < to;
      });
    }

    // console.log("contract", contract);
    let tmp = [];
    for (let i = 0; i < contract.length; i++) {
      let res = await getDataContract(contract[i]);
      // console.log("res", res);
      res.data.address = contract[i];
      // if (res.status === 200) {
      tmp.push(res.data);
      // }
    }
    this.setState({ allContractsAddress: data, dataCurrentPage: tmp, total }, () => {
      const { setLoading } = this.props;
      setLoading(false);
    });
  }

  renderTbody() {
    const { dataCurrentPage } = this.state;

    return dataCurrentPage.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <Link to={`/contract/${item.address}`}>{item.address}</Link>
          </td>
          <td>
            <span>{toTEA(item.balance)}</span>
          </td>
          <td>
            <Link to={`/contract/${item.deployedBy}`}>{item.deployedBy}</Link>
          </td>
          <td>
            <span>{item.mode === ContractMode.WASM ? 'WebAssembly' : 'JavaScript'}</span>
          </td>
        </tr>
      );
    });
  }

  paginationOnChange = current => {
    // console.log("current", current);
    const { allContractsAddress } = this.state;
    const { setLoading } = this.props;

    this.setState({ current }, () => {
      setLoading(true);
      this.loadData(allContractsAddress);
    });
  };

  render() {
    const { current, pageSize, total } = this.state;

    return (
      <div className="block_page mb_30">
        <div className="container">
          <div className="block_page page_info_header">
            <h3>Contract </h3>
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/contracts">Contract</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="table_data">
            <table>
              <thead>
                <tr>
                  <th width="35%">Address</th>
                  <th width="15%">Balance</th>
                  <th width="35%">Deployed by</th>
                  <th width="15%">Type</th>
                </tr>
              </thead>
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
            total={total}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoading: value => {
      dispatch(actions.setLoading(value));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ListContracts);
