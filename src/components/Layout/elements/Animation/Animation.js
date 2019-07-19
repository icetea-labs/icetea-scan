import React, { Component } from 'react';
import './Animation.scss';


export default class Animation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_transform: true
        }
    }

    componentWillMount() {
        this._animatorAction()
    }

    _choseAnimator = () => {

    }

    _animatorAction = () => {
        let { is_transform } = this.state;
        setInterval(() => {
            this.setState({ is_transform: true });
            console.log(' i`m rotating')
        }, 2000)
    }


    render() {
        this.icon_block = <i className="fa fa-cube"></i>
        this.icon_tx = <i className="fas fa-tasks"></i>
        let { is_transform } = this.state;

        return (
            <div className={is_transform === true ? 'animation' : ''}> {this.icon_block}</div>
        )
    }
}
