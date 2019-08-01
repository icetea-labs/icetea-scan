import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'rc-select';
import PaginationPro from '../elements/PaginationPro';
import { TotalInfo, HeaderMap, Balance, Address, Language } from '../elements/Common';
import { getAllContracts, getAccountInfo } from '../../service';
import * as actions from '../../store/actions';
class ListContracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 15,
      total: 0,
      dataCurrentPage: [],
      allContractsAddress: [],
    };
  }

  async componentDidMount() {
    const res = await getAllContracts();
    const { setLoading } = this.props;
    setLoading(true);
    this.loadData(res.data);
  }

  async loadData(data) {
    const { current, pageSize } = this.state;
    const total = data.length;
    const from = (current - 1) * pageSize;
    let to = from + pageSize;
    let contract = [];

    if (total > 0) {
      if (to > total) to = total;
      console.log('from: ', from, '-to', to);
      contract = data.filter((item, index) => {
        return index >= from && index < to;
      });
    }

    let tmp = [];
    for (let i = 0; i < contract.length; i++) {
      let res = await getAccountInfo(contract[i]);
      // console.log("res", res);
      res.data.address = contract[i];
      // if (res.status === 200) {
      tmp.push(res.data);
      // }
    }
    this.setState({ allContractsAddress: data, dataCurrentPage: tmp, total }, () => {
      const { setLoading } = this.props;
      setLoading(false);
    });
  }

  renderTbody() {
    const { dataCurrentPage } = this.state;
    console.log('dataCurrentPage', dataCurrentPage);
    return dataCurrentPage.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <Address value={item.address} />
          </td>
          <td>
            <Balance value={item.balance} />
          </td>
          <td>
            <Address value={item.deployedBy} />
          </td>
          <td>
            <Language value={item.mode} />
          </td>
        </tr>
      );
    });
  }

  paginationOnChange = current => {
    // console.log("current", current);
    const { allContractsAddress } = this.state;
    const { setLoading } = this.props;

    this.setState({ current }, () => {
      setLoading(true);
      this.loadData(allContractsAddress);
    });
  };

  render() {
    const { current, pageSize, total } = this.state;

    return (
      <div className="listContract pc-container">
        <h3>Contracts</h3>
        <div className="flexBox">
          <TotalInfo total={total} text={['contracts', ['contract']]} />
          <HeaderMap value={[{ path: '/', text: 'Home' }, { path: '/contracts', text: 'Contracts' }]} />
        </div>
        <div className="table_data">
          <table>
            <thead>
              <tr>
                <th width="35%">Address</th>
                <th width="15%">Balance</th>
                <th width="35%">Deployed by</th>
                <th width="15%">Language</th>
              </tr>
            </thead>
            <tbody>{this.renderTbody()}</tbody>
          </table>
        </div>
        <PaginationPro
          selectComponentClass={Select}
          showQuickJumper={false}
          showSizeChanger={false}
          defaultPageSize={pageSize}
          defaultCurrent={current}
          onChange={this.paginationOnChange}
          total={total}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoading: value => {
      dispatch(actions.setLoading(value));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ListContracts);
