import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import diffTime from "../../../../service/blockchain/find-time-return";
import "./BlocksBox.scss";
import Animation from "../../../Layout/elements/Animation/Animation";
import Paging from "../../../Layout/elements/Paging/Paging";

// get data block
const mapStateToProps = state => {
  // console.log(state)
  return {
    allBlocks: state.getRealTimeData.blocks
  };
};

class BlocksBox extends Component {
  _isMounted = false;

  constructor() {
    super();

    this.state = {
      list_time: [],
      list_blocks: []
    };
  }

  async componentWillReceiveProps() {
    this.loadBlocksData();
  }

  async loadBlocksData() {
    this._isMounted = true;
    let list_time = [];
    for (let i = 0; i < this.props.allBlocks.length; i++) {
      let item = this.props.allBlocks[i];
      let time = await diffTime(item.header.height);
      list_time.push(time);
    }

    let list_blocks = this.props.allBlocks.map((item, index) => {
      // diffTime
      return (
        <div className="row_blocks" key={index}>
          <div className="title flex">
            <div className="block_count">
              Blocks
              <Link to={`/block/${item.header.height}`}>
                {item.header.height}
              </Link>
            </div>
            <div className="seconds_time">{this.state.list_time[index]}</div>
          </div>
          <div className="includes flex">
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

    if (this._isMounted) {
      this.setState({
        list_time,
        list_blocks
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="blocks_box">
        <div className="header_top">
          <h3 className="title">
            <Animation />
            Blocks
          </h3>
          <Link className="view-all" to="/blocks/">
            View All >>
          </Link>
        </div>
        <div className="box_wrap">{this.state.list_blocks}</div>
        <Paging api='blocks' />
      </div>
    );
  }
}

export default connect(mapStateToProps)(BlocksBox);
