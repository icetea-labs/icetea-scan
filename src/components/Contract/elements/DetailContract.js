import React from 'react';
import { ContractMode } from '@iceteachain/common';
import { toTEA } from '../../../utils';

function DetailContract(props) {
  const { addresDetail, metadata } = props;
  return (
    <div className="tab-contract">
      <div className="row_detail">
        <span className="label">Balance:</span>
        <div className="text_wrap">{`${toTEA(addresDetail.balance || 0)} TEA`}</div>
      </div>
      <div className="row_detail">
        <span className="label">Has Src:</span>
        <div className="text_wrap">{`${addresDetail.hasSrc}`}</div>
      </div>
      {addresDetail.hasSrc && (
        <React.Fragment>
          <div className="row_detail">
            <span className="label">Mode:</span>
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

export default DetailContract;
