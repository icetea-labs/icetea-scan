import React, { Component } from 'react';
import './TotalChain.scss';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAllContracts } from '../../../service/get-single-data';

const mapStateToProps = (state) => {
    return {
        blocks: state.getRealTimeData.blocks,
    }
}

class TotalChain extends Component {

    constructor() {
        super();
        this.state = {
            data: null,
            time: null,
            height: null,
            total_txs: null,
            total_accounts: null,
        }

        this.time = null;
    }

    async componentWillReceiveProps() {

        let res = await getAllContracts();
        let total_accounts;
        
        if (res.code === 200){
            total_accounts = res.data.length;
        }
        if (this.props.blocks.length !== 0) {
            this.setState({
                time: this.props.blocks[0].header.time,
                height: this.props.blocks[0].header.height,
                total_txs: this.props.blocks[0].header.total_txs,
                total_accounts 
            })
        }
    }

    render() {
        return (
            <div className="total-chain">
                <ul>
                    <li>
                        <p className="info-stamp">{moment(this.state.time).format("DD/MM/YYYY HH:mm:ss")}</p>
                        <p>Time of last block</p>
                    </li>
                    <li>
                        <p className="info-stamp"># {this.state.height}</p>
                        <p>Height Block</p>
                    </li>
                    <li>
                        <p className="info-stamp">{this.state.total_txs}</p>
                        <p>Total Transactions Counter</p>
                    </li>
                    <li>
                        <p className="info-stamp">{this.state.total_accounts}</p>
                        <p>Total Accounts</p>
                    </li>
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(TotalChain);