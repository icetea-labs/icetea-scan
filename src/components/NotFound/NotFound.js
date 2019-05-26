import React, { Component } from 'react';
import './NotFound.scss';
import gif from '../../assets/img/loadingtrada.gif';

class NotFound extends Component {
    render() {
        return (
            <div>
                <div className="not-found">
                    <h3>Not found</h3>
                    <p>Sorry! The page you’re looking for cannot be found.</p>
                </div>
                <div className="not-found_img">
                    <img src={gif} alt='tradatech' />
                </div>
            </div>

        );
    }
}

export default NotFound;