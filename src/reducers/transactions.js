import * as types from '../actions/constants/ActionTypes';

const initialState = [];

const Transactions = ( state = initialState, action ) => {
  switch (action.type) {
    case types.ALL_TRANSACTIONS:
    return [...state, ...action.transactions]
    default: return state;
  }
}

export default Transactions;