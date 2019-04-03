import * as types from '../actions/constants/ActionTypes';

const initialState = [];

const Blocks = ( state = initialState, action ) => {
  switch (action.type) {
    case (types.ALL_BLOCKS):
      return [...state, ...action.blocks];
      
    default: return state;
  }
}

export default Blocks;