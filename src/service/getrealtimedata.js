import tweb3 from "../tweb3";
import { getRealTimeBlocksAndTxs } from "../redux/actions/handleRealTimeData";
import { setIndex } from "../redux/actions/handlePageState";
import { utils } from 'icetea-web3';
import { store } from './init-store';

export const getRealTimeData = async () => {
    // number to get values
    const limit_blocks_txs = 10

    // get 10 lastest block
    let last_block = await tweb3.getBlock();
    let maxHeight = last_block.block_meta.header.height;
    let minHeight = maxHeight - limit_blocks_txs;

    if (minHeight < 0) {
        minHeight = 0;
    }
    // console.log(last_block);

    let options = { minHeight, maxHeight }

    const blockchain = await tweb3.getBlocks(options);
    if (blockchain === null) {
        console.log('data is null');
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
        let data_txs = await tweb3.searchTransactions('tx.height=' + i);
        let data = data_txs.txs;

        // console.log(data);

        for (let j = 0; j < data.length; j++) {
            transactions.push(utils.decode(data[j]));
        }
    }
    
    // console.log(transactions);
    /**
     * @param getRealTimeBlocksAndTxs set value for realtime data 10 lastest block and 10 lastest transaction
     * @param setPageSize update value from max height of all blocks tendermint node have
     */

    store.dispatch(
        getRealTimeBlocksAndTxs(blockchain.block_metas, transactions)
    );

    store.dispatch(
        setIndex(parseInt(maxHeight), parseInt(last_block.block_meta.header.total_txs))
    );
}