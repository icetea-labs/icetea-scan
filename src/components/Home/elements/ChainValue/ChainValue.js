import React, { Component } from 'react';
// import Note from './elements/Note';
import TotalChain from './elements/TotalChain/TotalChain';
import {Col} from 'react-bootstrap'

class ChainValue extends Component {
    render() {
        return (
            <Col className='chain-value'>
                <TotalChain />
            </Col>
        );
    }
}

export default ChainValue;