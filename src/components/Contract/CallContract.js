import React, { Component } from 'react';
import Layout from '../Layout/Layout';
import './CallContract.scss';
import { getAccountInfo, getMetadataContract } from '../../service/get-single-data';
import { ContractMode } from 'icetea-common';
import { execContract } from '../../service/exec-contract';
import tweb3 from '../../tweb3';

class CallContract extends Component {
    constructor() {
        super();
        this.state = {
            address: null,
            balance: null,
            list_func: [],
            write_func: [],
            view_func: [],
            pure_func: [],
            choose_funcion: [],
            is_choose: 'all',
            type: '',
            info_modename: '',
            type_func: 'view',
            name_func: 'exampleFunction',
            return_type: 'any',
            params: [],
            value: 0,
            fee: 0,
            params_value: [],
            data: '',
            method: 'callReadonlyContractMethod',
            is_hidden: true,
            wallet: '',
        }

        this.params = [];
        this.params_value = [];
    }

    async componentWillMount() {
        let address = this.props.match.params.address;
        let response_a_i = await getAccountInfo(address);

        if (response_a_i.code === 200) {
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
        console.log(this.state.address);

        let response_m = await getMetadataContract(this.state.address);
        if (response_m.code === 200) {
            let list_func = Object.entries(response_m.data);
            let pure_func = [], view_func = [], write_func = [];

            console.log(list_func);

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

    _hiddenWallet = () =>{
        this.setState({
            is_hidden: !this.state.is_hidden
        })
    }

    _handleWallet = (event) => {
        this.setState({
            wallet: event.target.value
        })
    }

    _checkWallet = () => {
        let response_wallet = tweb3.wallet.loadFromStorage(this.state.wallet);
        if (response_wallet === 0) {
            alert('wallet is underfind');
        }
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

        return this.setState({
            data_func
        });

    }

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

    async _execFunc(e) {

        let type_func = this.state.type_func;
        // eslint-disable-next-line default-case 
        switch (type_func[0]) {
            case 'read':
                this.setState({
                    method: 'callReadonlyContractMethod'
                })
                break;
            case 'pure':
                this.setState({
                    method: 'callPureContractMethod'
                })
                break;

            case 'trasaction':
                this.setState({
                    method: this.state.name_func
                })
                break;
        }

        let response_c_f = await execContract(
            this.params_value,
            this.state.name_func,
            this.state.address,
            this.state.method,
            this.state.fee,
            this.state.value
        );
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

    render() {
        return (
            <Layout>

                {/* Left SideBar */}
                <div className="side-bar_left">
                    {/* Button choose function  */}
                    <div className='choose-button'>
                        <button onClick={() => { this._setChoose('view') }} className={this.state.is_choose === 'view' ? 'btn-n-choose' : 'btn-choose'} >View</button>
                        <button onClick={() => { this._setChoose('pure') }} className={this.state.is_choose === 'pure' ? 'btn-n-choose' : 'btn-choose'}>Pure</button>
                        <button onClick={() => { this._setChoose('transaction') }} className={this.state.is_choose === 'transaction' ? 'btn-n-choose' : 'btn-choose'}>Write</button>
                        <button onClick={() => { this._setChoose('all') }} className={this.state.is_choose === 'all' ? 'btn-n-choose' : 'btn-choose'}>All</button>
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
                    <div className='wallet'>
                        <p>Import your wallet</p>
                        <label>
                            <input value={this.state.wallet} placeholder='Type your wallet' type={this.state.is_hidden === true ? 'password' : 'autocomplete'} onChange={this._handleWallet} />
                            <button onClick={this._hiddenWallet} > {this.state.is_hidden === true ? 'Show' : 'Hidden'}</button>
                        </label>
                        <br></br>
                        <button onClick={this._checkWallet}>Submit</button>
                        <br></br>
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
                    <div className='fee-value'>
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
                    <button onClick={() => { this._execFunc() }} className='btn-exec'>Exec</button>
                    {/* Result */}
                    <div>
                        <p>Result</p>
                        <pre color='blue'>
                            {this.state.data}
                        </pre>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default CallContract;