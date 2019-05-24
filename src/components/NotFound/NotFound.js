import React, { Component } from 'react';
import './NotFound.scss';
import logo from '../../asset/img/logo.png';
import gif from '../../asset/img/loadingtrada.gif'

class NotFound extends Component {
    render() {
        return (
            <div>
                <div className="not-found">
                    <h3>Not found</h3>
                    <p>Sorry, the page you are looking for is not found</p>
                </div>
                <div className="not-found_img">
                    <img src={gif} alt='tradatech' />
                </div>
            </div>

        );
    }
}

export default NotFound;