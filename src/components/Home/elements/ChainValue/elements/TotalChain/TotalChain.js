import React, { Component } from 'react';
import './TotalChain.scss';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAllContracts } from '../../../../../../service/blockchain/get-single-data';
import {Row, Col} from 'react-bootstrap';

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
            <Row className="total-chain">
                <Col sm={12} md={6} lg={12} className='properties'>
                    <span>Time of last block:</span>
                    <span className="info-stamp">&nbsp;{moment(this.state.time).format("DD/MM/YYYY HH:mm:ss")}</span>
                </Col>
                <Col sm={12} md={6} lg={12} className='properties'>
                    <span>Height Block:</span>
                    <span className="info-stamp">&nbsp;#{this.state.height}</span>
                </Col>
                <Col sm={12} md={6} lg={12} className='properties'>
                    <span>Total Transactions Counter:</span>
                    <span className="info-stamp">&nbsp;{this.state.total_txs}</span>
                </Col>
                <Col sm={12} md={6} lg={12} className='properties'>
                    <span>Total Contracts:</span>
                    <span className="info-stamp">&nbsp;{this.state.total_accounts}</span>
                </Col>
            </Row>
        );
    }
}

export default connect(mapStateToProps)(TotalChain);