import React, { Component } from 'react';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
import CallContract from './elements/CallContract';
import ContractDetail from './elements/ContractDetail';
import './Contract.scss';

class Contract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_call: false
        }
    }

    _ChangeDetail = () =>{
        this.setState({
            show_call: true
        })
    }

    _ChangeCall = () =>{
        this.setState({
            show_call: false
        })
    }

    render() {
        return (
            <Layout>
                <div className="block_info mt_50">
                    <div className="container">
                        <div className="block_info_header page_info_header">
                            <div className="wrap">
                                Contract
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
                                <span>
                                    <span className='button-contract' onClick={this._ChangeDetail}>Detail</span>
                                    <span className='button-contract' onClick={this._ChangeCall}>Call</span>
                                </span>
                            </div>
                            <div className="info_body">
                                {this.state.show_call === true ? <CallContract address={this.props.match.params.address} /> : <ContractDetail address={this.props.match.params.address} />}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >
        );
    }
}

export default Contract;                                                                