import store from '../../store';
import * as actions from '../../store/actions';
import { _get, listBlocks, countBlock } from './base-api';

export const getListBlockApi = async params => {
  const response = await _get(params, listBlocks);

  try {
    if (response.status === 200) {
      const { data } = response;
      //   console.log("getListBlockApi", response);
      store.dispatch(actions.setBlocks(data));
    }
  } catch (err) {
    throw err;
  }
};

export const getTotalBlockApi = async params => {
  const response = await _get(params, countBlock);

  try {
    if (response.status === 200) {
      const { data } = response;
      // console.log("getListBlockApi", response);
      store.dispatch(actions.setTotalBlock(data[0] ? data[0].count : 0));
    }
  } catch (err) {
    throw err;
  }
};
