import { combineReducers } from 'redux';
import Blocks from './blocks';
import Transactions from './transactions';
import changePageState from './pagestate';
import getRealTimeData from './realtimedata';

const myReducer = combineReducers({
  Blocks,
  Transactions,
  changePageState,
  getRealTimeData
})

export default myReducer;