import React, { Component } from 'react';
import Prism from 'prismjs';
// import { Link } from 'react-router-dom';
import { TxOp } from '@iceteachain/common';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import 'rc-tabs/assets/index.css';
import './CallContract.scss';
import { Modal, Button, Input, Select } from 'antd';
import { fmtType, formatResult, parseParamList, tryStringifyJson } from '../../../utils';
// import 'antd/lib/modal/style/index.css';
// import 'antd/lib/select/style/index.css';
// import {
//   getAccountInfo,
//   getMetadataContract
// } from "../../../service/blockchain/get-single-data";
// import { ContractMode } from "@iceteachain/common";
// import { execContract, callWithWallet } from '../../../service/blockchain/exec-contract';
import tweb3 from '../../../tweb3';
import { createBankKey } from '../../../service/wallet/create';
const { TextArea } = Input;
const { Option } = Select;

class CallContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // address: "",
      // private_key: "",
      // balance: null,
      // list_func: [],
      // write_func: [],
      // view_func: [],
      // pure_func: [],
      // choose_funcion: [],
      // is_choose: "all",
      // type: "",
      // info_modename: "",
      // type_func: [],
      // name_func: "exampleFunction",
      // return_type: "any",
      // params: [],
      // value: 0,
      // fee: 0,
      // params_value: [],
      // data: "",
      // method: "",
      // is_hidden: true,
      // wallet: "",
      // show_option: false,
      // option: "Create random, throw-away account",
      // show_create: true,
      // private_key_wallet: "",
      // have_wallet: false,
      // show_method_wallet: true,
      // option_button: "Hidden",
      // param_url: "",
      isIceteaWallet: false,
      txSigned: '',
      account: {},
      metadataBase: {},
      metadata: {},
      selectedMeta: [],
      selectedFunc: '',
      params_value: {},
      answers: {},
      loading: [],
      iconLoading: false,
    };

    // this.params = [];
    // this.params_value = [];
  }

  // async componentWillMount() {
  //   let address = this.props.address;
  //   let response_a_i = await getAccountInfo(address);
  //   this._checkKey();

  //   if (response_a_i.status === 200) {
  //     let info = response_a_i.data;
  //     let balance = info.balance;
  //     let isSystemContract = !!info.system;
  //     let isRegularContract = info.hasSrc;
  //     let isAccount = !isSystemContract && !isRegularContract;
  //     console.log(isAccount);
  //     let type = isAccount
  //       ? "Externally-owned account"
  //       : isRegularContract === true
  //       ? "Regular Contract"
  //       : "System Contract";
  //     let info_mode = info.mode || ContractMode.JS_RAW;
  //     let info_modename = "N/A";

  //     if (!isAccount) {
  //       if (!isAccount) {
  //         if (info_mode === ContractMode.JS_RAW) {
  //           info_modename = "Raw JS";
  //         } else if (info_modename === ContractMode.JS_DECORATED) {
  //           info_modename = "Decorated JS";
  //         } else if (info.mode === ContractMode.WASM) {
  //           info_modename = "WebAssembly";
  //         }
  //       }
  //     }

  //     this.setState({
  //       address,
  //       type,
  //       info_modename,
  //       balance
  //     });
  //   }
  //   // console.log(this.state.address);

  //   let response_m = await getMetadataContract(this.state.address);
  //   if (response_m.status === 200) {
  //     let list_func = Object.entries(response_m.data);
  //     let pure_func = [],
  //       view_func = [],
  //       write_func = [];

  //     // console.log(list_func);

  //     list_func.forEach(item => {
  //       // eslint-disable-next-line
  //       let entry_func = item[1];
  //       let decorators = entry_func.decorators;
  //       let type = decorators[0];

  //       // eslint-disable-next-line default-case
  //       switch (type) {
  //         case "pure":
  //           return pure_func.push(item);
  //         case "view":
  //           return view_func.push(item);
  //         case "transaction":
  //           return write_func.push(item);
  //       }
  //     });

  //     this.setState({
  //       list_func,
  //       pure_func,
  //       view_func,
  //       write_func
  //     });
  //   }

  //   this._setChoose("all");
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.metadata) !== JSON.stringify(prevState.metadataBase)) {
      const { metadata } = nextProps;
      const newMeta = Object.keys(metadata).map((key, index) => {
        return Object.assign(
          {},
          {
            selected: false,
            answer: '',
            name: key,
            decorators: metadata[key]['decorators'] || [],
            params: metadata[key]['params'] || [],
            // type: metadata[key]["type"] || []
          },
          metadata[key]
        );
      });
      return {
        metadataBase: metadata,
        metadata: newMeta,
        selectedMeta: newMeta,
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    const tmpAccount = createBankKey();
    // tweb3.wallet.importAccount(tmpAccount.privateKey);
    // tweb3.wallet.defaultAccount = tmpAccount.address;

    const search_params = new URLSearchParams(window.location.search);
    let txSigned = search_params.get('txSigned');
    if (txSigned) {
      txSigned = JSON.parse(decodeURIComponent(txSigned));
      this.setState({ account: tmpAccount, txSigned, isIceteaWallet: true }, () => {
        Prism.highlightAll();
      });
    } else {
      this.setState({ account: tmpAccount }, () => {
        Prism.highlightAll();
      });
    }
    console.log('txSigned', txSigned);
  }

  // _handleValue = event => {
  //   this.setState({
  //     value: event.target.value
  //   });
  // };

  // _handleFee = event => {
  //   this.setState({
  //     fee: event.target.value
  //   });
  // };

  // _hiddenWallet = () => {
  //   this.setState({
  //     is_hidden: !this.state.is_hidden
  //   });
  // };

  // _handleWallet = event => {
  //   this.setState({
  //     wallet: event.target.value
  //   });
  // };

  // // Submit private key
  // _submitKey = () => {
  //   let { private_key } = this.state;
  //   localStorage.setItem("private_key_wallet", private_key);
  //   this._checkKey();
  // };

  // // Check key
  // _checkKey = () => {
  //   let {
  //     have_wallet,
  //     private_key,
  //     show_method_wallet,
  //     option_button
  //   } = this.state;
  //   let private_key_wallet = localStorage.getItem("private_key_wallet");

  //   if (private_key_wallet !== null) {
  //     have_wallet = true;
  //     private_key = private_key_wallet;
  //     show_method_wallet = false;
  //     option_button = "Hidden";
  //   }

  //   this.setState({
  //     have_wallet,
  //     private_key_wallet,
  //     private_key,
  //     show_method_wallet,
  //     option_button
  //   });
  // };

  // // Set option for create wallet
  // _setOption = event => {
  //   let { show_create } = false;
  //   switch (event.target.id) {
  //     case "create":
  //       show_create = true;

  //       this.setState({
  //         option: "Create random, throw-away account"
  //       });
  //       break;

  //     case "signin":
  //       show_create = false;

  //       this.setState({
  //         option: "Sign with Icetea Wallet"
  //       });
  //       break;

  //     default:
  //       break;
  //   }

  //   this.setState({ show_create });
  // };

  // _setChoose = is_choose => {
  //   this.setState({
  //     is_choose
  //   });

  //   let data_func = this.state.list_func;

  //   // eslint-disable-next-line default-case
  //   switch (is_choose) {
  //     case "pure":
  //       data_func = this.state.pure_func;
  //       break;
  //     case "view":
  //       data_func = this.state.view_func;
  //       break;
  //     case "transaction":
  //       data_func = this.state.write_func;
  //       break;
  //   }

  //   this.setState({
  //     data_func
  //   });
  // };

  // // Set function for using wallet
  // _setFunction = event => {
  //   let name_func = event.target.id;
  //   let choose_func;
  //   for (let i = 0; i < this.state.data_func.length; i++) {
  //     let func = this.state.data_func[i];
  //     if (func[0] === name_func) {
  //       choose_func = func;
  //     }
  //   }

  //   let type_func = choose_func[1].decorators;
  //   let params = choose_func[1].params;
  //   let return_type = choose_func[1].returnType;
  //   let params_value = Array(params.length);

  //   this.setState({
  //     params,
  //     name_func,
  //     return_type,
  //     params_value,
  //     type_func
  //   });

  //   this.params = [];
  //   this.params_value = [];
  //   this._setParam();
  // };

  // // Set params for function
  // _setParam = () => {
  //   this.params = this.state.params.map((item, index) => {
  //     let i = index;
  //     let add_detail = ", ";
  //     if (i === this.state.params.length - 1) {
  //       add_detail = null;
  //     }

  //     let type = "";
  //     let add_or = "|";
  //     if (Array.isArray(item.type) === true) {
  //       for (let i = 0; i < item.type.length; i++) {
  //         if (i === item.type.length - 1) {
  //           add_or = "";
  //         }
  //         type += item.type[i] + add_or;
  //       }
  //     } else {
  //       type = item.type;
  //     }

  //     return (
  //       <label key={index}>
  //         <span>{item.name}</span>: <span id="type-data">{type}</span>
  //         {add_detail}
  //       </label>
  //     );
  //   });

  //   return this.params;
  // };

  // _createData = () => {
  //   let data;
  //   this.setState({
  //     data
  //   });
  // };

  // // Create account for test
  // _generateAccount = event => {
  //   let { account, private_key } = this.state;
  //   let data = {};
  //   switch (event.target.id) {
  //     case "regular":
  //       data = createRegularKey();
  //       break;
  //     case "bank":
  //       data = createBankKey();
  //       break;

  //     default:
  //       break;
  //   }

  //   account = data.account;
  //   private_key = data.privateKey;
  //   this.setState({ account, private_key });
  // };
  // // Run  function
  // _runFunc = event => {
  //   let name = event.target.id;

  //   console.log(name);
  //   this._execFunc(name);
  // };

  // // Chose type for function
  // async _execFunc(name) {
  //   let type_func = this.state.type_func[0];
  //   let { name_func, address, method, fee, value } = this.state;

  //   switch (type_func) {
  //     case "read":
  //       method = "callReadonlyContractMethod";
  //       break;
  //     case "pure":
  //       method = "callPureContractMethod";
  //       break;
  //     case "transaction":
  //       method = this.state.name_func;
  //       break;
  //     default:
  //       break;
  //   }

  //   console.log(method);

  //   let response_c_f;
  //   console.log(name);
  //   if (name === "normal") {
  //     response_c_f = await execContract(
  //       this.params_value,
  //       name_func,
  //       address,
  //       method,
  //       fee,
  //       value
  //     );
  //   } else {
  //     response_c_f = await callWithWallet(address, null, value, fee, null);
  //   }

  //   let data = response_c_f.data;
  //   let code_status = response_c_f.code_status;

  //   if (data === undefined) {
  //     this.setState({
  //       data: response_c_f.code_status
  //     });
  //   } else {
  //     this.setState({
  //       data: code_status + " " + JSON.stringify(data)
  //     });
  //   }
  // }

  // _setParamValue = event => {
  //   this.params_value[parseInt(event.target.id)] = event.target.value;
  // };

  // _handleMethodWallet = () => {
  //   let { show_method_wallet, option_button } = this.state;
  //   show_method_wallet = !show_method_wallet;
  //   if (show_method_wallet === true) {
  //     option_button = "Hidden";
  //   } else {
  //     option_button = "Open";
  //   }

  //   this.setState({ show_method_wallet, option_button });
  // };

  onChangeTypeFunc = index => {
    const { metadata } = this.state;
    let typeFunc = null;
    if (index === '2') typeFunc = 'transaction';
    if (index === '3') typeFunc = 'view';
    if (index === '4') typeFunc = 'pure';

    const newMeta = metadata.filter(func => {
      return func.decorators[0] === typeFunc || !typeFunc;
    });
    // console.log("callback newMeta", newMeta);
    this.setState({ selectedMeta: newMeta });
  };

  renderFuncLeftPanel = () => {
    const { metadata } = this.state;
    // console.log("renderFuncLeftPanel", metadata);
    const disabled = metadata[0].type === 'unknown';

    return (
      <Tabs
        defaultActiveKey="1"
        onChange={this.onChangeTypeFunc}
        renderTabBar={() => <ScrollableInkTabBar />}
        renderTabContent={() => <TabContent />}
      >
        <TabPane tab="All" key="1">
          <div className="wrapper-funcs">{this.renderFuncs(metadata)}</div>
        </TabPane>
        <TabPane tab="Write" key="2" disabled={disabled}>
          <div className="wrapper-funcs">{this.renderFuncs(metadata, 'transaction')}</div>
        </TabPane>
        <TabPane tab="View" key="3" disabled={disabled}>
          <div className="wrapper-funcs">{this.renderFuncs(metadata, 'view')}</div>
        </TabPane>
        <TabPane tab="Pure" key="4" disabled={disabled}>
          <div className="wrapper-funcs">{this.renderFuncs(metadata, 'pure')}</div>
        </TabPane>
      </Tabs>
    );
  };

  renderFuncs = (metadata, typeFunc) => {
    // console.log("type", typeFunc);
    const newMeta = metadata.filter(func => {
      return func.decorators[0] === typeFunc || !typeFunc;
    });
    return (
      <ul>
        {newMeta &&
          newMeta.map((func, index) => {
            return (
              <li
                key={index}
                className={func.selected ? 'on' : ''}
                id={func.name}
                onClick={() => this.selectFunc(func.name)}
              >
                <span>{func.name}</span>
                <code className="typeFunc">@{func.decorators[0] || func.type}</code>
              </li>
            );
          })}
      </ul>
    );
  };

  selectFunc = name => {
    let value;
    const { metadata } = this.state;
    metadata.forEach(item => {
      if (item.name === name) {
        item.selected = true;
        value = name;
      } else {
        item.selected = false;
      }
    });
    // console.log("metadata", metadata);
    this.setState({ selectedFunc: value });
  };

  renderInforRightPanel = () => {
    const { selectedMeta, params_value, loading, answers } = this.state;
    const funcsInfo = {};
    // console.log("metadata1", selectedMeta);

    if (selectedMeta.length <= 0) {
      return <span>No function</span>;
    }

    selectedMeta.forEach((func, index) => {
      if (func) {
        const funcName = func.name;
        const decorators = func.decorators || [];
        const decos = decorators.map(d => '@' + d);

        let funcInfo = decos.join(' ');
        if (funcInfo) {
          funcInfo = funcInfo + ' ';
        }
        funcInfo = funcInfo + funcName;

        if (func.params) {
          let ps = func.params
            .reduce((prev, p) => {
              prev.push(p.name + ': ' + fmtType(p.type));
              return prev;
            }, [])
            .join(', ');
          funcInfo += '(' + ps + ')';
        }

        funcInfo += ': ' + fmtType(func.fieldType || func.returnType, func.returnType);
        funcsInfo[funcName] = funcInfo;
      }
    });

    return selectedMeta.map((func, index) => {
      return (
        <div className="wrapper-func" key={index}>
          <div className="info-box">
            <code className="language-js">{funcsInfo[func.name]}</code>
          </div>
          <div className="func-content">
            <form className="func-body">
              {func.type === 'unknown' ? (
                <React.Fragment>
                  <label>Params (each param 1 row, JSON accepted, use " to denote string)</label>
                  <TextArea onChange={event => this.onChangeParam(event, func.name)} rows={3} />
                  <Button
                    type="primary"
                    loading={(loading[func.name] && loading[func.name]['view']) || false}
                    onClick={() => this.submitForm(func, index, 'view')}
                  >
                    <span>View</span>
                  </Button>
                  <Button
                    type="primary"
                    loading={(loading[func.name] && loading[func.name]['pure']) || false}
                    onClick={() => this.submitForm(func, index, 'pure')}
                  >
                    <span>Pure</span>
                  </Button>
                </React.Fragment>
              ) : (
                func.params.map((param, paramIndex) => {
                  const isNumber = param.type.toString() === 'number' ? 'number' : '';
                  // console.log("type", type, param.type.toString());
                  return (
                    <div key={paramIndex} className="wrapper-input">
                      <label>{`${param.name} (${param.type})`}</label>
                      <Input
                        type={isNumber}
                        value={params_value[func.name] && params_value[func.name][paramIndex]}
                        onChange={event => this.onChangeParam(event, func.name, isNumber, paramIndex)}
                        placeholder={`${param.name} (${param.type})`}
                        allowClear
                      />
                    </div>
                  );
                })
              )}
              <Button type="primary" loading={loading[func.name] === true} onClick={() => this.submitForm(func, index)}>
                <span>{func.decorators[0] === 'transaction' || func.type === 'unknown' ? 'Send' : 'Querry'}</span>
              </Button>
              {answers[func.name] && (
                <div className="myanswer">
                  <span>
                    &nbsp;[&nbsp;
                    <b>
                      <code>{func.name}():</code>
                    </b>
                    &nbsp;method Response&nbsp;]
                  </span>
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-success">
                    <i className="fa  fa-angle-double-right fa-6" />
                  </span>
                  <strong />
                  &nbsp;
                  <span>
                    <pre>
                      <code>{answers[func.name]}</code>
                    </pre>
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      );
    });
  };

  onChangeParam = (event, funcName, isNumber, paramIndex) => {
    const { params_value } = this.state;
    let value = event.currentTarget.value;
    console.log('value', value, isNumber);
    // JavaScript
    if (paramIndex) {
      if (isNumber) value = parseInt(value);
      if (!params_value[funcName]) params_value[funcName] = [];
      params_value[funcName][paramIndex] = value;
    } else {
      //WebAssembly
      params_value[funcName] = parseParamList(value);
    }
    console.log('params_value', params_value);
    this.setState({ params_value });
  };

  submitForm = (func, indexFunc, typeCall) => {
    const { loading, isIceteaWallet } = this.state;

    if (typeCall) {
      loading[func.name] = [];
      loading[func.name][typeCall] = true;
    } else {
      loading[func.name] = true;
    }
    // console.log('loading', loading);
    if (typeCall || func.decorators[0] === 'view' || func.decorators[0] === 'pure') {
      this.callReadOrPure(func, indexFunc, typeCall);
    } else if (isIceteaWallet) {
      this.getSinatureFromIceteaWallet(func, indexFunc);
    } else {
      this.sendTransaction(func, indexFunc);
    }

    this.setState({ loading: loading });
  };

  callReadOrPure = async (func, index, typeCall) => {
    const { address } = this.props;
    const { loading, answers, params_value } = this.state;

    try {
      const method =
        func.decorators[0] === 'view' || typeCall === 'view' ? 'callReadonlyContractMethod' : 'callPureContractMethod';
      // console.log('params_value', params_value);
      const result = await tweb3[method](address, func.name, params_value[func.name] || []);
      // console.log("result", result);
      answers[func.name] = tryStringifyJson(result || '' + result);
    } catch (error) {
      console.log(error);
      answers[func.name] = tryStringifyJson(error, true);
    } finally {
      loading[func.name] = false;
      console.log(answers);
      this.setState({ answers, loading });
    }
  };

  sendTransaction = async (func, index) => {
    const { address } = this.props;
    const { answers, loading, params_value, account } = this.state;
    const signers = account.address;
    // console.log('params_value', params_value);
    try {
      const ct = tweb3.contract(address);
      const result = await ct.methods[func.name](...(params_value[func.name] || [])).sendCommit({ signers });
      answers[func.name] = formatResult(result);
    } catch (error) {
      console.log(error);
      answers[func.name] = formatResult(error, true);
    } finally {
      loading[func.name] = false;
      this.setState({ answers, loading });
    }
  };

  getSinatureFromIceteaWallet = async (func, index) => {
    const { address } = this.props;
    const { params_value } = this.state;

    let formData = {};
    const txData = {
      op: TxOp.CALL_CONTRACT,
      name: func.name,
      params: params_value[func.name] || [],
    };
    formData.to = address;
    formData.data = txData;

    formData = encodeURIComponent(JSON.stringify(formData));
    const url = encodeURIComponent('http://localhost:3006/contract/' + address + '?txSigned=');
    window.location = 'https://wallet.icetea.io/signTransaction/' + formData + '/' + url;
  };

  sendTransactionWithIceteaWallet = async (func, index = 2) => {
    console.log(index);
    const { answers, txSigned, params_value } = this.state;
    const funcName = txSigned.data.name;
    const paramTmp = txSigned.data.params;
    const address = txSigned.to;

    try {
      paramTmp &&
        paramTmp.forEach((e, i) => {
          if (!params_value[funcName]) params_value[funcName] = [];
          params_value[funcName][i] = e;
        });
      const result = await tweb3.sendRawTransaction(txSigned);
      // console.log('txSigned', txSigned, '--', funcName);
      answers[funcName] = formatResult(result);
    } catch (error) {
      console.log(error);
      answers[funcName] = formatResult(error, true);
    } finally {
      this.setState({ answers, txSigned: '' });
      window.history.pushState({}, document.title, '/contract/' + address);
    }
  };

  handleChange = value => {
    console.log(`selected ${value}`);
    if (value === 'icetea') {
      this.setState({ isIceteaWallet: true });
    } else {
      this.setState({ isIceteaWallet: false });
    }
  };

  handleModalCancel = () => {
    this.setState({ txSigned: '' });
  };

  handleModalSent = () => {
    this.sendTransactionWithIceteaWallet();
  };

  render() {
    // let {
    //   address,
    //   is_choose,
    //   show_create,
    //   have_wallet,
    //   show_method_wallet,
    //   option_button,
    //   data,
    //   data_func,
    //   metadata
    // } = this.state;
    const { txSigned, isIceteaWallet, selectedMeta } = this.state;
    // console.log('txSigned', txSigned);
    return (
      <div className="container-call-contract">
        <div className="side-left">
          <div className="dragbar" />
          {this.renderFuncLeftPanel()}
        </div>
        <div className="side-main">
          <div className="contrainer-main">
            {selectedMeta.length > 0 && (
              <div className="connector-wallet">
                <i id="connector" className="fa fa-circle" />
                <span> Connect to </span>
                <Select
                  // size="small"
                  value={(isIceteaWallet && 'icetea') || 'random'}
                  style={{ width: 300 }}
                  onChange={this.handleChange}
                  placeholder="Please select wallet"
                  animation="slide-up"
                >
                  <Option value="random">Generate a random, throw-away account</Option>
                  <Option value="icetea">Sign with Icetea Wallet</Option>
                </Select>
              </div>
            )}
            {this.renderInforRightPanel()}
          </div>
        </div>
        {!!txSigned && (
          <Modal
            title="Conffirm"
            visible={!!txSigned}
            footer={[
              <Button key="back" onClick={this.handleModalCancel}>
                <span>Cancel</span>
              </Button>,
              <Button key="submit" type="primary" onClick={this.handleModalSent}>
                <span>Send</span>
              </Button>,
            ]}
          >
            <div className="modal-txSigned">
              <pre>
                <code>{tryStringifyJson(txSigned)}</code>
              </pre>
            </div>
          </Modal>
        )}
      </div>
      // <div className='tab-contract'>
      //     {/* Left SideBar */}
      //     <div className="side-bar_left">
      //         {/* Button choose function  */}
      //         <div className='choose-button'>
      //             <button onClick={() => { this._setChoose('view') }} className={is_choose === 'view' ? 'btn-n-choose' : 'btn-choose'} >View</button>
      //             <button onClick={() => { this._setChoose('pure') }} className={is_choose === 'pure' ? 'btn-n-choose' : 'btn-choose'}>Pure</button>
      //             <button onClick={() => { this._setChoose('transaction') }} className={is_choose === 'transaction' ? 'btn-n-choose' : 'btn-choose'}>Write</button>
      //             <button onClick={() => { this._setChoose('all') }} className={is_choose === 'all' ? 'btn-n-choose' : 'btn-choose'}>All</button>
      //         </div>

      //         {/* List Function */}
      //         <div className='function-choose'>
      //             <ul>
      //                 {this.state.data_func && this.state.data_func.map((item, index) => {
      //                     let name_func = item[0];
      //                     return (<li key={index} id={name_func} onClick={this._setFunction}>
      //                         {name_func}
      //                     </li>)
      //                 })}
      //             </ul>
      //         </div>
      //     </div>

      //     {/* Content  */}
      //     <div className="call-contract">
      //         {/* Import Wallet */}
      //         {have_wallet === false ? (<p style={{ color: 'red' }}>you are not login now</p>) : (<p style={{ color: 'green' }}>wallet is exactly</p>)}
      //         <button className='btn-option' onClick={this._handleMethodWallet}>{option_button} method for wallet </button>
      //         <div className='wallet' style={{ display: show_method_wallet === true ? 'block' : 'none' }}>
      //             <h3>Chose options to exec contract</h3>
      //             <div className='option'>
      //                 <span onClick={() => { this.setState({ show_option: !this.state.show_option }) }}>
      //                     {this.state.option}
      //                     <i className={this.state.show_option === true ? 'fa fa-caret-up' : 'fa fa-caret-down'} aria-hidden="true"></i>
      //                 </span>
      //                 <ul style={{ display: this.state.show_option === true ? "block" : "none" }} onClick={() => { this.setState({ show_option: !this.state.show_option }) }}>
      //                     <li id="create" onClick={this._setOption}>Create random, throw-away account</li>
      //                     <li id="signin" onClick={this._setOption}> Sign with Icetea Wallet</li>
      //                 </ul>
      //             </div>
      //             {/* Input option */}
      //             {
      //                 show_create === true ?
      //                     (<div className='create-account'>
      //                         <p>
      //                             <span id='bank' onClick={this._generateAccount}>Generate Bank Count</span>
      //                             <span id='regular' onClick={this._generateAccount}>Generate Regular Account</span>
      //                         </p>
      //                         <p>
      //                             <input defaultValue={address} placeholder='Address' type='text' />
      //                         </p>
      //                         <p>
      //                             <input value={this.state.private_key} placeholder='Private Key' type={this.state.is_hidden === true ? 'password' : 'autocomplete'} onChange={this._handleWallet} />
      //                             <button onClick={this._hiddenWallet} > {this.state.is_hidden === true ? 'Show' : 'Hidden'}</button>
      //                         </p>
      //                         <br></br>
      //                         {/* Sumit private key */}
      //                         <button onClick={this._submitKey}>Submit</button>
      //                         <br></br>
      //                     </div>) : null
      //             }

      //         </div>
      //         {/* Data of contract */}
      //         <div className='content-call'>
      //             <pre id='display-data'>
      //                 <ul>
      //                     <li>Address: {this.state.address}</li>
      //                     <li>Type : {this.state.type} {this.state.info_modename}</li>
      //                     <li>Balance :{this.state.balance}</li>
      //                 </ul>
      //             </pre>
      //         </div>
      //         {/* Function Contract */}
      //         <div className='funcion-ex'>
      //             <p >Function Name: <input value={this.state.name_func} readOnly /></p>
      //             <pre id='display-func'>
      //                 <span id='type-func'>@{this.state.type_func}</span> <span id='name-func'>{this.state.name_func}</span> ({this._setParam()}) : <span id='type-data'>{this.state.return_type}</span>
      //             </pre>
      //         </div>
      //         {/* fee? value ? */}
      //         <div className='fee-value' style={{ display: this.state.type_func[0] === "transaction" ? "block" : "none" }}>
      //             <p>Fee: <input value={this.state.fee} onChange={this._handleFee} /></p>
      //             <p>Value: <input value={this.state.value} onChange={this._handleValue} /></p>
      //         </div>
      //         {/* param? */}
      //         <div className='param-index'>
      //             {this.state.params.map((item, index) => {
      //                 return (
      //                     <div key={index}>
      //                         <p>{index + 1}.{item.name}</p>
      //                         <textarea id={index} value={this.params_value[index]} onChange={this._setParamValue} defaultValue='' ></textarea>
      //                     </div>
      //                 )
      //             })}
      //         </div>
      //         {/* Button Call + ddata*/}
      //         <button id="normal" onClick={this._runFunc} className='btn-exec'>Exec by your created account</button>
      //         <button id="wallet" onClick={this._runFunc} className='btn-exec'>Send Txs by your wallet</button>
      //         {/* Result */}
      //         <div>
      //             <p>Result</p>
      //             <pre style={{ color: data === 'fail' ? 'red' : 'green' }}>
      //                 {this.state.data}
      //             </pre>
      //         </div>
      //     </div>
      // </div>
    );
  }
}

export default CallContract;
