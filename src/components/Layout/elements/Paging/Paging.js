import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Paging.scss';
import { getListBlockApi, getListTxApi } from '../../../../service/api/get-list-data';
import { getTransactions } from '../../../../service/blockchain/handle-data';

const mapStateToProps = (state, ownProps) => {
    return {
        limit_value: state.changePageState
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

class Paging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeCall: '',
            pageIndex: 1,
            pageLimit: 1,
        }
    }

    componentWillMount() {
        console.log(this.props)
        if (this.props.data === 'block') {
            let { pageLimit } = this.state;
            pageLimit = this.props.limit_value.pageBlockLimit;
            this.setState({ pageLimit })
        } else {

        }
    }

    async getBlocksByPageIndex(pageIndex) {

        if (pageIndex <= 0) {
            pageIndex = 1;
        }

        if (pageIndex >= this.props.pageState.pageBlockLimit) {
            pageIndex = this.props.pageState.pageBlockLimit
        }

        this.setState({
            pageIndex
        })

        // return handledata.getBlocks(maxheight, pageIndex, 20);
        getListBlockApi({ page_index: this.state.pageIndex, page_size: this.props.pageState.pageSize });
    }

    getTransaction(pageIndex) {

        if (pageIndex <= 1) {
          pageIndex = 1;
        }
    
        if (pageIndex >= this.props.pageState.pageTxsLimit) {
          pageIndex = this.props.pageState.pageTxsLimit;
        }
    
        this.setState({
          pageIndex
        });
    
        getListTxApi({ page_index: this.state.pageIndex, page_size: this.props.pageState.page_size })
      }

    getTxsByHeight() {
        getTransactions(
            null,
            null,
            this.state.height,
            this.props.pageState.total_blocks,
            this.props.pageState.total_txs
        );
    }

    _execFunction = () => {

    }

    render() {
        return (
            <div className="page-index">
                <div className="paging">
                    <button className="btn-common" onClick={() => { this._execFunction(1) }}>First</button>
                    <button className="btn-common" onClick={() => { this._execFunction(1) }} >
                        <i className="fa fa-caret-left"></i>
                    </button>
                    <div className="state">Page {this.state.pageIndex} of {this.state.pageLimit} </div>
                    <button className="btn-common" onClick={() => { this._execFunction(1) }}>
                        <i className="fa fa-caret-right"></i>
                    </button>
                    <button className="btn-common" onClick={() => { this._execFunction(1) }}>
                        Last
                </button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paging);
