import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import notifi from '../elements/Notification';
import CallContract from './elements/CallContract';
import ContractDetail from './elements/ContractDetail';
import './Contract.scss';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import 'rc-tabs/assets/index.css';
import { getAccountInfo, getMetadataContract } from '../../service/blockchain/get-single-data';
class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isContractAddress: false,
      address: '',
      params_url: '',
      addresDetail: {},
      metadata: {},
    };
  }

  componentDidMount() {
    // const address = this.props.match.params.address;
    // let { param_url } = this.state;
    // this._checkTxSigned();
    // this.setState({ address });
    const address = this.props.match.params.address;
    this.loadData(address);
  }

  async loadData(address) {
    const addressInfoResp = await getAccountInfo(address);
    let isContract = false;
    let metadataResp = {};
    // console.log("addressInfoResp", addressInfoResp);
    if (addressInfoResp && addressInfoResp.data.deployedBy) {
      metadataResp = await getMetadataContract(address);
      isContract = true;
    } else {
      isContract = false;
    }
    this.setState({
      isContractAddress: isContract,
      addresDetail: addressInfoResp.data || {},
      metadata: metadataResp.data || {},
    });

    // console.log("response", addressInfoResp);
    // console.log("res_metadata", metadataContractResp);
  }
  // _ChangeDetail = () => {
  //   this.setState({
  //     show_call: true
  //   });
  // };

  // _ChangeCall = () => {
  //   this.setState({
  //     show_call: false
  //   });
  // };

  _checkTxSigned = () => {
    // let {param_url, show_call} = this.state;
    // let search = this.props.location.search.split("?txSigned=");
    // if (search !== ""){
    //     show_call = true;
    //     param_url = JSON.parse(decodeURIComponent(search[1]))
    //     console.log(param_url)
    // }
    // this.setState({param_url, show_call})
  };

  tabOnChange = value => {
    console.log(`selected ${value}`);
  };

  render() {
    const { show_call, params_url, isContractAddress, addresDetail, metadata } = this.state;
    const address = this.props.match.params.address;
    // console.log("isContractAddress", isContractAddress);

    return (
      <div className="viewcontact detailBlocks pc-container">
        <div className="flex-wrap">
          <div className="flexBox">
            <h3>Address</h3>
            <span className="id_status">{address}</span>
            <CopyToClipboard
              text={address}
              onCopy={() => {
                notifi.info('Copy Succesful!');
              }}
            >
              <span className="copy_to_add fa fa-clipboard" />
            </CopyToClipboard>
          </div>
          <div className="flexBox">
            <div className="breadcrumb">
              <span className="breadcrumb-item">
                <Link to="/">Home</Link>
              </span>
              <div className="breadcrumb-separator">/</div>
              <span className="breadcrumb-item">
                <Link to="/contracts">Addresses</Link>
              </span>
              <div className="breadcrumb-separator">/</div>
              <span className="breadcrumb-item">
                <Link to={`/contracts/${address}`}>Address Info</Link>
              </span>
            </div>
          </div>
        </div>
        <div className="block_content page_info_content">
          {/* <div className="title">
                <i className="fa fa-cube" />
                <span id="detail">Contract Information</span>
                <span
                  id={show_call === true ? "none" : "choose"}
                  className="button-contract"
                  onClick={this._ChangeCall}
                >
                  Detail
                </span>
                <span
                  id={show_call === false ? "none" : "choose"}
                  className="button-contract"
                  onClick={this._ChangeDetail}
                >
                  Call
                </span>
              </div> */}

          <div className="info_body contract-content ">
            {/* {show_call === true ? (
                  <CallContract
                    address={address}
                    state={show_call}
                    search={params_url}
                  />
                ) : (
                  <ContractDetail address={address} state={!show_call} />
                )} */}
            <Tabs
              defaultActiveKey={'1'}
              destroyInactiveTabPane
              renderTabBar={() => <ScrollableInkTabBar />}
              renderTabContent={() => <TabContent />}
              onChange={this.tabOnChange}
            >
              <TabPane tab="Detail" key="1" placeholder="loading Detail">
                <ContractDetail address={address} addresDetail={addresDetail} metadata={metadata} />
              </TabPane>
              {isContractAddress && (
                <TabPane tab="Call Contract" key="2" placeholder="loading Call">
                  <CallContract address={address} state={show_call} search={params_url} metadata={metadata} />
                </TabPane>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default Contract;
