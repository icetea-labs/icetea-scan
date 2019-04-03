import { combineReducers } from 'redux';
import Blocks from './blocks';
import Transactions from './transactions';

const myReducer = combineReducers({
  Blocks,
  Transactions,
})

export default myReducer;