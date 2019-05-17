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

    this.all_data = []
  }

  componentDidMount() {
    console.log(this.props)
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
      result_blocks: await findAsset.findBlocks(value, this.props.pageState.total_blocks)
    })

    this.all_data = this.state.result_blocks.map((item, index) => {

      return (
        <div className="result" key={index} >
          <div className="img">
            <i className='fa fa-photo'></i>
          </div>
          <div className="info">
            <span>block: <Link to={`/block/${item.block_meta.header.height}`}>{item.block_meta.header.height}</Link></span>
           
            <span>hash</span>
            <span>{item.block_meta.block_id.hash}</span>

          </div>
        </div>)
    })
  }


  // find by height or hash in all block;
  // this.setState({
  //   result_txs: await findAsset.findTxs(value)
  // })

  // for (let i = 8; i >= 0; i++) {
  //   this.all_data.push(<li>block + {i}</li>);
  // }

  // for(let i = 0 ;i < this.state.result_blocks.length ; i++) {
  //   if (this.state.result_blocks[i] !== null){
  //     this.state.all_data.push(<li>txs + {i}</li>);
  //   }
  // }

  render() {
    return (
      <div>
        <div className="search_box_container">
          <input className="search_input" type="text" placeholder="Search by block, transaction, asset, address or orderid" value={this.state.value} onChange={this.handleValue} />
          <button className="btn_search"><i className="fa fa-search"></i></button>
        </div>
        <div className="search-result" style={{ display: this.state.isSearching ? 'block' : 'none' }} >
          {this.all_data}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SearchBox);