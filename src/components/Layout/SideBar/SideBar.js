import React, { Component } from 'react';
import './SideBar.scss';

class SideBar extends Component {

    constructor() {
        super();
        this.state = {
            show_sibar: false
        }
    }

    hiddenSibar = () => {
        this.setState({
            show_sibar: false
        })
    }

    openBar = () => {
        this.setState({
            show_sibar: true
        })
    }

    render() {
        return (
            <div className="sidebar">
                <div className="background-sidebar" style={{ display: this.state.show_sibar === true ? 'block' : 'none' }}></div>
                <div className='menu-icon phone'>
                    <i className="fa fa-bars " onClick={this.openBar}></i>
                </div>
                <div className="side-bar_right" style={{ width: this.state.show_sibar === true ? '20pc' : '0pc' }}>
                    <div className="btn-close" >
                        <i className='fa fa-close' onClick={this.hiddenSibar} style={{ display: this.state.show_sibar === true ? 'block' : 'none' }}></i>
                    </div>
                    <div className="content-sidebar">
                        <ul>
                            <li><i className='fa fa-home'></i><a href='/'>Home</a></li>
                            <li><i className='fa fa-btc'></i><span>BlockChain</span></li>
                            <hr></hr>
                            <li><i className='fa fa-cubes'></i><a href='/blocks'>Blocks</a></li>
                            <li><i className='fa fa-list-alt'></i><a href='/txs'>Transactions</a></li>
                            <li><i className='fa fa-file'></i><a href='/contracts'>Contracts</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideBar;