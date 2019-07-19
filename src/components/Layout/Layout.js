import React, { Component } from 'react';
import Header from './elements/Header/Header';
import Footer from './elements/Footer/Footer';
import SideBar from './elements/SideBar/SideBar';
import Progess from './elements/Progress/Progess';

class Layout extends Component {
  render() {
    return (
      <div className="layout_container">
        <SideBar />
        <Progess />
        <Header />
        <div className='content'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Layout;