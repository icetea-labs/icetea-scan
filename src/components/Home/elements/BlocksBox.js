import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './BlocksBox.scss';
import { Block, Age, NumTxs } from '../../elements/Common';

class BlocksBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cssIcon: 'fa bi-spin fa-cubes',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.cssIcon.indexOf('bi-spin') === -1) {
      return { cssIcon: 'fa bi-spin fa-cubes' };
    } else {
      return { cssIcon: 'fa fa-cubes' };
    }
  }

  renderBlocks() {
    const { blocksInfo } = this.props;

    return blocksInfo.map((block, index) => {
      return (
        <div className="wrapper-rowbox" key={index}>
          <div className="row_blocks">
            <div className="title flex">
              <div className="block_count">
                <span>Blocks</span>
                <Block value={block.height} />
              </div>
              <div className="seconds_time">
                <Age value={block.time} />
              </div>
            </div>
            <div className="includes flex">
              <div className="in_detail">
                <span>Includes</span>
                <NumTxs value={block.num_txs} height={block.height} />
              </div>
              <div className="node">
                <span>
                  Node: <span>{block.chain_id}</span>
                </span>
              </div>
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
          <Link to="/blocks/">View All >></Link>
        </div>
        <div className="box_wrap">{this.renderBlocks()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { chainInfo } = state;
  return {
    blocksInfo: chainInfo.blocks,
  };
};

export default connect(
  mapStateToProps,
  null
)(BlocksBox);
