/* eslint-disable no-undef */
import React, { Component } from "react";
import { ContractMode } from "@iceteachain/common";
import { Link } from "react-router-dom";
import { toTEA } from "../../utils";
import Layout from "../Layout/Layout";
import {
  getAllContracts,
  getDataContract
} from "../../service/blockchain/get-single-data";

class AllContract extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      contract_data: []
    };
    // this.contract_data = [];
  }

  async componentDidMount() {
    let res = await getAllContracts();
    console.log(res);
    if (res.status === 200) {
      let data_res = res.data;
      this.loadData(data_res);
    }
  }

  async loadData(data) {
    let contract_data = [];
    this._isMounted = true;
    for (let i = 0; i < data.length; i++) {
      let res = await getDataContract(data[i]);
      const contract = res.data;
      contract.address = data[i];

      if (res.status === 200) {
        contract_data.push(contract);
      }
    }
    if (this._isMounted) {
      this.setState({ contract_data });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderTbody() {
    const { contract_data } = this.state;

    return contract_data.map((item, index) => {
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
            <span>
              {item.mode === ContractMode.WASM ? "WebAssembly" : "JavaScript"}
            </span>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Layout>
        <div className="block_page mt_50 mb_30">
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
            <div className="pagination">
              <ul>
                <li />
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default AllContract;
