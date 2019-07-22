import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { ContractMode, codec } from '@iceteachain/common';
import Select from 'rc-select';
import PaginationPro from '../../elements/PaginationPro';
import { toTEA } from '../../../utils';

class DetailContract extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 15,
      total: 0,
      baseTxHistory: [],
      txHistory: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { txHistory } = nextProps;
    if (txHistory !== prevState.baseTxHistory) {
      // console.log('txHistory', txHistory);
      return { baseTxHistory: txHistory };
    }
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.loadTxHistory();
  }

  componentDidUpdate(prevProp, prevState) {
    const { txHistory } = this.state;
    if (prevState.txHistory !== txHistory) {
      // this.loadTxHistory();
    }
  }

  renderTHead() {
    return (
      <tr>
        <th width="8%">Type</th>
        <th width="10%">Block</th>
        <th width="8%">Status</th>
        <th width="20%">From</th>
        <th width="6%"></th>
        <th width="20%">To</th>
        <th width="20%">Payer</th>
        <th width="8%">Value</th>
      </tr>
    );
  }

  renderTbody() {
    const { txHistory } = this.state;
    console.log('renderTbody', txHistory.length);
    if (txHistory.length === 0) {
      return (
        <tr className="no_data">
          <td colSpan="8">
            <span>No Data</span>
          </td>
        </tr>
      );
    } else {
      return txHistory.map((tx, index) => {
        return (
          <tr key={index}>
            <td>{tx.txType}</td>
            <td>
              <Link to={`/block/${tx.blockHeight}`} title={tx.blockHeight}>
                {tx.blockHeight}
              </Link>
            </td>
            <td>{tx.status}</td>
            <td className="text_overflow">
              {tx.to ? <Link to={`/address/${tx.from}`}>{tx.from}</Link> : <span>--</span>}
            </td>
            <td>{tx.inOut}</td>
            <td className="text_overflow">{tx.to ? <Link to={`/address/${tx.to}`}>{tx.to}</Link> : <span>--</span>}</td>
            <td className="text_overflow">
              {tx.to ? <Link to={`/address/${tx.payer}`}>{tx.payer}</Link> : <span>--</span>}
            </td>
            <td>{`${toTEA(tx.value)} TEA`}</td>
          </tr>
        );
      });
    }
  }

  async loadTxHistory() {
    const { current, pageSize, baseTxHistory } = this.state;

    const total = baseTxHistory.length;
    const from = (current - 1) * pageSize;
    let to = from + pageSize;
    if (to > total) to = total;
    let txHistoryTmp = [];

    if (baseTxHistory) {
      console.log('baseTxHistory', baseTxHistory);
      txHistoryTmp = baseTxHistory.filter((item, index) => {
        return index >= from && index < to;
      });
    }
    console.log('txHistoryTmp', txHistoryTmp);
    this.setState({ txHistory: txHistoryTmp });
  }

  paginationOnChange = current => {
    this.setState({ current }, () => {
      this.loadTxHistory();
    });
  };

  render() {
    const { current, pageSize, total } = this.state;
    const { addresDetail, metadata, isContractAddress, address } = this.props;
    return (
      <div className="tab-contract">
        <div className="row_detail">
          <span className="label">Category:</span>
          <div className="text_wrap">{codec.isBankAddress(address) ? 'BANK ACCOUNT' : 'REGULAR ACCOUNT'}</div>
        </div>
        <div className="row_detail">
          <span className="label">Balance:</span>
          <div className="text_wrap">{`${toTEA(addresDetail.balance || 0)} TEA`}</div>
        </div>
        <div className="row_detail">
          <span className="label">Is Contract:</span>
          <div className="text_wrap">{!!isContractAddress ? 'YES' : 'NO'}</div>
        </div>
        {addresDetail.hasSrc && (
          <React.Fragment>
            <div className="row_detail">
              <span className="label">Deployed By:</span>
              <div className="text_wrap">{`${addresDetail.deployedBy}`}</div>
            </div>
            <div className="row_detail">
              <span className="label">Language:</span>
              <div className="text_wrap">{addresDetail.mode === ContractMode.WASM ? 'WebAssembly' : 'JavaScript'}</div>
            </div>
            <div className="row_detail">
              <span className="label">Metadata:</span>
              <div className="text_wrap">
                <pre className="result_string language-js">{JSON.stringify(metadata, null, 2)}</pre>
              </div>
            </div>
          </React.Fragment>
        )}
        <div className="tx-history">
          <h3>Transacitons</h3>
          <div className="table_data">
            <table>
              <thead>{this.renderTHead()}</thead>
              <tbody>{this.renderTbody()}</tbody>
            </table>
          </div>
          <PaginationPro
            selectComponentClass={Select}
            showQuickJumper={false}
            showSizeChanger={false}
            defaultPageSize={pageSize}
            defaultCurrent={current}
            onChange={this.paginationOnChange}
            total={total}
          />
        </div>
      </div>
    );
  }
}

export default DetailContract;
