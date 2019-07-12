import store from "../../store";
import * as actions from "../../store/actions";
import { _get } from "./base-api";
import { listBlocks, listTxs, countBlock, countTxs } from "./list-api";
// import { getListBlocks } from "../../redux/actions/handleListBlocks";
// import { getListTxs } from "../../redux/actions/handleTransactions";

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

export const getListTxApi = async params => {
  let response = await _get(params, listTxs);

  try {
    if (response.status === 200) {
      let data = response.data;
      store.dispatch(actions.setTransactions(data));
    }
  } catch (err) {
    throw err;
  }
};
export const getTotalTxsApi = async params => {
  const response = await _get(params, countTxs);

  try {
    if (response.status === 200) {
      const { data } = response;
      // console.log("getListBlockApi", response);
      store.dispatch(actions.setTotalTransaction(data[0] ? data[0].count : 0));
    }
  } catch (err) {
    throw err;
  }
};
