import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../Layout/Layout';
import moment from 'moment';
import * as handledata from '../../service/handle-data';
import MaterialIcon from 'material-icons-react';
import './Blocks.scss';
import { setPageSate } from '../../service/get-realtime-data';
import diffTime from '../../service/find-time-by-block';

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

  constructor() {
    super();
    this.state = {
      pageIndex: 1,
      blocks: [],
      list_time: []
    }
  }

  componentWillMount() {
    setPageSate();
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      for (let i = 0; i < this.props.blocks.length; i ++) {
        let item = this.props.blocks[i].header.height;
        let time = await diffTime(item);
        
        this.state.list_time.push(time);
      }

      if (this.state.pageIndex === 1) {
        handledata.getBlocks( this.props.pageState.total_blocks ,1 , 20);
      }
    }
  }

  // Set Time For Block
  loadBlocks() {
    let blocks = this.props.blocks && this.props.blocks.map((item, index) => {
      return (
        <tr key={index}>
          <td><Link to={`/block/${item.header.height}`}>{item.header.height}</Link></td>
          <td>{moment(item.header.time).format("MMMM-DD-YYYY h:mm:ss")}</td>
          <td>{this.state.list_time[index]}</td>
          <td>
            {(item.header.num_txs > 0) ? <Link to={`/txs?block=${item.header.height}`}>{item.header.num_txs}</Link> : 0}
          </td>
          <td>VN</td>
          <td>0 TEA</td>
        </tr>
      )
    })

    return blocks
  }

  // Set Data By Page Index
  getBlocksByPageIndex(pageIndex) {
    let maxheight = this.props.pageState.total_blocks;

    if (pageIndex <= 0) {
      pageIndex = 1;
    }

    if (pageIndex >= this.props.pageState.pageBlockLimit) {
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
                  <li><Link to="/blocks">Blocks</Link></li>
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
                <button className="btn-common" onClick={() => { this.getBlocksByPageIndex(1) }}>First</button>
                <button className="btn-cusor" onClick={() => { this.getBlocksByPageIndex(this.state.pageIndex - 1) }} >
                  <MaterialIcon icon="keyboard_arrow_left" />
                </button>
                <span className="state">Page {this.state.pageIndex} of {this.props.pageState.pageBlockLimit} </span>
                <button className="btn-cusor" onClick={() => { this.getBlocksByPageIndex(this.state.pageIndex + 1) }}>
                  <MaterialIcon icon="keyboard_arrow_right" />
                </button>
                <button className="btn-common" onClick={() => { this.getBlocksByPageIndex(this.props.pageState.pageBlockLimit) }}>
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