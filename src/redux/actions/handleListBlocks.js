import * as types from '../constants/ActionTypes';

export function getListBlocks  (blocks) {
  return {
    type: types.GET_BLOCKS,
    blocks,
  }
}