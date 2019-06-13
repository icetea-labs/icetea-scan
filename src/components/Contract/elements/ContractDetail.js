import React, { Component } from 'react';
import { getAccountInfo, getMetadataContract } from '../../../service/get-single-data';
// import tweb3 from '../../tweb3';

class Contract extends Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            has_src: false,
            deploy_by: null,
            mode: null,
            metadata: null,
            show_call: false,
        }
    }

    componentWillMount() {
        let address = this.props.address;
        this.loadData(address);
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            window.location.reload();
            this.loadData();
        }
    }

    async loadData() {
        let address = this.props.address;
        let response = await getAccountInfo(address);
        let res_metadata = await getMetadataContract(address);

        if (response.code !== 200) {
            this.props.history.push('/not-found');
        } else {

            let mode = response.data.mode;
            this.setState({
                balance: response.data.balance,
                deploy_by: response.data.deployedBy,
                has_src: response.data.hasSrc,
                mode: mode === undefined ? 'null' : mode
            })
        }

        if (res_metadata.code === 200) {
            this.setState({
                metadata: res_metadata.data
            })
        }
    }

    render() {
        return (
            <div className='tab-contract'>
                <div className="row_detail">
                    <span className="label">Balance:</span>
                    <div className="text_wrap">{JSON.stringify(this.state.balance, null, 2)}</div>
                </div>
                <div className="row_detail">
                    <span className="label">Has Src:</span>
                    <div className="text_wrap">{JSON.stringify(this.state.has_src, null, 2)}</div>
                </div>
                <div className="row_detail">
                    <span className="label">Mode:</span>
                    <div className="text_wrap">{JSON.stringify(this.state.mode, null, 2)}</div>
                </div>
                <div className="row_detail">
                    <span className="label">Metadata:</span>
                    <div className="text_wrap">
                        <pre className='result_string'>
                            {JSON.stringify(this.state.metadata, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contract;