import React, { PureComponent } from "react";
import { ContractMode } from "@iceteachain/common";
import { toTEA } from "../../../utils";

class Contract extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     addresDetail: {},
  //     balance: 0,
  //     has_src: false,
  //     deploy_by: null,
  //     mode: null,
  //     metadata: null,
  //     show_call: false
  //   };
  // }

  //   componentDidMount() {
  //     const { address } = this.props;
  //     // this.loadData(address);
  //   }

  //   async componentWillReceiveProps(nextProps) {
  //     // if (this.props !== nextProps) {
  //     //     window.location.reload();
  //     //     this.loadData();
  //     // }
  //   }

  //   static getDerivedStateFromProps(nextProps, prevState) {
  //     console.log(nextProps.addresDetail, "--", prevState.addresDetail);
  //     if (
  //       nextProps.addresDetail &&
  //       nextProps.addresDetail !== prevState.addresDetail
  //     ) {
  //       const info = nextProps.addresDetail.data;

  //       return { addresDetail: nextProps.addresDetail, balance: info.balance };
  //     } else {
  //       return null;
  //     }
  //   }

  //   async loadData(address) {
  //     console.log("loadData", address);
  //     let response = await getAccountInfo(address);
  //     if (response && response.data.deployedBy) {
  //       await getMetadataContract(address);
  //     }
  //     let res_metadata = await getMetadataContract(address);

  // console.log("response", response);
  // console.log("res_metadata", res_metadata);

  // if (response.status !== 200) {
  //   this.props.history.push("/not-found");
  // } else {
  //   let mode = response.data.mode;
  //   this.setState({
  //     balance: response.data.balance,
  //     deploy_by: response.data.deployedBy,
  //     has_src: response.data.hasSrc,
  //     mode: mode === undefined ? "null" : mode
  //   });
  // }

  // if (res_metadata.code === 200) {
  //   this.setState({
  //     metadata: res_metadata.data
  //   });
  // }
  //   }

  render() {
    const { addresDetail, metadata } = this.props;
    console.log(addresDetail);
    console.log(metadata);

    return (
      <div className="tab-contract">
        <div className="row_detail">
          <span className="label">Balance:</span>
          <div className="text_wrap">
            {`${toTEA(addresDetail.balance || 0)} TEA`}
          </div>
        </div>
        <div className="row_detail">
          <span className="label">Has Src:</span>
          <div className="text_wrap">{`${addresDetail.hasSrc}`}</div>
        </div>
        {addresDetail.hasSrc && (
          <React.Fragment>
            <div className="row_detail">
              <span className="label">Mode:</span>
              <div className="text_wrap">
                {addresDetail.mode === ContractMode.WASM
                  ? "WebAssembly"
                  : "JavaScript"}
              </div>
            </div>
            <div className="row_detail">
              <span className="label">Metadata:</span>
              <div className="text_wrap">
                <pre className="result_string">
                  {JSON.stringify(metadata, null, 2)}
                </pre>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Contract;
