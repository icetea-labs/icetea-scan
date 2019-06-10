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

    _isMounted = false;

    constructor() {
        super();
        this.state = {
            data: null,
            time: null,
            height: 100000,
            total_txs: 100000,
            total_accounts: 10000,
        }

        this.time = null;
    }

    async componentWillReceiveProps() {
        this._isMounted = true;

        let res = await getAllContracts();
        let total_accounts;

        if (res.code === 200) {
            total_accounts = res.data.length;
        }
        if (this.props.blocks.length !== 0 && this._isMounted) {
            this.setState({
                time: this.props.blocks[0].header.time,
                height: this.props.blocks[0].header.height,
                total_txs: this.props.blocks[0].header.total_txs,
                total_accounts
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="total-chain">
                <div className='properties'>
                    <span>Time of last block:</span>
                    <span className="info-stamp">{moment(this.state.time).format("DD/MM/YYYY HH:mm:ss")}</span>
                </div>
                <div className='properties'>
                    <span>Height Block:</span>
                    <span className="info-stamp"># {this.state.height}</span>
                </div>
                <div className='properties'>
                    <span>Total Transactions Counter:</span>
                    <span className="info-stamp">{this.state.total_txs}</span>
                </div>
                <div className='properties'>
                    <span>Total Contracts:</span>
                    <span className="info-stamp">{this.state.total_accounts}</span>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(TotalChain);