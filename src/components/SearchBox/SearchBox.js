import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SearchBox.scss';

import * as findAsset from '../../service/find-assets';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { pageState: state.changePageState }
}

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
    }

    this.blocks_data = [];
    this.txs_data = [];
  }

  componentDidMount() {
    // console.log(this.props)
  }

  handleValue = (e) => {
    this.setState({
      value: e.target.value,
    });

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
    // find by height or hash of txs

    setTimeout(
      this.setState({
        result_blocks: await findAsset.findBlocks(value, this.props.pageState.total_blocks),
        result_txs: await findAsset.findTxs(value, this.props.pageState.pageTxsLimit)
      })
      , 200);

    this.blocks_data = this.state.result_blocks.map((item, index) => {
      return (
        <div className="result" key={index} >
          <Link to={`/block/${item.block_meta.header.height}`}>
            <div className="img">
              <i className='fa fa-photo'></i>
            </div>
            <div className="info">
              <div id="block">block: {item.block_meta.header.height}</div>
            <span id="hash">hash:</span>
            <span>{item.block_meta.block_id.hash}</span>
          </div>
          </Link>
        </div >)
  })

    this.txs_data = this.state.result_txs.map((item, index) => {
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
            <span >{item.hash}</span>
          </div>
        </Link>
      </div>)
  })
  }

render() {
  return (
    <div className="search_box_container">
      <input className="search_input" type="text" placeholder="Search by block, transaction, asset, address or orderid" value={this.state.value} onChange={this.handleValue} />
      <button className="btn_search"><i className="fa fa-search"></i></button>
      <div className="search-result" style={{ display: this.state.isSearching ? 'block' : 'none' }} >
        {this.blocks_data}
        {this.txs_data}
      </div>
    </div>
  );
}
}

export default connect(mapStateToProps)(SearchBox);