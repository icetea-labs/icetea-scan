import tweb3 from '../tweb3';
import { utils } from 'icetea-web3';
import { createStore } from 'redux';
import myReducer from '../redux/reducers/reducer';
import { getListBlocks } from '../redux/actions/handleListBlocks';
import { getDataTransactions } from '../redux/actions/handleTransactions';

// Store
export const store = createStore(myReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/**
 * @param {null} getFirstTxsData get data of 10 lastest block and lastest txs
 * 
 */


// get first blocks and transaction
export const getFirstTxsData= async () => {
    let blockCount = 0

    // load block data
    const blockchain = await tweb3.getBlocks();
    var myBlocks = blockchain.block_metas;

    if (myBlocks && myBlocks.length && myBlocks.length > blockCount) {
        blockCount = myBlocks.length;

        store.dispatch(getListBlocks(myBlocks));

        // load txs info
        const MAX_SHOW_TX = 20 // only show last 20 txs
        let txCount = 0
        let fromBlock = myBlocks[0].header.height

        for (let i = 0; i < blockCount; i++) {
            const num = +myBlocks[i].header.num_txs
            txCount += num;
            fromBlock--
            if (txCount > MAX_SHOW_TX) {
                break
            }
        }
        // load data trans
        const myTxs = await tweb3.searchTransactions('tx.height>' + fromBlock, { per_page: 20 });
        // console.log(fromBlock, txCount);

        let tsn = [];
        let len = myTxs.txs.length;

        for (let i = len -1 ; i >= 0; i--) {
            let tx = myTxs.txs[i];

            if (tx !== null) {
                tsn.push(utils.decode(tx));
            }
        }

        store.dispatch(getDataTransactions(tsn));
    }
}