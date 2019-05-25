import * as types from '../constants/ActionTypes';

const initialState = [];

export default function handleListBlocks (state = initialState, action){
  switch (action.type) {
    case (types.GET_BLOCKS):
      return [...action.blocks];

    default: return state;
  }
}