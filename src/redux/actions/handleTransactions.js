import * as types from '../constants/ActionTypes';

export function getDataTransactions(transactions) {
  return {
    type: types.GET_TRANSACTIONS,
    transactions,
  }
}
