import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import { connect } from 'react-redux';

const mapDispatchToProps = (state) => {
  return {
    blocks: state.Blocks
  }
}


class BlockInfo extends Component {

  blockInfo = () => {
    const blockId = this.props.match.params.blockId;
    const blockInfo = this.props.blocks.length > 0 && this.props.blocks.find(bid => bid.header.height === blockId);
    if (blockInfo) {
      // diffTime
      let currentTime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
      let blockTime = moment(blockInfo.header.time).format("DD/MM/YYYY HH:mm:ss");
      const ms = moment(currentTime, "DD/MM/YYYY HH:mm:ss").diff(moment(blockTime, "DD/MM/YYYY HH:mm:ss"));
      const d = moment.duration(ms);

      var diffTime = null;
      if (d.days() > 0) {
        diffTime = ` ${d.days()} days ${d.hours()} hours ago `;
      } else if (d.hours() > 0) {
        diffTime = ` ${d.hours()} hours ${d.minutes()} mins ago `;
      } else if (d.minutes() > 0) {
        diffTime = ` ${d.minutes()} mins ${d.seconds()} secs ago `;
      } else {
        diffTime = ` ${d.seconds()} secs ago `;
      };

      return (
        <div className="block_info mt_50">
          <div className="container">
            <div className="block_info_header page_info_header">
              <div className="wrap">
                Block
                <span className="id_code">#{blockInfo.header.height}</span>
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
                    {diffTime + '[ ' + moment(blockInfo.header.time).format("MMMM-DD-YYYY h:mm:ss") + ' ]'}
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">Transactions:</span>
                  <div className="text_wrap">
                    {(blockInfo && blockInfo.header.num_txs > 0) ? <Link to="">{blockInfo.header.num_txs}</Link> : 0} Transactions in this block
                  </div>
                </div>
                <div className="row_detail">
                  <span className="label">BlockHash:</span>
                  <div className="text_wrap">{blockInfo.block_id.hash}</div>
                </div>
                <div className="row_detail">
                  <span className="label">ParentHash:</span>
                  <div className="text_wrap">--</div>
                </div>
                <div className="row_detail">
                  <span className="label">Node:</span>
                  <div className="text_wrap transaction_type">--</div>
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
      )
    }
  }

  render() {
    return (
      <Layout>
        {this.blockInfo()}
      </Layout>
    );
  }
}

export default connect(mapDispatchToProps)(BlockInfo);