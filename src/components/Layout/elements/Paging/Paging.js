import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Paging.scss';

const mapStateToProps = (state, ownProps) => {
    return {

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

    _execFunction = () => {

    }

    render() {
        return (
            <div className="page-index">
                <div className="paging">
                    <button className="btn-common" onClick={() => { this._execFunction(1) }}>First</button>
                    <button className="btn-common" onClick={() => { this._execFunction(1) }} >
                        <i className="fas fa-arrow-left    "></i>
                    </button>
                    <div className="state">Page {this.state.pageIndex} of {this.state.pageLimit} </div>
                    <button className="btn-common" onClick={() => { this._execFunction(1) }}>
                        <i className="fas fa-arrow-right    "></i>
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
