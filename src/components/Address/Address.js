import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAccountInfo } from '../../service/get-single-data';
import Layout from '../Layout/Layout';

class Address extends Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            has_src: false,
            deploy_by: null,
            mode: null,
        }
    }

    componentDidMount() {
        let address = this.props.match.params.address;
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
            let mode = response.data.mode;
            // console.log(response)
            this.setState({
                balance: response.data.balance,
                deploy_by: response.data.deployedBy,
                has_src: response.data.hasSrc,
                mode: mode === undefined ? 'null': mode
            })
        }
    }

    render() {
        console.log(this.state)
        return (
            <Layout>
                <div className="block_info mt_50">
                    <div className="container">
                        <div className="block_info_header page_info_header">
                            <div className="wrap">
                                Address
                                <span className="id_code">#{this.props.match.params.address}</span>
                            </div>
                            <div className="breadcrumb">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/blocks">Address</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="block_content page_info_content">
                            <div className="title">
                                <i className="fa fa-cube"></i>
                                <span>Contract Information</span>
                            </div>
                            <div className="info_body">
                                <div className="row_detail">
                                    <span className="label">Address: </span>
                                    <div className="text_wrap">
                                        {this.props.match.params.address}
                                    </div>
                                </div>
                                <div className="row_detail">
                                    <span className="label">Balance:</span>
                                    <div className="text_wrap">{this.state.balance}</div>
                                </div>
                                <div className="row_detail">
                                    <span className="label">Has Src:</span>
                                    <div className="text_wrap">{JSON.stringify(this.state.has_src, null,2)}</div>
                                </div>
                                <div className="row_detail">
                                    <span className="label">Mode:</span>
                                    <div className="text_wrap">{JSON.stringify(this.state.mode, null, 2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >
        );
    }
}

export default Address;
