import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import diffTime from "../../../../service/blockchain/find-time-return";
import "./BlocksBox.scss";

// get data block
const mapStateToProps = (state) => {
  return {
    allBlocks: state.handleRealtimeData.blocks
  };
};

class BlocksBox extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.listDiffTime = [];
    this.listType = [];
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.allBlocks !== null) {
      for (let i = 0; i < this.props.allBlocks.length; i++) {
        let item = this.props.allBlocks[i];
        let time = await diffTime(item.header.height);
        this.listDiffTime.push(time);
      }

      this.loadBlocksData();
    }
  }

  loadBlocksData = () => {
    this._isMounted = true;
    this.list_blocks = this.props.allBlocks.map((item, index) => {
      let diffTime = this.listDiffTime[index]
      return (
        <div className="row_blocks" key={index}>
          <div className="title flex">
            <div className="block_count">
              Blocks
              <Link to={`/block/${item.header.height}`}>
                {item.header.height}
              </Link>
            </div>
            <div className="seconds_time">{diffTime}</div>
          </div>
          <div className="includes">
            <div className="in_detail">
              Includes
              <Link to={`/txs?block=${item.header.height}`}>
                {" "}
                {item.header.num_txs} Txns,{" "}
              </Link>
            </div>
            <div className="node">
              Node: <span>{item.header.chain_id}</span>
            </div>
          </div>
        </div>
      );
    });

    return this.list_blocks
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="blocks_box">
        <div className="header_top">
          <h3 className="title">
            <i className="fa fa-cube"></i>
            Blocks
          </h3>
          <Link className="view-all" to="/blocks/">
            View All >>
          </Link>
        </div>
        <div className="box_wrap">{this.loadBlocksData()}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BlocksBox);
