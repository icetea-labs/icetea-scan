import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SearchBox.scss';
import clear from '../../../assets/img/clear-icon.png'

import * as findAsset from '../../../service/find-assets';
import { checkScroll } from '../../../assets/js/hover';

class SearchBox extends Component {

  constructor() {
    super();
    this.state = {
      value: "",
      isBlock: false,
      isTxs: false,
      isAddress: false,
      isSearching: false,
      result_blocks: [],
      result_txs: [],
      all_data: [],
      show_cb: true,
      hidden_searh: true,
      show_clear: false,
    }

    this.blocks_data = [];
    this.txs_data = [];
  }

  handleValue = (e) => {
    this.setState({
      value: e.target.value,
      show_clear: true,
    });

    if (e.target.value === ''){
      this.setState({
        show_clear: false
      })
    }

    if (e.target.value !== '') {
      this.setState({
        isSearching: true
      })
    } else {
      this.setState({
        isSearching: false
      })
    }

    this.findAsset(e.target.value);
  }

  async findAsset(value) {
    setTimeout(
      this.setState({
        result_blocks: await findAsset.findBlocks(value),
        result_txs: await findAsset.findTxs(value)
      })
      , 100);

    this.blocks_data = this.state.result_blocks.map((item, index) => {
      let cut_hash = '';
      let hash = item.block_meta.block_id.hash;

      for (let i = 0; i < 30; i++) {
        cut_hash += hash[i]
      }
      return (
        <div className="result" key={index} >
          <Link to={`/block/${item.block_meta.header.height}`}>
            <div className="img">
              <i className='fa fa-photo'></i>
            </div>
            <div className="info">
              <div id="block"><span>Block: </span>{item.block_meta.header.height}</div>
              <span id="hash">hash: {cut_hash}...</span>
            </div>
          </Link>
        </div >)
    })

    this.txs_data = this.state.result_txs.map((item, index) => {
      let cut_hash = '';
      for (let i = 0; i < 30; i++) {
        cut_hash += item.hash[i];
      }
      return (
        <div className="result" key={index} >
          <Link to={`/tx/${item.hash}`}>
            <div className="img">
              <i className='fa fa-photo'></i>
            </div>
            <div className="info">
              <div >transaction in block: {item.height}</div>
              <div>index: {item.index}</div>
              <span id="hash">hash:</span>
              <span >{cut_hash}...</span>
            </div>
          </Link>
        </div>)
    })
  }

  componentDidMount() {
    if (this.props.show_cb === 'header' && window.location.pathname === '/') {
      this.setState({
        show_cb: false
      })

      setInterval(() => {
        if (this.props.show_cb === 'header') {
          this.setState({
            show_cb: !checkScroll(window.innerHeight / 5)
          })
        }
      }, 100);
    }
  }

  clearValue = () => {
    this.setState({
      value: '',
      show_clear: false
    });

    this.blocks_data = [];
    this.txs_data = [];
  }

  render() {
    return (
      <div className="search-box_out-side" style={{ display: this.state.show_cb === true ? 'block' : 'none' }}>
        <div className="search-icon phone"><i className="fa fa-search"></i> </div>
        <div className="search_box_container nf" >
          <input className="search_input" type="text" placeholder="Search by block, transaction, asset, address or orderid" value={this.state.value} onChange={this.handleValue} />
          <div className="delete-value">
            <button className='btn-clear' onClick={this.clearValue} style={{ display: this.state.show_clear === true ? 'block' : 'none' }}>
              <img src={clear} alt='clear' />
            </button>
          </div>
          <button className="btn_search" onClick={this.findAsset}>
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="search-result" style={{ display: this.state.isSearching ? 'block' : 'none' }} >
          {this.blocks_data}
          {this.txs_data}
        </div>
      </div >
    );
  }
}

export default SearchBox;