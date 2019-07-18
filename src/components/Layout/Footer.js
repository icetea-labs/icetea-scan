import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer pc-footer">
        <div className="container">
          <div className="infomation">
            <p>
              © 2019 &nbsp;
              <a href="https://trada.tech/team.html" target="_blank" rel="noopener noreferrer">
                TradaTech
              </a>
            </p>
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
