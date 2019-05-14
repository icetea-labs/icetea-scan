import React, { Component } from 'react';
import './SearchBox.scss';

import * as findAsset from '../service/find-assets';

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
    this.setState({
      result_blocks: await findAsset.findBlocks(value)
    });
    // find by height or hash in all block;
    this.setState({
      result_txs: await findAsset.findTxs(value)
    })


    for (let i = this.state.result_blocks.length; i >=0 ;i++) {
      if (this.state.result_blocks[i] !== null){
        this.state.all_data.push(<li>block + {i}</li>)
      }
    }

    for(let i = 0 ;i < this.state.result_blocks.length ; i++) {
      if (this.state.result_blocks[i] !== null){
        this.state.all_data.push(<li>txs + {i}</li>)
      }
    }
  }



  render() {
    return (
      <div>
        <div className="search_box_container">
          <input className="search_input" type="text" placeholder="Search by block, transaction, asset, address or orderid" value={this.state.value} onChange={this.handleValue} />
          <button className="btn_search"><i className="fa fa-search"></i></button>
        </div>
        <div className="search-result" style={{ display: this.state.isSearching ? 'block' : 'none' }} >
          <ul>
            {this.state.all_data}
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchBox;