import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Select from 'rc-select';
import PaginationPro from '../elements/PaginationPro';
import './Blocks.scss';
import { diffTime, formatNumber } from '../../utils';
import { getListBlockApi, getTotalBlockApi } from '../../service/api/get-list-data';
import * as actions from '../../store/actions';

class Blocks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 15,
      blocksInfo: [],
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.blocksInfo !== prevState.blocksInfo) {
  //     return { blocksInfo: nextProps.blocksInfo };
  //   } else {
  //     return null;
  //   }
  // }

  componentDidMount() {
    const { pageSize } = this.state;
    getListBlockApi({ page_size: pageSize });
    getTotalBlockApi();
  }

  // componentDidUpdate() {
  //   const { setLoading } = this.props;
  //   console.log("componentDidUpdate");
  //   setLoading(false);
  // }

  renderTHead() {
    return (
      <tr>
        <th>Height</th>
        <th>Time</th>
        <th>Age</th>
        <th>Txns</th>
        <th>Node</th>
        <th>Fees</th>
      </tr>
    );
  }

  renderTbody() {
    const { blocksInfo } = this.props;
    // console.log('renderTbody', blocksInfo);
    if (blocksInfo.length === 0) {
      return (
        <tr className="no_data">
          <th />
          <th />
          <th />
          <th>No Data</th>
          <th />
          <th />
        </tr>
      );
    } else {
      return blocksInfo.map((item, index) => {
        return (
          <tr key={index}>
            <td>
              <Link to={`/block/${item.height}`}>{item.height}</Link>
            </td>
            <td>{moment(item.time).format('MMMM-DD-YYYY h:mm:ss')}</td>
            <td>{diffTime(item.time)}</td>
            <td>
              <Link to={`/txs?height=${item.height}`}>{item.num_txs}</Link>
            </td>
            <td>
              <span>{item.chain_id}</span>
            </td>
            <td>
              <span>0 TEA</span>
            </td>
          </tr>
        );
      });
    }
  }

  paginationOnChange = pageNum => {
    const { current, pageSize } = this.state;
    // const { setLoading } = this.props;
    if (pageNum !== current) {
      this.setState({ current: pageNum }, () => {
        // setLoading(true);
      });
      getListBlockApi({ page_size: pageSize, page_index: pageNum });
    }
  };

  render() {
    const { current, pageSize } = this.state;
    const { totalBlocks } = this.props;
    let form = totalBlocks - current * pageSize + 1;
    if (form < process.env.REACT_APP_INIT_BLOCK) form = process.env.REACT_APP_INIT_BLOCK;
    let to = totalBlocks - current * pageSize + pageSize;
    if (to > totalBlocks) to = totalBlocks;

    return (
      <div className="blocks pc-container ">
        <h3>Blocks</h3>
        <div className="flexBox">
          <div className="sub-title">
            Block <span>#{formatNumber(form)}</span> to <span>#{formatNumber(to)}</span> (Total of
            <span> {formatNumber(totalBlocks)} </span>blocks)
          </div>
          <div className="breadcrumb">
            <span className="breadcrumb-item">
              <Link to="/">Home</Link>
            </span>
            <div className="breadcrumb-separator">/</div>
            <span className="breadcrumb-item">
              <Link to="/blocks">Blocks</Link>
            </span>
          </div>
        </div>
        <div className="table_data">
          <table>
            <thead>{this.renderTHead()}</thead>
            <tbody>{this.renderTbody()}</tbody>
          </table>
        </div>
        <PaginationPro
          selectComponentClass={Select}
          showQuickJumper={false}
          showSizeChanger={false}
          defaultPageSize={pageSize}
          defaultCurrent={current}
          onChange={this.paginationOnChange}
          total={totalBlocks}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { chainInfo } = state;
  return {
    blocksInfo: chainInfo.blocks,
    totalBlocks: chainInfo.totalBlocks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: value => {
      dispatch(actions.setLoading(value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blocks);
