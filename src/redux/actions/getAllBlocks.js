import * as types from '../constants/ActionTypes';

export const getAllBlocks = blocks => {
  return {
    type: types.ALL_BLOCKS,
    blocks: blocks,
  }
}