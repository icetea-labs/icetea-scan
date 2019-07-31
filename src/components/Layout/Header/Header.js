import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { checkDevice } from '../../../utils';
import logo from '../../../assets/img/icetea-logo.svg';
import SearchBox from '../../elements/SearchBox';
import './Menu.scss';
import MobileMenu from './MobileMenu';
import { FlexBox } from '../../elements/Common';

function Menu() {
  return (
    <div className="main_nav nf">
      <ul className="nav_hed">
        <Link to="/">
          <li className="nav_items">Home</li>
        </Link>
        <Link to="/blocks">
          <li className="nav_items">Blocks</li>
        </Link>
        <Link to="/txs">
          <li className="nav_items">Transactions</li>
        </Link>
        <Link to="/contracts">
          <li className="nav_items">Contracts</li>
        </Link>
      </ul>
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="itea-scan" />
      </Link>
    </div>
  );
}
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSearch: false,
      showFullSearch: false,
      isMobile: checkDevice.isMobile(),
      showMobileMenu: false,
    };
    this.scrollTargetEl = null;
  }

  componentDidMount() {
    // const useragent = window.navigator.userAgent;
    // console.log('isMobile', isMobile(useragent));
    // seach on header and on home screen
    if (this.props.location.pathname === '/') {
      this.scrollTargetEl = document;
      this.scrollTargetEl.addEventListener('scroll', this.touchEndHandle);
      this.scrollTargetEl.addEventListener('touchend', this.touchEndHandle);
    } else {
      this.setState({ isShowSearch: true });
    }
  }

  componentWillUnmount() {
    if (this.scrollTargetEl) {
      this.scrollTargetEl.removeEventListener('touchend', this.touchEndHandle);
      this.scrollTargetEl.removeEventListener('scroll', this.touchEndHandle);
    }
  }

  touchEndHandle = () => {
    const value = this.scrollTargetEl === document ? window.pageYOffset : this.scrollTargetEl.scrollTop;
    this.setState({ isShowSearch: value > 180 });
  };

  handleSearchClick = () => {
    this.setState({ showFullSearch: true });
  };

  handleBlur = () => {
    this.setState({ showFullSearch: false });
  };

  showMobileMenu = () => {
    this.setState({ showMobileMenu: true });
  };

  hideMobileMenu = () => {
    this.setState({ showMobileMenu: false });
  };

  render() {
    const { isShowSearch, isMobile, showFullSearch, showMobileMenu } = this.state;
    console.log('isMobile', isMobile);
    return (
      <header className="header">
        {isMobile ? (
          isShowSearch && showFullSearch ? (
            <div className="searchBoxHeader">
              <SearchBox isHeader />
            </div>
          ) : (
            <React.Fragment>
              <Logo />
              {isShowSearch && (
                <FlexBox flex={1} justify="flex-end">
                  <i className="fa fa-search mobileIconSearch" aria-hidden="true" onClick={this.handleSearchClick} />
                </FlexBox>
              )}
              <FlexBox justify="flex-end">
                <div className="mobileIconMenu">
                  <i className="fa fa-bars" aria-hidden="true" onClick={this.showMobileMenu} />
                </div>
                {showMobileMenu && <MobileMenu close={this.hideMobileMenu} />}
              </FlexBox>
            </React.Fragment>
          )
        ) : (
          <React.Fragment>
            <Logo />
            {isShowSearch && (
              <div className="searchBoxHeader">
                <SearchBox isHeader />
              </div>
            )}
            <Menu />
          </React.Fragment>
        )}
      </header>
    );
  }
}

export default Header;
