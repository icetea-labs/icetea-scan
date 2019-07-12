import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Select from "rc-select";
import PaginationPro from "../elements/PaginationPro";
import Layout from "../Layout/Layout";
import "./Blocks.scss";
import { diffTime } from "../../utils";
import {
  getListBlockApi,
  getTotalBlockApi
} from "../../service/api/get-list-data";
import * as actions from "../../store/actions";

class Blocks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      blocksInfo: []
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
    // console.log("renderTbody");
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
            <td>{moment(item.time).format("MMMM-DD-YYYY h:mm:ss")}</td>
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
      this.setState({ current }, () => {
        // setLoading(true);
      });
      getListBlockApi({ page_size: pageSize, page_index: pageNum });
    }
  };

  render() {
    const { current, pageSize } = this.state;
    const { totalBlocks } = this.props;

    return (
      <Layout>
        <div className="block_page mt_50 mb_30">
          <div className="container">
            <div className="block_page page_info_header">
              <h3>Blocks</h3>
              <div className="breadcrumb">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/blocks">Blocks</Link>
                  </li>
                </ul>
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
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { chainInfo } = state;
  return {
    blocksInfo: chainInfo.blocks,
    totalBlocks: chainInfo.totalBlocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: value => {
      dispatch(actions.setLoading(value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blocks);
