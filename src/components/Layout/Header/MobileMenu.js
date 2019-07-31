import React, { Component } from 'react';
import { LayoutDisplay } from '../../elements/Common';

class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.layoutRef = React.createRef();
  }

  hidden = () => {
    const { close } = this.props;
    this.setState({ hide: true });
    setTimeout(() => {
      close && close();
    }, 100);
  };

  clickLayout = e => {
    e.target === this.layoutRef.current && this.hidden();
  };

  render() {
    return (
      <LayoutDisplay ref={this.layoutRef} onClick={this.clickLayout}>
        <div className="mobileMenuBox">
          <div className="btcClose">
            <i className="fa fa-close" onClick={this.hidden} />
          </div>
          <ul className="menu">
            <li className="menuItems">
              <a href="/">
                <i className="fa fa-home" />
                <span>Home</span>
              </a>
            </li>
            <li className="menuItems">
              <span>
                <i className="fa fa-btc" />
                BlockChain
              </span>
            </li>
            <hr />
            <li className="menuItems">
              <a href="/blocks">
                <i className="fa fa-cubes" />
                <span>Blocks</span>
              </a>
            </li>
            <li className="menuItems">
              <a href="/txs">
                <i className="fa fa-list-alt" />
                <span>Transactions</span>
              </a>
            </li>
            <li className="menuItems">
              <a href="/contracts">
                <i className="fa fa-file" />
                <span>Contracts</span>
              </a>
            </li>
          </ul>
        </div>
      </LayoutDisplay>
    );
  }
}

export default MobileMenu;
