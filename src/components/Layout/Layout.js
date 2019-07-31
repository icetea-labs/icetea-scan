import React from 'react';
import Header from './Header/Header';
import Footer from './Footer';
import { FlexBox, FlexItem } from '../elements/Common';

function LayoutCommon(props) {
  return (
    <FlexBox className="layoutContainer">
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
      <FlexItem>
        <main className="layoutContent">{props.children}</main>
      </FlexItem>
    </LayoutCommon>
  );
}

export default Layout;
