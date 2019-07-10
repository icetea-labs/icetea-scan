import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import diffTime from "../../service/blockchain/find-time-return";
import "./BlocksBox.scss";

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
      list_blocks: [],
      cssIcon: "fa bi-spin fa-cubes"
    };
  }

  async componentWillReceiveProps() {
    const { cssIcon } = this.state;
    if (cssIcon.indexOf("bi-spin") === -1) {
      this.setState({ cssIcon: "fa bi-spin fa-cubes" });
    } else {
      this.setState({ cssIcon: "fa fa-cubes" });
    }

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
              <span>Blocks</span>
              <Link to={`/block/${item.header.height}`}>
                {item.header.height}
              </Link>
            </div>
            <div className="seconds_time">{this.state.list_time[index]}</div>
          </div>
          <div className="includes flex">
            <div className="in_detail">
              <span>Includes</span>
              <Link to={`/txs?block=${item.header.height}`}>
                <span> {item.header.num_txs} Txns</span>
              </Link>
            </div>
            <div className="node">
              <span>
                Node: <span>{item.header.chain_id}</span>
              </span>
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
    const { cssIcon } = this.state;

    return (
      <div className="blocks_box col-3">
        <div className="header_top">
          <div className="title">
            <i className={cssIcon} />
            <span>Blocks</span>
          </div>
          <Link to="/blocks/">View All →</Link>
        </div>
        <div className="box_wrap">{this.state.list_blocks}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BlocksBox);
