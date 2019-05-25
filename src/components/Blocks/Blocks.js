import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../Layout';
import moment from 'moment';
import * as handledata from '../../service/handledata';
import MaterialIcon from 'material-icons-react';
import './Blocks.scss';
// import { diffTime } from "../../service/findtimebyblock";

const mapStateToProps = (state) => {
  return {
    blocks: state.handleListBlocks,
    pageState: state.changePageState,
  }
}

// Paging 
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

class Blocks extends Component {

  constructor(){
    super();
    this.state = {
      pageIndex: 1
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.getBlocksByPageIndex(this.state.pageIndex);
    }
  }

  // Set Time For Block
  loadBlocks = () => {
    const blocks = this.props.blocks && this.props.blocks.map((item, index) => {
      let currentTime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
      let blockTime = moment(item.header.time).format("DD/MM/YYYY HH:mm:ss");
      const ms = moment(currentTime, "DD/MM/YYYY HH:mm:ss").diff(moment(blockTime, "DD/MM/YYYY HH:mm:ss"));
      const d = moment.duration(ms);

      // diffTime
      var diffTime = null;
      if (d.days() > 0) {
        diffTime = `${d.days()} days ${d.hours()} hours ago`;
      } else if (d.hours() > 0) {
        diffTime = `${d.hours()} hours ${d.minutes()} mins ago`;
      } else if (d.minutes() > 0) {
        diffTime = `${d.minutes()} mins ${d.seconds()} secs ago`;
      } else {
        diffTime = `${d.seconds()} secs ago`;
      }

      return (
        <tr key={index}>
          <td><Link to={`/block/${item.header.height}`}>{item.header.height}</Link></td>
          <td>{moment(item.header.time).format("MMMM-DD-YYYY h:mm:ss")}</td>
          <td>{diffTime}</td>
          <td>
            {(item.header.num_txs > 0) ? <Link to={`/txs?block=${item.header.height}`}>{item.header.num_txs}</Link> : 0}
          </td>
          <td>VN</td>
          <td>0 BNB</td>
        </tr>
      )
    })

    return blocks;
  }

  // Set Data By Page Index
  getBlocksByPageIndex(pageIndex) {
    let maxheight = this.props.pageState.total_blocks;

    if(pageIndex <= 0){
      pageIndex = 1;
    }

    if(pageIndex >=this.props.pageState.pageBlockLimit){
      pageIndex = this.props.pageState.pageBlockLimit 
    }
    
    this.setState({
      pageIndex
    })

    return handledata.getBlocks(maxheight, pageIndex, 20);
  }

  render() {
    return (
      <Layout>
        <div className="block_page mt_50 mb_30">
          <div className="container">
            <div className="block_page page_info_header">
              <h3>Blocks</h3>
              <div className="breadcrumb">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/">Blocks</Link></li>
                </ul>
              </div>
            </div>
            <div className="table_data">
              <table>
                <thead>
                  <tr>
                    <th>Height</th>
                    <th>Time</th>
                    <th>Age</th>
                    <th>Txns</th>
                    <th>Node</th>
                    <th>Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {this.loadBlocks()}
                </tbody>
              </table>

            </div>
            <div className="pagination">
              <ul>
                <li></li>
              </ul>
            </div>
            <div className="page-index">
              <div className="paging">
                <button className="btn-common" onClick={() => { this.getBlocksByPageIndex(1)}}>First</button>
                <button className="btn-cusor" onClick={() => { this.getBlocksByPageIndex(this.state.pageIndex - 1)}} >
                  <MaterialIcon icon="keyboard_arrow_left" />
                </button>
                <span className="state">Page {this.state.pageIndex} of {this.props.pageState.pageBlockLimit} </span>
                <button className="btn-cusor" onClick={() => { this.getBlocksByPageIndex(this.state.pageIndex + 1)}}>
                  <MaterialIcon icon="keyboard_arrow_right" />
                </button>
                <button className="btn-common" onClick={() => { this.getBlocksByPageIndex(this.props.pageState.pageBlockLimit)}}>
                  Last
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout >
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Blocks);