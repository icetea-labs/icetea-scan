import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class BlocksBox extends Component {

  loadBlocksData = () => {
    return(
      this.props.allBlocks && this.props.allBlocks.map((item, index) => {
        return(
          <div className="row_blocks" key={index}>
            <div className="title flex">
              <div className="block_count">
                Blocks
                <Link to={`/block/${item.header.height}`}>{item.header.height}</Link>
              </div>
              <div className="seconds_time">1 sec ago</div>
            </div>
            <div className="includes flex">
              <div className="in_detail">
                Includes
                <Link to="/txs?block="> {item.header.num_txs} Txns, </Link>
                <span>Fees <i>0</i> BNB </span>
              </div>
              <div className="node">
                Node: <span>Scafell</span>
              </div>
            </div>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <div className="blocks_box">
        <div className="header_top">
          <h3 className="title"><i className="fa fa-cube"></i>Blocks</h3>
          <Link to="/blocks/">View All →</Link>
        </div>

        <div className="box_wrap">
          { this.loadBlocksData() }
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return{
    allBlocks: state.Blocks
  }
}

export default connect(mapStateToProps)(BlocksBox);