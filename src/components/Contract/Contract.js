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
            show_call: false,
            address: false,
            params_url: '',
        }
    }

    componentWillMount() {
        let address = this.props.match.params.address;
        let {param_url}= this.state;

        this._checkTxSigned();
        this.setState({
            address
        })
    }

    _ChangeDetail = () => {
        this.setState({
            show_call: true
        })
    }

    _ChangeCall = () => {
        this.setState({
            show_call: false
        })
    }

    _checkTxSigned = () => {
        // let {param_url, show_call} = this.state;
        // let search = this.props.location.search.split("?txSigned=");
        // if (search !== ""){
        //     show_call = true;
        //     param_url = JSON.parse(decodeURIComponent(search[1]))
        //     console.log(param_url)
        // }
        // this.setState({param_url, show_call})
    }


    render() {

        let { show_call, address, params_url } = this.state;

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
                                    <li><Link to="/contracts">Contract</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="block_content page_info_content">
                            <div className="title">
                                <i className="fa fa-cube"></i>
                                <span id ='detail'>Contract Information</span>
                                <span id={show_call === true ? 'none' : 'choose'} className='button-contract' onClick={this._ChangeCall} >Detail</span>
                                <span id={show_call === false ? 'none' : 'choose'} className='button-contract' onClick={this._ChangeDetail}>Call</span>
                            </div>
                            <div className="info_body contract-content">
                                {show_call === true ? <CallContract address={address} state={show_call} search={params_url} /> : <ContractDetail address={address} state={!show_call} />}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >
        );
    }
}

export default Contract;                                                                