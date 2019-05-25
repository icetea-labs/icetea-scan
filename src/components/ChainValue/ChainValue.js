import React, { Component } from 'react';
import Note from './elements/Note';
import TotalChain from './elements/TotalChain';

class ChainValue extends Component {
    render() {
        return (
            <div>
                <Note />
                <TotalChain />
            </div>
        );
    }
}

export default ChainValue;