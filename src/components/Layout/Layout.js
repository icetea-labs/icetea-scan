import React from 'react';
import Header from './Header/Header';
import Footer from './Footer';
import { FlexBox } from '../elements/Common';

function LayoutCommon(props) {
  return (
    <FlexBox className="layout_container">
      <Header {...props} />
      {props.children}
      <Footer />
    </FlexBox>
  );
}
export function HomeLayout(props) {
  return (
    <LayoutCommon {...props}>
      <main className="homeContainer">{props.children}</main>
    </LayoutCommon>
  );
}
export function Layout(props) {
  return (
    <LayoutCommon {...props}>
      <div className="content">
        <main className="layout-content">{props.children}</main>
      </div>
    </LayoutCommon>
  );
}

export default Layout;
