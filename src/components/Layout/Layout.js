import React, { Component } from 'react';
import Header from './Header/Header';
import Footer from './Footer';
import SideBar from './SideBar/SideBar';

function HomeContainer(props) {
  return (
    <div className="layout_container">
      <SideBar />
      <Header />
      <main className="home-content">{props.children}</main>
      <Footer />
    </div>
  );
}
class Layout extends Component {
  render() {
    return (
      <div className="layout_container">
        <SideBar />
        <Header />
        <div className="content">
          <main className="layout-content">{this.props.children}</main>
        </div>
        <Footer />
      </div>
    );
  }
}

export { HomeContainer, Layout };
export default Layout;
