import { actionTypes } from "../actions/chainInfo";

const initialState = {
  blocks: [],
  totalBlocks: 10,
  transactions: [],
  totalTx: 10
};

const chainInfo = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BLOCKS:
      return Object.assign({}, state, {
        blocks: action.data
      });
    case actionTypes.SET_TRANSACTIONS:
      return Object.assign({}, state, {
        transactions: action.data
      });
    default:
      return state;
  }
};

export default chainInfo;
