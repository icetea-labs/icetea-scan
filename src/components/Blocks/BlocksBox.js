import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';


// get data block
const mapStateToProps = (state) => {
  // console.log(state)
  return{
    allBlocks: state.getRealTimeData.blocks
  }
}

class BlocksBox extends Component {

  constructor(){
    super();
    this.currentTime = null;
    this.diffTime = null;
    this.blockTime = null;
    this.ms = null;
    this.d = null;
  }

  loadBlocksData = () => {
    return(
      this.props.allBlocks && this.props.allBlocks.map((item, index) => {
        // diffTime
        this.currentTime  = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        this.blockTime = moment(item.header.time).format("DD/MM/YYYY HH:mm:ss");
        this.ms = moment(this.currentTime,"DD/MM/YYYY HH:mm:ss").diff(moment(this.blockTime,"DD/MM/YYYY HH:mm:ss"));
        this.d = moment.duration(this.ms);

        this.diffTime = null;
        if(this.d.days() > 0){
          this.diffTime = ` ${this.d.days()} days ${this.d.hours()} hr ago `;
        }else if(this.d.hours() > 0){
          this.diffTime = ` ${this.d.hours()} hr ${this.d.minutes()} mins ago `;
        }else if(this.d.minutes() > 0){
          this.diffTime = ` ${this.d.minutes()} mins ${this.d.seconds()} secs ago `;
        }else{
          this.diffTime = ` ${this.d.seconds()} secs ago `;
        };
        
        return(
          <div className="row_blocks" key={index}>
            <div className="title flex">
              <div className="block_count">
                Blocks
                <Link to={`/block/${item.header.height}`}>{item.header.height}</Link>
              </div>
              <div className="seconds_time">{this.diffTime}</div>
            </div>
            <div className="includes flex">
              <div className="in_detail">
                Includes
                <Link to="/txs?block="> {item.header.num_txs} Txns, </Link>
              </div>
              <div className="node">
                Node: <span>{item.header.chain_id}</span>
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

export default connect(mapStateToProps)(BlocksBox);