import React from 'react';
import Header from './Header/Header';
import Footer from './Footer';
import SideBar from './SideBar/SideBar';
import { FlexBox } from '../elements/Common';

function LayoutCommon(props) {
  return (
    <FlexBox className="layout_container">
      <SideBar />
      <Header />
      {props.children}
      <Footer />
    </FlexBox>
  );
}
export function HomeLayout(props) {
  return (
    <LayoutCommon>
      <main className="home_container">{props.children}</main>
    </LayoutCommon>
  );
}
export function Layout(props) {
  return (
    <LayoutCommon>
      <div className="content">
        <main className="layout-content">{props.children}</main>
      </div>
    </LayoutCommon>
  );
}

export default Layout;
