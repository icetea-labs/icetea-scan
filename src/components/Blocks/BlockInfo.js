import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { getDataBlock } from '../../service/get-single-data';
import diffTime from '../../service/find-time-by-block';

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
      height: '',
      diff_time: ''
    }
  }

  async componentDidMount() {
    this.loadData();
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      window.location.reload();
      this.loadData();
    }
  }

  async loadData() {
    let height = this.props.match.params.blockId;
    let response = await getDataBlock(height);
    let parrent_response = await getDataBlock(height - 1);
    let diff_time  = await diffTime(height);

    if (response.code === 200) {
      this.setState({
        blockInfo: response.data,
        hash_id: response.data.block_id.hash,
        num_txs: response.data.header.num_txs,
        node: response.data.header.chain_id,
        time: response.data.header.time,
        height: response.data.header.height,
        diff_time
      });
    } else {
      this.props.history.push('/not-found');
    }

    if (parrent_response.code === 200) {
      this.setState({
        parrent_hash: parrent_response.data.block_id.hash
      })
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
            <span className="id_code">#{this.state.height}</span>
              </div>
              <div className="breadcrumb">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/blocks">Blocks</Link></li>
                  <li><Link to="/block/1">Block</Link></li>
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
                  <div className="text_wrap"> {this.state.diff_time}
                    {'[ ' + moment(this.state.time).format("MMMM-DD-YYYY h:mm:ss") + ' ]'}
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Transactions:</span>
                  <div className="text_wrap">
                    {this.state.num_txs > 0 ? <Link to={`/txs?block=${this.state.height}`}>{this.state.num_txs}</Link> : 0}  Transactions in this block
              </div>
                </div>
                <div className="row_detail">
                  <span className="label">BlockHash:</span>
                  <div className="text_wrap">{this.state.hash_id}</div>
                </div>
                <div className="row_detail">
                  <span className="label">ParentHash:</span>
                  <div className="text_wrap">{(this.state.blockInfo && this.state.num_txs > 0) ? <Link to={`/block/${this.state.height - 1}`}>{this.state.parrent_hash}</Link> : '--'}</div>
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

export default BlockInfo;