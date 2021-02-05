import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer pc-footer">
        <div className="container">
          <div className="infomation">
            <p>
              Copyright © 2019&nbsp;
              <a href={process.env.REACT_APP_TRADA} target="_blank" rel="noopener noreferrer">
                Icetea Foundation
              </a>
              . All rights reserved.
            </p>
            <a href={process.env.REACT_APP_TELE} rel="noopener noreferrer" target="_blank">
              <i className="fa fa-paper-plane" />
            </a>
            <a href={process.env.REACT_APP_FACE} rel="noopener noreferrer" target="_blank">
              <i className="fa fa-facebook" />
            </a>
            <a href={process.env.REACT_APP_TWITTER} rel="noopener noreferrer" target="_blank">
              <i className="fa fa-twitter" />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
