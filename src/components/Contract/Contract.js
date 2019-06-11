import React, { Component } from 'react';
import { getAccountInfo } from '../../service/get-single-data';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
// import tweb3 from '../../tweb3';

class Contract extends Component {

    constructor() {
        super();
        this.state = {
            balance: 0,
            has_src: false,
            deploy_by: null,
            mode: null,
        }
    }

    componentDidMount() {
        let address = this.props.match.params.address;
        // console.log(address);
        this.loadData(address);
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            window.location.reload();
            this.loadData();
        }
    }

    async loadData() {
        let address = this.props.match.params.address;
        let response = await getAccountInfo(address);
        // console.log(response);

        if (response.code !== 200) {
            this.props.history.push('/not-found');
        } else {
            // console.log(response)
            this.setState({
                balance: response.data.balance,
                deploy_by: response.data.deployedBy,
                has_src: response.data.hasSrc,
                mode: response.data.mode
            })
        }
    }

    render() {
        return (
            <Layout>
                <div className="block_page mt_50 mb_30">
                    <div className="container">
                        <div className="block_page page_info_header">
                            <h3>Contract </h3>
                            <span className="sub-tilter">For #{this.props.match.params.address}</span>
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
                                        <th width="350">Deploy By</th>
                                        <th width="100">Balance</th>
                                        <th width="100">Has Src</th>
                                        <th width="100">Mode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th color='green'>{this.props.match.params.address}</th>
                                        <th>{this.state.balance ? this.state.balance : 0}</th>
                                        <th>{this.state.has_src ? this.state.has_src.toString() : "null"}</th>
                                        <th>{this.state.mode ? this.state.mode : 'null'}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination">
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                        <div>
                            <div className="text_wrap">
                                <div className="row_detail">
                                    <span className="label">Metadata:</span>
                                    <pre className="result_data">
                                        {/* {JSON.stringify(metadata, null, 2)} */}
                                    </pre>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Layout >
        );
    }
}

export default Contract;