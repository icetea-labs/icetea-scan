import React, { PureComponent } from 'react';
import { ContractMode, codec } from '@iceteachain/common';
import { toTEA } from '../../../utils';

class DetailContract extends PureComponent {
  render() {
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
      </div>
    );
  }
}

export default DetailContract;
