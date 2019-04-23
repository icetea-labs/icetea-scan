import tweb3 from '../tweb3';
import {utils} from 'icetea-web3';
import { createStore } from 'redux';
import myReducer from '../redux/reducers/index';
import { getAllBlocks } from '../redux/actions/getAllBlocks';
import { getAllTransactions } from '../redux/actions/getAllTransactions';

// Store
export const store = createStore(myReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// get all blocks and transaction
export const getData = async () => {
  let blockCount = 0

  // load block data
  const blockchain = await tweb3.getBlocks();
  var myBlocks = blockchain.block_metas;
  // console.log(myBlocks);
  // console.log(blockCount);
  
  if (myBlocks && myBlocks.length && myBlocks.length > blockCount) {
    blockCount = myBlocks.length

    // get Block data
    store.dispatch(getAllBlocks(myBlocks));

    // load txs info
    const MAX_SHOW_TX = 30 // only show last 30 txs
    let txCount = 0
    let fromBlock = myBlocks[0].header.height

    console.log(fromBlock);

    for (let i = 0; i < blockCount; i++) {
      const num = +myBlocks[i].header.num_txs
      txCount += num;
      fromBlock--
      if (txCount > MAX_SHOW_TX) {
        break
      }
    }

    // load data trans
    const myTxs = await tweb3.searchTransactions('tx.height>' + fromBlock, { per_page: txCount });
    console.log(fromBlock, txCount);

    if (myTxs.txs && myTxs.txs.length) {
      const tsn = [];
      myTxs.txs.forEach(data =>{
        tsn.push(utils.decode(data));
      });
      store.dispatch(getAllTransactions(tsn));
    }

  }
}