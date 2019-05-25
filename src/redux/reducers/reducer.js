import { combineReducers } from 'redux';
import handleListBlocks from './blocks';
import handleTransactions from './transactions';
import changePageState from './pagestate';
import getRealTimeData from './realtimedata';

const myReducer =  combineReducers({
    handleListBlocks,
    handleTransactions,
    changePageState,
    getRealTimeData
  })

export default myReducer