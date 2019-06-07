/* eslint-disable no-undef */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import {
  getAllContracts,
  getDataContract
} from "../../service/get-single-data";

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
    // console.log(res);
    if (res.code === 200) {
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

      if (res.code === 200) {
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

  render() {
    // console.log('this.state.contract_data', this.state.contract_data)
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
                    <th width="100">Address</th>
                    <th width="100">Balance</th>
                    <th width="350">Deployed by</th>
                    <th width="100">Has Src</th>
                    <th width="100">Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.contract_data.map((item, index) => {
                    let address = "";
                    let deploy_by = "";
                    for (let i = 0; i < 10; i++) {
                      address += item.address[i];
                      if (item.deployedBy.length >= 10) {
                        deploy_by += item.deployedBy[i];
                      }
                      if (i === 9) {
                        address += "...";
                        deploy_by += "...";
                      }
                    }

                    return (
                      <tr key={index}>
                        <td width="100">
                          {item.address ? (
                            <Link to={`/call-contract/${item.address}`}>
                              {address}
                            </Link>
                          ) : (
                            "null"
                          )}
                        </td>
                        <td width="100">
                          {item.balance
                            ? parseInt(item.balance).toPrecision(2)
                            : 0}
                        </td>
                        <td width="350">
                          {item.deployedBy ? (
                            <Link to={`/contract/${item.deployedBy}`}>
                              {item.deployedBy.length > 10
                                ? deploy_by
                                : item.deployedBy}
                            </Link>
                          ) : (
                            "null"
                          )}
                        </td>
                        <td width="100">
                          {item.hasSrc === true ? "true" : "false"}
                        </td>
                        <td width="100">{item.mode ? item.mode : "null"}</td>
                      </tr>
                    );
                  })}
                </tbody>
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
