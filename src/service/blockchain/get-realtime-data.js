import tweb3 from "../../tweb3";
import store from "../store";
import { getRealTimeBlocksAndTxs } from "../../redux/actions/handleRealTimeData";
import { setIndex } from "../../redux/actions/handlePageState";
import { getListBlockApi, getListTxApi } from "../api/get-list-data";
import { utils } from "@iceteachain/web3";
// import { store } from "./init-store";
import { _get } from "../api/base-api";
import { countBlock } from "../api/list-api";
import * as actions from "../store/actions";

/**
 * @param {null} getRealTimeData get data of 10 first block and txs to redux
 *
 */

export const getRealTimeData = async () => {
  // number to get values
  const limit_blocks_txs = 10;

  // get 10 lastest block
  let last_block = await tweb3.getBlock();
  let maxHeight = last_block.block_meta.header.height;
  let minHeight = maxHeight - limit_blocks_txs;

  if (minHeight < 0) {
    minHeight = 0;
  }
  // console.log(last_block);

  let options = { minHeight, maxHeight };

  const blockchain = await tweb3.getBlocks(options);
  if (blockchain === null) {
    console.log("data is null");
  }

  // get 10 last trans
  let transactions = [];
  let ave_trx = 0;
  let limit_block = 0;

  for (let i = maxHeight; i > limit_block; i--) {
    let data = await tweb3.getBlock({ height: i });

    if (ave_trx >= limit_blocks_txs) {
      limit_block = i - 1;
    } else {
      let num_txs = parseInt(data.block.header.num_txs);
      ave_trx += num_txs;
      // console.log(data.block.header.num_txs);
    }
  }

  for (let i = maxHeight; i > limit_block; i--) {
    let data_txs = await tweb3.searchTransactions("tx.height=" + i);
    let data = data_txs.txs;

    // console.log(data);

    for (let j = 0; j < data.length; j++) {
      transactions.push(utils.decodeTxResult(data[j]));
    }
  }
  getListBlockApi();
  getListTxApi();
  // store.dispatch(actions.setBlocks(blockchain.block_metas));
  // store.dispatch(actions.setTransactions(transactions));
  //   store.dispatch(getRealTimeBlocksAndTxs(blockchain.block_metas, transactions));
};

/**
 * @param {null} setPageSate set page state for block and txs when find them
 */

export const setPageSate = async () => {
  let res_block_count = await _get({}, countBlock);
  let total_block = res_block_count.data[0].count;

  let res_txs_count = await _get({}, countBlock);
  let total_txs = res_txs_count.data[0].count;

  //   store.dispatch(setIndex(total_block, total_txs));
};
