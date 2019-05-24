/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { getAllContracts, getDataContract } from '../../service/get-single-data';

class AllContract extends Component {

    constructor() {
        super();
        this.state = {
            contract_data: []
        }
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
        for (let i = 0; i < data.length; i++) {
            let res = await getDataContract(data[i]);

            if (res.code === 200) {
                contract_data.push(res.data)
            }
        }
        this.setState({ contract_data })
    }

    render() {
        console.log('this.state.contract_data', this.state.contract_data)
        return (
            <Layout>
                <div className="block_page mt_50 mb_30">
                    <div className="container">
                        <div className="block_page page_info_header">
                            <h3>Contract </h3>
                            <div className="breadcrumb">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/contracts">Contract</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="table_data">
                            <table>
                                <thead>
                                    <tr>
                                        <th width="100">Deploy By</th>
                                        <th width="350">Balance</th>
                                        <th width="100">Has Src</th>
                                        <th width="100">Mode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.contract_data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th width="100">{item.balance ? item.balance : 0}</th>
                                                <th width="350">{item.deployedBy ? item.deployedBy : 'null'}</th>
                                                <th width="100">{item.hasSrc ? item.hasSrc : 'null'}</th>
                                                <th width="100">{item.mode ? item.mode : 'null'}</th>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination">
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Layout >
        );
    }
}

export default AllContract;