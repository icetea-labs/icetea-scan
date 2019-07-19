import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../Layout/Layout';
import moment from 'moment';
// import * as handledata from '../../service/handle-data';
import MaterialIcon from 'material-icons-react';
import './Blocks.scss';
import { setPageSate } from '../../service/blockchain/get-realtime-data';
import diffTime from '../../service/blockchain/find-time-return';
// import { _get } from '../../service/api/base-api';
// import { listBlocks } from '../../service/api/list-api';
import { getListBlockApi } from '../../service/api/get-list-data';
import Paging from './../Layout/elements/Paging/Paging';

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
      for (let i = 0; i < this.props.blocks.length; i++) {
        let item = this.props.blocks[i].height;
        let time = await diffTime(item);
        this.state.list_time.push(time);
      }

      if (this.state.pageIndex === 1) {
        this.getBlocksByPageIndex(1);
      }
    }
  }

  // Set Time For Block
  loadBlocks() {
    let blocks = this.props.blocks && this.props.blocks.map((item, index) => {
      return (
        <tr key={index}>
          <td><Link to={`/block/${item.height}`}>{item.height}</Link></td>
          <td>{moment(item.time).format("MMMM-DD-YYYY h:mm:ss")}</td>
          <td>{this.state.list_time[index]}</td>
          <td>
            {(item.num_txs > 0) ? <Link to={`/txs?block=${item.height}`}>{item.num_txs}</Link> : 0}
          </td>
          <td>{item.chain_id}</td>
          <td>0 TEA</td>
        </tr>
      )
    })
    return blocks
  }

  // Set Data By Page Index
  async getBlocksByPageIndex(pageIndex) {

    if (pageIndex <= 0) {
      pageIndex = 1;
    }

    if (pageIndex >= this.props.pageState.pageBlockLimit) {
      pageIndex = this.props.pageState.pageBlockLimit
    }

    this.setState({
      pageIndex
    })

    // return handledata.getBlocks(maxheight, pageIndex, 20);
    getListBlockApi({ page_index: this.state.pageIndex, page_size: this.props.pageState.pageSize });

  }

  render() {
    return (
      <Layout>
        <div className="block_page mt_50 mb_30">
          <div className="container">
            <div className="page_info_header">
              <h2>Blocks</h2>
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
            <Paging data={'block'} />
          </div>
        </div>
      </Layout >
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Blocks);