/* eslint-disable no-undef */
import React, { Component } from "react";
import { Link } from "react-router-dom";
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

  render() {
    // console.log('this.state.contract_data', this.state.contract_data)
    let { contract_data } = this.state;
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
                    <th width="250">Address</th>
                    <th width="100">Balance</th>
                    <th width="350">Deployed by</th>
                    <th width="100">Has Src</th>
                    <th width="100">Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {contract_data.map((item, index) => {
                    let address = item.address;
                    let deployed_by = item.deployedBy;
                    let head_address = '';
                    let end_address = '';
                    let head_deployed = '';
                    let end_deployed = '';
                    let length_address = address.length;
                    let length_deployed_by = deployed_by.length;
                    let add_more_address = '...';
                    let add_more_deployed_by = '...';

                    if (address.length <= 15) {
                      head_address = address;
                      add_more_address = '';
                    } else {
                      for (let i = 0; i < 15; i++) {
                        head_address = address[i];
                        end_address = address[length_address - 1 - i];
                      }
                    }

                      if (deployed_by.length <= 15) {
                        head_deployed = deployed_by;
                        add_more_deployed_by = '';
                      } else {
                        for (let i = 0; i < 15; i++) {
                          head_deployed = deployed_by[i];
                          end_deployed = deployed_by[length_deployed_by - 1 - i];
                        }
                      }


                      console.log(head_address);
                      return (
                        <tr key={index}>
                          <td width="100">
                            {<Link to={`/contract/${address}`}>{head_address + add_more_address + end_address}</Link>}
                          </td>
                          <td width="100">
                            {item.balance && parseInt(item.balance).toPrecision(2)}
                          </td>
                          <td width="350">
                            {deployed_by &&
                              <Link to={`/contract/${deployed_by}`}>
                                {head_deployed + add_more_deployed_by + end_deployed}
                              </Link>
                            }
                          </td>
                          <td width="100">
                            {item.hasSrc === true ? "true" : "false"}
                          </td>
                          <td width="100">{item.mode ? item.mode : "null"}</td>
                        </tr>);
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
