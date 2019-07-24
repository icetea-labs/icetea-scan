import React, { PureComponent } from 'react';
import { codec } from '@iceteachain/common';
import Select from 'rc-select';
import PaginationPro from '../../elements/PaginationPro';
import { Balance, Language, Address, Block, TxType, TxStatus, TxTypeTranfer } from '../../elements/Common';

class DetailContract extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      total: 0,
      baseTxHistory: [],
      txOnPage: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { txHistory } = nextProps;
    if (txHistory !== prevState.baseTxHistory) {
      return { baseTxHistory: txHistory, txOnPage: txHistory };
    }
    return null;
  }

  componentDidMount() {
    this.loadTxHistory();
  }

  componentDidUpdate(prevProp, prevState) {
    const { txOnPage } = this.state;
    if (JSON.stringify(prevState.txOnPage) !== JSON.stringify(txOnPage)) {
      this.loadTxHistory();
    }
  }

  renderTHead() {
    return (
      <tr>
        <th width="10%">Block</th>
        <th width="8%">Status</th>
        <th width="20%">From</th>
        <th width="8%">Type</th>
        <th width="6%" />
        <th width="20%">To</th>
        <th width="20%">Payer</th>
        <th width="8%">Value</th>
      </tr>
    );
  }

  renderTbody() {
    const { txOnPage } = this.state;
    // console.log('renderTbody', txOnPage.length);
    if (txOnPage.length === 0) {
      return (
        <tr className="no_data">
          <td colSpan="8">
            <span>No Data</span>
          </td>
        </tr>
      );
    } else {
      return txOnPage.map((tx, index) => {
        return (
          <tr key={index}>
            <td>
              <Block value={tx.blockHeight} />
            </td>
            <td>
              <TxStatus value={tx.txStatus} />
            </td>
            <td className="text_overflow">
              <Address value={tx.from} />
            </td>
            <td>
              <TxType value={tx.txType} />
            </td>
            <td>
              <TxTypeTranfer value={tx.inOut} txType={tx.txType} />
            </td>
            <td className="text_overflow">
              <Address value={tx.to} />
            </td>
            <td className="text_overflow">
              <Address value={tx.payer} />
            </td>
            <td>
              <Balance value={tx.value} />
            </td>
          </tr>
        );
      });
    }
  }

  loadTxHistory() {
    const { current, pageSize, baseTxHistory } = this.state;

    const total = baseTxHistory.length;
    const from = (current - 1) * pageSize;
    let to = from + pageSize;
    if (to > total) to = total;
    let txHistoryTmp = [];

    if (baseTxHistory) {
      txHistoryTmp = baseTxHistory.filter((item, index) => {
        return index >= from && index < to;
      });
    }

    this.setState({ txOnPage: txHistoryTmp, total });
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
          <div className="text_wrap">
            <Balance value={addresDetail.balance} />
          </div>
        </div>
        <div className="row_detail">
          <span className="label">Is Contract:</span>
          <div className="text_wrap">{!!isContractAddress ? 'Yes' : 'No'}</div>
        </div>
        {addresDetail.hasSrc && (
          <React.Fragment>
            <div className="row_detail">
              <span className="label">Deployed By:</span>
              <div className="text_wrap">
                <Address value={addresDetail.deployedBy} />
              </div>
            </div>
            <div className="row_detail">
              <span className="label">Language:</span>
              <div className="text_wrap">
                <Language value={addresDetail.mode} address={address} isContractAddress={isContractAddress} />
              </div>
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
