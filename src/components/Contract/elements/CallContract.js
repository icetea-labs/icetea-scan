import React, { Component } from 'react';
import Prism from 'prismjs';
import { tweb3 } from '../../../service/tweb3';
import { TxOp } from '@iceteachain/common';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import 'rc-tabs/assets/index.css';
import './CallContract.scss';
import { Modal, Button, Input, Select } from 'antd';
import { fmtType, formatResult, parseParamList, tryStringifyJson } from '../../../utils';
import { newBankAccount } from './../../../service';
const { TextArea } = Input;
const { Option } = Select;

class CallContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

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
    const tmpAccount = newBankAccount();

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
    var coll = document.getElementsByClassName('info-box');
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener('click', function() {
        this.classList.toggle('active');
        var content = this.nextElementSibling;
        var mHeight = window.getComputedStyle(content).maxHeight;
        if (mHeight !== '0px') {
          content.style.maxHeight = '0px';
        } else {
          content.style.maxHeight = content.scrollHeight;
        }
      });
    }
  }

  toggleCollapsibleSectionWithAnimation() {
    var coll = document.getElementsByClassName('info-box');
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener('click', function() {
        this.classList.toggle('active');
        var content = this.nextElementSibling;
        var mHeight = window.getComputedStyle(content).maxHeight;
        if (mHeight !== '0px') {
          content.style.maxHeight = '0px';
        } else {
          content.style.maxHeight = '100%';
        }
      });
    }
  }

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
          <div className="func-content-shown-by-default">
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
    const url = encodeURIComponent('http://localhost:3006/address/' + address + '?txSigned=');
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
      window.history.pushState({}, document.title, '/address/' + address);
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
    );
  }
}

export default CallContract;
