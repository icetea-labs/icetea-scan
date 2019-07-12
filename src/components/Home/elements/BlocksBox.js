import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { diffTime } from "../../../utils";
import "./BlocksBox.scss";

class BlocksBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cssIcon: "fa bi-spin fa-cubes"
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.cssIcon.indexOf("bi-spin") === -1) {
      return { cssIcon: "fa bi-spin fa-cubes" };
    } else {
      return { cssIcon: "fa fa-cubes" };
    }
  }

  renderBlocks() {
    const { blocksInfo } = this.props;

    return blocksInfo.map((block, index) => {
      return (
        <div className="row_blocks" key={index}>
          <div className="title flex">
            <div className="block_count">
              <span>Blocks</span>
              <Link to={`/block/${block.height}`}>{block.height}</Link>
            </div>
            <div className="seconds_time">{diffTime(block.time)}</div>
          </div>
          <div className="includes flex">
            <div className="in_detail">
              <span>Includes</span>
              <Link to={`/txs?block=${block.height}`}>
                <span> {block.num_txs} Txns</span>
              </Link>
            </div>
            <div className="node">
              <span>
                Node: <span>{block.chain_id}</span>
              </span>
            </div>
          </div>
        </div>
      );
    });
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
        <div className="box_wrap">{this.renderBlocks()}</div>
      </div>
    );
  }
}

export default BlocksBox;
