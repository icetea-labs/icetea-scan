import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { connect } from 'react-redux';
import tweb3 from '../../tweb3';

const mapStateToProps = (state) => {
  return {
    data: state
  }
}

class BlockInfo extends Component {

  constructor() {
    super();
    this.state = {
      blockInfo: null,
      hash_id: '',
      time: '',
      num_txs: 0,
      node: '',
      parrent_hash: '',
      parrent_height: 0,
    }
  }

  async componentWillReceiveProps(nextProps) {

    if (this.props !== nextProps) {
      let height = this.props.match.params.blockId;

      const response = await tweb3.getBlock({ height });
      const response1 = await tweb3.getBlock({ height: height - 1 });
      // console.log(response, response1);

      // console.log(height);

      if (response !== null) {
        this.setState({
          blockInfo: response.block_meta,
          hash_id: response.block_meta.block_id.hash,
          num_txs: response.block_meta.header.total_txs,
          node: response.block_meta.header.chain_id,
          parrent_hash: response1.block_meta.block_id.hash,
          parrent_height: height - 1,
          time: response.block_meta.header.time
        });
      }
    }
  }

  render() {
    return (
      <Layout>
        <div className="block_info mt_50">
          <div className="container">
            <div className="block_info_header page_info_header">
              <div className="wrap">
                Block
            <span className="id_code">#{}</span>
              </div>
              <div className="breadcrumb">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/">Blocks</Link></li>
                  <li><Link to="/">Block</Link></li>
                </ul>
              </div>
            </div>

            <div className="block_content page_info_content">
              <div className="title">
                <i className="fa fa-cube"></i>
                <span>Block Information</span>
              </div>
              <div className="info_body">
                <div className="row_detail">
                  <span className="label">TimeStamp: </span>
                  <div className="text_wrap">
                    {'[ ' + moment(this.state.time).format("MMMM-DD-YYYY h:mm:ss") + ' ]'}
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Transactions:</span>
                  <div className="text_wrap">
                    {(this.state.blockInfo && this.state.num_txs > 0) ? <Link to="">{this.num_txs}</Link> : 0} Transactions in this block
              </div>
                </div>
                <div className="row_detail">
                  <span className="label">BlockHash:</span>
                  <div className="text_wrap">{this.state.hash_id}</div>
                </div>
                <div className="row_detail">
                  <span className="label">ParentHash:</span>
                  <div className="text_wrap">{(this.state.blockInfo && this.state.num_txs > 0) ? <Link to={`/block/${this.state.parrent_height}`} >{this.state.parrent_hash}</Link> : '--'}</div>
                </div>
                <div className="row_detail">
                  <span className="label">Node:</span>
                  <div className="text_wrap transaction_type">{this.state.node}</div>
                </div>
                <div className="row_detail">
                  <span className="label">Calculation Time:</span>
                  <div className="text_wrap">in 412 ms</div>
                </div>
                <div className="row_detail">
                  <span className="label">RewardedTo / Fee:</span>
                  <div className="text_wrap">--</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(BlockInfo);