import { combineReducers } from 'redux';
import handleListBlocks from './blocks';
import handleTransactions from './transactions';
import changePageState from './pagestate';
import {handleRealtimeData} from './realtimedata';
const myReducer =  combineReducers({
    handleListBlocks,
    handleTransactions,
    changePageState,
    handleRealtimeData
  })

export default myReducer