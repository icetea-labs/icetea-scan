import React, { Component } from 'react';
import './ViewSource.scss';
import tweb3 from '../../tweb3';
import GlobaLoading from '../elements/GlobaLoading';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class ViewSource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: '',
            isloading: false,
            list_data: [],
            declare: ['const', 'class', 'get', 'set', 'this', 'if', 'typeof', 'in', 'return', 'throw', 'new', 'let'],
            functions: ['includes', 'isArray', 'defineProperties', 'Error', 'emitEvent', 'startsWith', 'getOwnPropertyDescriptors', 'call(value)',
                'split', 'toLowerCase', 'slice', 'join', 'decorations', 'setValue', 'params', 'toString'],
            address: ''
        };
    }

    componentWillMount() {

        this.loadSource();
    }

    componentDidMount() {
        const { setLoading } = this.props;
        setLoading(true);
    }

    async loadSource() {
        try {
            let { source, list_data, declare, functions } = this.state;
            let { address } = this.props.match.params;
            source = await tweb3.getContractSource(address);
            if (source) {
                let array_data = source.split(" ");
                list_data = array_data.map((item, index) => {
                    let array = [];
                    let list_span = [];
                    let dot_arr = 0;

                    for (let z = 0; z < item.length; z++) {
                        if (item[z] === '.') {
                            dot_arr += 1;
                        }
                    }

                    let new_arr = item.split('.');
                    for (let i = 0; i < new_arr.length; i++) {
                        array.push(new_arr[i]);
                        if (dot_arr > 0) {
                            array.push('.')
                        }

                        dot_arr -= 1;
                    }

                    if (array.length > 0) {
                        let class_Name = 'variable';
                        for (let index_array = 0; index_array < array.length; index_array++) {
                            let item = array[index_array];
                            for (let m = 0; m < declare.length; m++) {
                                if (item === declare[m]) {
                                    class_Name = 'declare';
                                    break;
                                }
                            }

                            for (let n = 0; n < functions.length; n++) {
                                if (item === functions[n]) {
                                    class_Name = 'functions';
                                    break;
                                }
                            }

                            for (let l = 0; l < functions.length; l++) {
                                if (item === '.') {
                                    class_Name = 'dot';
                                    break;
                                }
                            }

                            list_span.push(<span className={class_Name} key={index + 'array' + index_array}>{item}</span>)
                        }
                    } else {
                        let class_Name = 'variable';
                        for (let k = 0; k < declare.length; k++) {
                            if (item === declare[k]) {
                                class_Name = 'declare';
                                break;
                            }
                        }

                        for (let g = 0; g < functions.length; g++) {
                            if (item === functions[g]) {
                                class_Name = 'functions';
                                break;
                            }
                        }

                        list_span.push(<span className={class_Name} key={index + 'single'}>{item}</span>)
                    }

                    return list_span;

                })
                this.setState({ source, list_data, address }, () => {
                    const { setLoading } = this.props;
                    setLoading(false);
                });

            }

        } catch (err) {
            throw (err);
        }
    }

    render() {
        let { list_data, isloading, address } = this.state;

        if (isloading === true) {
            return <GlobaLoading />
        }
        else return (
            <div className='view_code'>
                <div className='flex-wrap'>
                    <h3>
                        View Source
                    </h3>
                    <p>
                        Address: <Link to={`/address/${address}`} href='_blank' >{address}</Link>
                    </p>
                </div>

                <div className='source'>
                    <pre>
                        {list_data}
                    </pre>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoading: value => {
            dispatch(actions.setLoading(value));
        },
    };
};


export default connect(null, mapDispatchToProps)(ViewSource);
