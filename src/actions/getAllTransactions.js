import * as types from './constants/ActionTypes';

export const getAllTransactions = transactions => {
  return {
    type: types.ALL_TRANSACTIONS,
    transactions: transactions,
  }
}
