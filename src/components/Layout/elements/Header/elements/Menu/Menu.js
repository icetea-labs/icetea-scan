import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_home: false,
      is_block: false,
      is_tx: false,
      is_contract: false,
    }
  }

  componentWillMount() {
    let { is_home, is_block, is_tx, is_contract } = this.state
    switch (window.location.pathname) {
      case '/':
        is_home = true
        break;
      case '/blocks':
        is_block = true
        break;
      case '/contracts':
        is_contract = true
        break;
      case '/txs':
        is_tx = true
        break;
      default:
        break;
    }

    
    this.setState({ is_home, is_block, is_tx, is_contract });
  }

  render() {
    let { is_home, is_block, is_tx, is_contract } = this.state;
    return (
      <div className="main_nav nf">
          <Link to="/"><li className='nav_choose_items' >Home</li></Link>
          <Link to="/blocks"><li className='nav_items' >Blocks</li></Link>
          <Link to="/txs"><li className='nav_items' >Transactions</li></Link>
          <Link to="/contracts"><li className='nav_items' >Contracts</li></Link>
      </div >
    );
  }
}

export default Menu;