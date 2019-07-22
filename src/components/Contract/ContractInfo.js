import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import notifi from '../elements/Notification';
import CallContract from './elements/CallContract';
import DetailContract from './elements/DetailContract';
import './ContractInfo.scss';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import 'rc-tabs/assets/index.css';
import { getAccountInfo, getMetadataContract, getTxHistoryByAddress } from '../../service/blockchain/get-single-data';
import { HeaderMap } from '../elements/Common';

import { toTEA, tryParseJson } from '../../utils';

class ContractInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1',
      isContractAddress: false,
      address: '',
      params_url: '',
      addresDetail: {},
      metadata: {},
      txHistory: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const address = nextProps.match.params.address;
    const search_params = new URLSearchParams(nextProps.location.search);
    let txSigned = search_params.get('txSigned');

    if (address !== prevState.address) {
      if (txSigned) {
        return { address, activeKey: '2' };
      } else {
        return { address };
      }
    }
    return null;
  }

  componentDidMount() {
    this.loadContractInfo();
    this.loadTxHistory();
  }

  componentDidUpdate(prevProps, prevState) {
    const { address } = this.state;

    if (prevState.address !== address) {
      this.loadContractInfo();
      this.loadTxHistory();
    }
  }

  async loadContractInfo() {
    const { address } = this.state;

    const accountInfo = await getAccountInfo(address);
    let isCt = false;
    let metadataCt = {};

    if (accountInfo && accountInfo.data.deployedBy) {
      isCt = true;
      metadataCt = await getMetadataContract(address);
    } else {
      isCt = false;
    }
    this.setState({
      isContractAddress: isCt,
      addresDetail: accountInfo.data || {},
      metadata: metadataCt.data || {},
      // activeKey: isCt ? '2' : '1',
    });
  }

  async loadTxHistory() {
    const { address } = this.state;
    const resp = await getTxHistoryByAddress(address);

    if (resp.status === 200 && resp.data) {
      const { data } = resp;
      data.forEach(x => {
        x.from = x.tx.from || x.tags['tx.from'];
        x.fromText = x.from;
        x.to = x.tx.to || x.tags['tx.to'];
        x.toText = x.to;
        x.payer = x.tx.payer || x.tags['tx.payer'];
        x.payerText = x.payer;
        x.tx.data = x.tx.data ? tryParseJson(x.tx.data) || {} : {};

        x.status = x.tx_result.code ? 'Error' : 'Success';
        x.inOut = x.to === address ? 'In' : 'Out';
        x.shash = x.hash;
        x.blockHeight = +x.height;
        x.value = x.tx.value || 0;
        x.valueText = toTEA(x.value).toLocaleString() + ' TEA';

        x.txType = x.tx.data.op;
      });
      const sorted = data.sort((a, b) => {
        const delta = b.blockHeight - a.blockHeight;
        if (delta) return delta;
        return b.index - a.index;
      });
      this.setState({ txHistory: sorted });
    }
  }

  tabOnChange = value => {
    this.setState({ activeKey: value });
  };

  render() {
    const { show_call, params_url, isContractAddress, addresDetail, metadata, activeKey, txHistory } = this.state;
    const address = this.props.match.params.address;

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
            <HeaderMap
              value={[
                { path: '/', text: 'Home' },
                { path: '/contracts', text: 'Contracts' },
                { path: `/address/${address}`, text: isContractAddress ? 'Contract Info' : 'Address Info' },
              ]}
            />
          </div>
        </div>
        <div className="block_content page_info_content">
          <div className="info_body contract-content ">
            <Tabs
              destroyInactiveTabPane
              renderTabBar={() => <ScrollableInkTabBar />}
              renderTabContent={() => <TabContent />}
              activeKey={activeKey}
              onChange={this.tabOnChange}
            >
              <TabPane tab="Details" key="1" placeholder="loading details">
                <DetailContract
                  address={address}
                  addresDetail={addresDetail}
                  metadata={metadata}
                  isContractAddress={isContractAddress}
                  txHistory={txHistory}
                />
              </TabPane>
              {isContractAddress && (
                <TabPane tab="Call Contract" key="2" placeholder="loading call">
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

export default ContractInfo;
