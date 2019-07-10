import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './CallContract.scss';

import { getAccountInfo, getMetadataContract } from '../../../service/blockchain/get-single-data';
import { ContractMode } from '@iceteachain/common';
import { execContract, callWithWallet } from '../../../service/blockchain/exec-contract';
// import tweb3 from '../../../tweb3';
import { createBankKey, createRegularKey } from '../../../service/wallet/create';

class CallContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            private_key: '',
            balance: null,
            list_func: [],
            write_func: [],
            view_func: [],
            pure_func: [],
            choose_funcion: [],
            is_choose: 'all',
            type: '',
            info_modename: '',
            type_func: [],
            name_func: 'exampleFunction',
            return_type: 'any',
            params: [],
            value: 0,
            fee: 0,
            params_value: [],
            data: '',
            method: '',
            is_hidden: true,
            wallet: '',
            show_option: false,
            option: "Create random, throw-away account",
            show_create: true,
            private_key_wallet: '',
            have_wallet: false,
            show_method_wallet: true,
            option_button: 'Hidden',
            param_url: '',
        }

        this.params = [];
        this.params_value = [];
    }

    async componentWillMount() {
        let address = this.props.address;
        let response_a_i = await getAccountInfo(address);
        this._checkKey();

        if (response_a_i.status === 200) {
            let info = response_a_i.data;
            let balance = info.balance;
            let isSystemContract = !!info.system;
            let isRegularContract = info.hasSrc;
            let isAccount = !isSystemContract && !isRegularContract;
            console.log(isAccount);
            let type = isAccount ? 'Externally-owned account' : (isRegularContract === true ? 'Regular Contract' : 'System Contract');
            let info_mode = info.mode || ContractMode.JS_RAW;
            let info_modename = 'N/A';

            if (!isAccount) {
                if (!isAccount) {
                    if (info_mode === ContractMode.JS_RAW) {
                        info_modename = 'Raw JS'
                    } else if (info_modename === ContractMode.JS_DECORATED) {
                        info_modename = 'Decorated JS'
                    } else if (info.mode === ContractMode.WASM) {
                        info_modename = 'WebAssembly'
                    }
                }
            }

            this.setState({
                address,
                type,
                info_modename,
                balance
            });
        }
        // console.log(this.state.address);

        let response_m = await getMetadataContract(this.state.address);
        if (response_m.status === 200) {
            let list_func = Object.entries(response_m.data);
            let pure_func = [], view_func = [], write_func = [];

            // console.log(list_func);

            list_func.forEach((item) => {
                // eslint-disable-next-line
                let entry_func = item[1];
                let decorators = entry_func.decorators;
                let type = decorators[0];

                // eslint-disable-next-line default-case
                switch (type) {
                    case 'pure':
                        return pure_func.push(item);
                    case 'view':
                        return view_func.push(item);
                    case 'transaction':
                        return write_func.push(item);
                }
            });

            this.setState({
                list_func,
                pure_func,
                view_func,
                write_func,
            })
        }

        this._setChoose('all');
    }

    _handleValue = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    _handleFee = (event) => {
        this.setState({
            fee: event.target.value
        })
    }

    _hiddenWallet = () => {
        this.setState({
            is_hidden: !this.state.is_hidden
        })
    }

    _handleWallet = (event) => {
        this.setState({
            wallet: event.target.value
        })
    }

    // Submit private key
    _submitKey = () => {
        let { private_key } = this.state;
        localStorage.setItem('private_key_wallet', private_key);
        this._checkKey();
    }


    // Check key
    _checkKey = () => {
        let { have_wallet, private_key, show_method_wallet, option_button } = this.state;
        let private_key_wallet = localStorage.getItem('private_key_wallet');

        if (private_key_wallet !== null) {
            have_wallet = true;
            private_key = private_key_wallet;
            show_method_wallet = false;
            option_button = 'Hidden';
        }

        this.setState({
            have_wallet,
            private_key_wallet,
            private_key,
            show_method_wallet,
            option_button
        })
    }

    // Set option for create wallet
    _setOption = (event) => {

        let { show_create } = false;
        switch (event.target.id) {
            case 'create':
                show_create = true;

                this.setState({
                    option: "Create random, throw-away account"
                })
                break;

            case 'signin':
                show_create = false;

                this.setState({
                    option: "Sign with Icetea Wallet"
                });
                break;

            default:
                break;
        }

        this.setState({ show_create })
    }

    _setChoose = (is_choose) => {
        this.setState({
            is_choose
        });

        let data_func = this.state.list_func;

        // eslint-disable-next-line default-case
        switch (is_choose) {
            case 'pure':
                data_func = this.state.pure_func;
                break;
            case 'view':
                data_func = this.state.view_func;
                break;
            case 'transaction':
                data_func = this.state.write_func;
                break;
        }

        this.setState({
            data_func
        });

    }

    // Set function for using wallet
    _setFunction = (event) => {
        let name_func = event.target.id;
        let choose_func;
        for (let i = 0; i < this.state.data_func.length; i++) {

            let func = this.state.data_func[i];
            if (func[0] === name_func) {
                choose_func = func;
            }
        }

        let type_func = choose_func[1].decorators;
        let params = choose_func[1].params;
        let return_type = choose_func[1].returnType;
        let params_value = Array(params.length);

        this.setState({
            params,
            name_func,
            return_type,
            params_value,
            type_func
        })

        this.params = [];
        this.params_value = [];
        this._setParam();
    }

    // Set params for function
    _setParam = () => {
        this.params = this.state.params.map((item, index) => {
            let i = index;
            let add_detail = ', ';
            if (i === this.state.params.length - 1) {
                add_detail = null;
            }

            let type = '';
            let add_or = '|';
            if (Array.isArray(item.type) === true) {
                for (let i = 0; i < item.type.length; i++) {
                    if (i === item.type.length - 1) {
                        add_or = '';
                    }
                    type += item.type[i] + add_or;
                }
            } else {
                type = item.type
            }

            return (
                <label key={index}><span>{item.name}</span>: <span id='type-data'>{type}</span>{add_detail}</label>
            )
        });

        return this.params
    }

    _createData = () => {
        let data;
        this.setState({
            data
        })
    }

    // Create account for test
    _generateAccount = (event) => {
        let { account, private_key } = this.state;
        let data = {};
        switch (event.target.id) {
            case 'regular':
                data = createRegularKey();
                break;
            case 'bank':
                data = createBankKey();
                break;

            default:
                break;
        }

        account = data.account;
        private_key = data.privateKey;
        this.setState({ account, private_key });
    }
    // Run  function
    _runFunc = (event) => {
        let name = event.target.id;

        console.log(name)
        this._execFunc(name);
    }

    // Chose type for function
    async _execFunc(name) {
        let type_func = this.state.type_func[0];
        let { name_func, address, method, fee, value } = this.state;

        switch (type_func) {
            case 'read':
                method = 'callReadonlyContractMethod'
                break;
            case 'pure':
                method = 'callPureContractMethod'
                break;
            case 'transaction':
                method = this.state.name_func
                break;
            default:
                break;
        }

        console.log(method);

        let response_c_f;
        console.log(name);
        if (name === 'normal') {
            response_c_f = await execContract(
                this.params_value,
                name_func,
                address,
                method,
                fee,
                value
            )
        } else {
            response_c_f = await callWithWallet(address, null, value, fee, null );
        };

        let data = response_c_f.data;
        let code_status = response_c_f.code_status;

        if (data === undefined) {
            this.setState({
                data: response_c_f.code_status
            })
        } else {
            this.setState({
                data: code_status + ' ' + JSON.stringify(data)
            })
        }
    }

    _setParamValue = (event) => {
        this.params_value[parseInt(event.target.id)] = event.target.value;
    }

    _handleMethodWallet = () => {
        let { show_method_wallet, option_button } = this.state;
        show_method_wallet = !show_method_wallet;
        if (show_method_wallet === true) {
            option_button = 'Hidden';
        } else {
            option_button = 'Open'
        }

        this.setState({ show_method_wallet, option_button })

    }

    render() {
        let { address, is_choose, show_create, have_wallet, show_method_wallet, option_button, data } = this.state
        return (
            <div className='tab-contract'>
                {/* Left SideBar */}
                <div className="side-bar_left">
                    {/* Button choose function  */}
                    <div className='choose-button'>
                        <button onClick={() => { this._setChoose('view') }} className={is_choose === 'view' ? 'btn-n-choose' : 'btn-choose'} >View</button>
                        <button onClick={() => { this._setChoose('pure') }} className={is_choose === 'pure' ? 'btn-n-choose' : 'btn-choose'}>Pure</button>
                        <button onClick={() => { this._setChoose('transaction') }} className={is_choose === 'transaction' ? 'btn-n-choose' : 'btn-choose'}>Write</button>
                        <button onClick={() => { this._setChoose('all') }} className={is_choose === 'all' ? 'btn-n-choose' : 'btn-choose'}>All</button>
                    </div>

                    {/* List Function */}
                    <div className='function-choose'>
                        <ul>
                            {this.state.data_func && this.state.data_func.map((item, index) => {
                                let name_func = item[0];
                                return (<li key={index} id={name_func} onClick={this._setFunction}>
                                    {name_func}
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>

                {/* Content  */}
                <div className="call-contract">
                    {/* Import Wallet */}
                    {have_wallet === false ? (<p style={{ color: 'red' }}>you are not login now</p>) : (<p style={{ color: 'green' }}>wallet is exactly</p>)}
                    <button className='btn-option' onClick={this._handleMethodWallet}>{option_button} method for wallet </button>
                    <div className='wallet' style={{ display: show_method_wallet === true ? 'block' : 'none' }}>
                        <h3>Chose options to exec contract</h3>
                        <div className='option'>
                            <span onClick={() => { this.setState({ show_option: !this.state.show_option }) }}>
                                {this.state.option}
                                <i className={this.state.show_option === true ? 'fa fa-caret-up' : 'fa fa-caret-down'} aria-hidden="true"></i>
                            </span>
                            <ul style={{ display: this.state.show_option === true ? "block" : "none" }} onClick={() => { this.setState({ show_option: !this.state.show_option }) }}>
                                <li id="create" onClick={this._setOption}>Create random, throw-away account</li>
                                <li id="signin" onClick={this._setOption}> Sign with Icetea Wallet</li>
                            </ul>
                        </div>
                        {/* Input option */}
                        {
                            show_create === true ?
                                (<div className='create-account'>
                                    <p>
                                        <span id='bank' onClick={this._generateAccount}>Generate Bank Count</span>
                                        <span id='regular' onClick={this._generateAccount}>Generate Regular Account</span>
                                    </p>
                                    <p>
                                        <input defaultValue={address} placeholder='Address' type='text' />
                                    </p>
                                    <p>
                                        <input value={this.state.private_key} placeholder='Private Key' type={this.state.is_hidden === true ? 'password' : 'autocomplete'} onChange={this._handleWallet} />
                                        <button onClick={this._hiddenWallet} > {this.state.is_hidden === true ? 'Show' : 'Hidden'}</button>
                                    </p>
                                    <br></br>
                                    {/* Sumit private key */}
                                    <button onClick={this._submitKey}>Submit</button>
                                    <br></br>
                                </div>) : null
                        }


                    </div>
                    {/* Data of contract */}
                    <div className='content-call'>
                        <pre id='display-data'>
                            <ul>
                                <li>Address: {this.state.address}</li>
                                <li>Type : {this.state.type} {this.state.info_modename}</li>
                                <li>Balance :{this.state.balance}</li>
                            </ul>
                        </pre>
                    </div>
                    {/* Function Contract */}
                    <div className='funcion-ex'>
                        <p >Function Name: <input value={this.state.name_func} readOnly /></p>
                        <pre id='display-func'>
                            <span id='type-func'>@{this.state.type_func}</span> <span id='name-func'>{this.state.name_func}</span> ({this._setParam()}) : <span id='type-data'>{this.state.return_type}</span>
                        </pre>
                    </div>
                    {/* fee? value ? */}
                    <div className='fee-value' style={{ display: this.state.type_func[0] === "transaction" ? "block" : "none" }}>
                        <p>Fee: <input value={this.state.fee} onChange={this._handleFee} /></p>
                        <p>Value: <input value={this.state.value} onChange={this._handleValue} /></p>
                    </div>
                    {/* param? */}
                    <div className='param-index'>
                        {this.state.params.map((item, index) => {
                            return (
                                <div key={index}>
                                    <p>{index + 1}.{item.name}</p>
                                    <textarea id={index} value={this.params_value[index]} onChange={this._setParamValue} defaultValue='' ></textarea>
                                </div>
                            )
                        })}
                    </div>
                    {/* Button Call + ddata*/}
                    <button id="normal" onClick={this._runFunc} className='btn-exec'>Exec by your created account</button>
                    <button id="wallet" onClick={this._runFunc} className='btn-exec'>Send Txs by your wallet</button>
                    {/* Result */}
                    <div>
                        <p>Result</p>
                        <pre style={{ color: data === 'fail' ? 'red' : 'green' }}>
                            {this.state.data}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

export default CallContract;