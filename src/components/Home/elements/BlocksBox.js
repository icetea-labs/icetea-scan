import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './BlocksBox.scss';
import { Block, Age, NumTxs, ShadowBox, FlexBox } from '../../elements/Common';

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
        <div className="wrapperRowBox" key={index}>
          <div className="innerRowBox border-bottom">
            <FlexBox className="row title">
              <div className="primary-color">
                <span>Block </span>
                <Block value={block.height} />
              </div>
              <div className="secondary-color proxima-nova-regular">
                <Age value={block.time} />
              </div>
            </FlexBox>
            <FlexBox className="row">
              <div className="secondary-color text-overflow offset-r">
                <span>Includes </span>
                <NumTxs value={block.num_txs} height={block.height} />
              </div>
              <div className="primary-color">
                <span>
                  Node: <span>{block.chain_id}</span>
                </span>
              </div>
            </FlexBox>
          </div>
        </div>
      );
    });
  }

  render() {
    const { cssIcon } = this.state;

    return (
      <div className="blocks_box">
        <div className="flex_header">
          <h3 className="title">
            <i className={cssIcon} />
            <span>Blocks</span>
          </h3>
          <Link to="/blocks/">View All >></Link>
        </div>
        <ShadowBox>{this.renderBlocks()}</ShadowBox>
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
