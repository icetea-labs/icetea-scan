// import * as types from '../constants/ActionTypes';

const initialState = [];

export default function handleTransactions (state = initialState, action) {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return [...action.transactions];
    default: return state;
  }
}
