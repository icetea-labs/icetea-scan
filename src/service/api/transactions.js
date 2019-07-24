import store from '../../store';
import * as actions from '../../store/actions';
import { _get, listTxs, countTxs, singleBlock } from './base-api';

export const getListTxApi = async params => {
  let response = await _get(params, listTxs);

  try {
    if (response.status === 200) {
      let data = response.data;
      store.dispatch(actions.setTransactions(data));
    }
  } catch (err) {
    throw err;
  }
};
export const getTotalTxsApi = async params => {
  const response = await _get(params, countTxs);

  try {
    if (response.status === 200) {
      const { data } = response;
      // console.log("getListBlockApi", response);
      store.dispatch(actions.setTotalTransaction(data[0] ? data[0].count : 0));
    }
  } catch (err) {
    throw err;
  }
};
export const getTotalTxsByHeighApi = async height => {
  const response = await _get(null, singleBlock + '/' + height);
  try {
    if (response.status === 200) {
      const { data } = response;
      // console.log("getTotalTxsByHeighApi", response);
      store.dispatch(actions.setTotalTransaction(data[0] ? data[0].num_txs : 0));
    }
  } catch (err) {
    throw err;
  }
};
