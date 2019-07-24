import React, { Component } from 'react';
import tweb3 from '../../tweb3';
import Prism from 'prismjs';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Address } from '../elements/Common';

class ViewSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: '',
      address: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { address } = nextProps.match.params;
    if (address !== prevState.address) {
      return { address };
    }
    return null;
  }

  componentDidMount() {
    this.loadSource();
  }

  //   componentDidUpdate(prevProps, prevState) {
  //   }

  async loadSource() {
    const { address } = this.state;
    const { setLoading } = this.props;
    setLoading(true);
    const source = await tweb3.getContractSource(address);
    // console.log('source', source);
    this.setState({ source }, () => {
      Prism.highlightAll();
      setLoading(false);
    });
  }

  render() {
    const { address, source } = this.state;

    return (
      <div className="src-container pc-container ">
        <h3>Source Code</h3>
        <div className="flexBox">
          <div className="src-header">
            <span>For Address: </span>
            <Address value={address} />
          </div>
        </div>
        <div className="src-content">
          <pre>
            <code className="language-js">{source}</code>
          </pre>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoading: value => {
      dispatch(actions.setLoading(value));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ViewSource);
