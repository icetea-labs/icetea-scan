import React, { Component } from 'react';
import banner from '../../../assets/img/banner.png';
import './Note.scss';

class Note extends Component {
    render() {
        return (
            <div className="itea-banner">
                <img src = {banner} alt="itea banner" />
            </div>
        );
    }
}

export default Note;