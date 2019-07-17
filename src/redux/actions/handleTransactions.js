import * as types from '../constants/ActionTypes';

export function getListTxs(transactions) {
  return {
    type: types.GET_TRANSACTIONS,
    transactions,
  }
}
