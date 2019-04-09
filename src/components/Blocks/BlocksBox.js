import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

class BlocksBox extends Component {

  loadBlocksData = () => {
    return(
      this.props.allBlocks && this.props.allBlocks.map((item, index) => {
        // diffTime
        let currentTime  = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        let blockTime = moment(item.header.time).format("DD/MM/YYYY HH:mm:ss");
        const ms = moment(currentTime,"DD/MM/YYYY HH:mm:ss").diff(moment(blockTime,"DD/MM/YYYY HH:mm:ss"));
        const d = moment.duration(ms);

        var diffTime = null;
        if(d.days() > 0){
          diffTime = ` ${d.days()} days ${d.hours()} hr ago `;
        }else if(d.hours() > 0){
          diffTime = ` ${d.hours()} hr ${d.minutes()} mins ago `;
        }else if(d.minutes() > 0){
          diffTime = ` ${d.minutes()} mins ${d.seconds()} secs ago `;
        }else{
          diffTime = ` ${d.seconds()} secs ago `;
        };
        
        return(
          <div className="row_blocks" key={index}>
            <div className="title flex">
              <div className="block_count">
                Blocks
                <Link to={`/block/${item.header.height}`}>{item.header.height}</Link>
              </div>
              <div className="seconds_time">{diffTime}</div>
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