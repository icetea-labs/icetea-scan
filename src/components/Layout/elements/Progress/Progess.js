import React, { Component } from 'react';
import './Progess.scss';

export default class Progess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_show: false
        }
    }

    componentWillMount() {
    }

    render() {

        let {is_show} = this.state;
        return (
            <div className='inprogess' style={{ display: is_show === true ? 'block' : 'none' }}></div>
        )
    }
}
