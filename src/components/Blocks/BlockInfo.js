import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
// import { getDataBlock } from '../../service/get-single-data';
// import diffTime from "../../service/blockchain/find-time-return";
import { diffTime } from '../../utils';
import { _get } from '../../service/api/base-api';
import { singleBlock } from '../../service/api/list-api';

class BlockInfo extends Component {
  constructor() {
    super();
    this.state = {
      height: 1,
      parentHeight: 0,
      time: '',
      num_txs: 0,
      blockInfo: null,
      blockHash: '',
      parentHash: '',
      node: '',
      diff_time: '',
    };
  }

  componentDidMount() {
    const height = this.props.match.params.blockId;
    this.loadData(height);
  }

  async loadData(height) {
    const response = await _get(null, singleBlock + '/' + height);
    if (response.status === 200) {
      const { data } = response;
      const blockInfo = data[0];
      blockInfo &&
        this.setState({
          height: blockInfo.height,
          blockInfo: blockInfo,
          blockHash: blockInfo.hash,
          num_txs: blockInfo.num_txs,
          node: blockInfo.chain_id,
          time: blockInfo.time,
          diff_time: diffTime(blockInfo.time),
        });
    } else {
      this.props.history.push('/not-found');
    }

    let parentHeight = 1;
    if (height - 2 > 0) {
      parentHeight = height - 2;
    }
    const resp = await _get(null, singleBlock + '/' + parentHeight);

    if (resp.status === 200) {
      const { data } = resp;
      const parentBlockInfo = data[0];
      parentBlockInfo &&
        this.setState({
          parentHash: parentBlockInfo.hash,
          parentHeight: parentHeight,
        });
    } else {
      this.setState({
        parentHash: 'N/A',
      });
    }
  }

  render() {
    const { height, parentHeight, time, diff_time, num_txs, blockHash, parentHash, node } = this.state;

    return (
      <div className="detailBlocks">
        <div className="flex-wrap">
          <div className="flexBox">
            <h3>Block</h3>
            <span className="id_status">#{height}</span>
          </div>
          <div className="breadcrumb">
            <span className="breadcrumb-item">
              <Link to="/">Home</Link>
            </span>
            <div className="breadcrumb-separator">/</div>
            <span className="breadcrumb-item">
              <Link to="/blocks">Blocks</Link>
            </span>
            <div className="breadcrumb-separator">/</div>
            <span className="breadcrumb-item">
              <Link to={`/block/${height}`}>Block</Link>
            </span>
          </div>
        </div>

        <div className="block_content page_info_content">
          <div className="title">
            <i className="fa fa-cubes" />
            <span>Block Information</span>
          </div>
          <div className="info_body">
            <div className="row_detail">
              <span className="label">TimeStamp: </span>
              <div className="text_wrap">
                {diff_time}
                {' [ ' + moment(time).format('MMMM-DD-YYYY h:mm:ss') + ' ]'}
              </div>
            </div>
            <div className="row_detail">
              <span className="label">Transactions:</span>
              <div className="text_wrap">
                {num_txs === 0 ? '0' : <Link to={`/txs?height=${height}`}>{num_txs}</Link>}
                <span> Transactions in this block</span>
              </div>
            </div>
            <div className="row_detail">
              <span className="label">BlockHash:</span>
              <div className="text_wrap">{blockHash}</div>
            </div>
            <div className="row_detail">
              <span className="label">ParentHash:</span>
              <div className="text_wrap">
                <Link to={`/block/${parentHeight}`} onClick={() => this.loadData(parentHeight)}>
                  {parentHash}
                </Link>
              </div>
            </div>
            <div className="row_detail">
              <span className="label">Node:</span>
              <div className="text_wrap transaction_type">{node}</div>
            </div>
            <div className="row_detail">
              <span className="label">RewardedTo / Fee:</span>
              <div className="text_wrap">--</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlockInfo;
