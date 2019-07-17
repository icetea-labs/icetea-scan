import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="infomation">
            © 2018 - 2019 TradaTech All rights reserved
            <a href="http://trada.tech" rel="noopener noreferrer" target="_blank">
              <i className="fa fa-paper-plane" />
            </a>
            <a href="http://trada.tech" rel="noopener noreferrer" target="_blank">
              <i className="fa fa-facebook" />
            </a>
            <a href="http://trada.tech" rel="noopener noreferrer" target="_blank">
              <i className="fa fa-twitter" />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
