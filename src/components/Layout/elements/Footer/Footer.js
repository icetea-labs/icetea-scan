import React, { Component } from 'react';
import './Footer.scss';
import { Col, Row } from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (
      <Row className="footer">
        <div className="infomation">
          <Col sx={12} md={6}>
            <p>© 2018 - 2019 TradaTech All rights reserved</p>
          </Col>
          <Col sx={12} md={6}>
            <span><a href="http://trada.tech" rel="noopener noreferrer" target="_blank"><i className="fa fa-paper-plane"></i></a></span>
            <span><a href="http://trada.tech" rel="noopener noreferrer" target="_blank"><i className="fa fa-facebook"></i></a></span>
            <span><a href="http://trada.tech" rel="noopener noreferrer" target="_blank"><i className="fa fa-twitter"></i></a></span>
          </Col>
        </div>
      </Row>
    );
  }
}

export default Footer;