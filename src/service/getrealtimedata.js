import tweb3 from "../tweb3";
import { store } from "./getdata";
import { getFromTenderMint } from "../redux/actions/getRealTimeBlock";
import { setPageSize } from "../redux/actions/pageState";
import { utils } from 'icetea-web3';

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

        // 
        if (ave_trx >= limit_blocks_txs) {
            limit_block = i - 1;
        } else {
            ave_trx += data.block.header.num_txs;
        }
    }
    // console.log(limit_block);

    for (let i = maxHeight; i > limit_block; i--) {
        let data_txs = await tweb3.searchTransactions('tx.height=' + i, { per_page: 10 });
        let data = data_txs.txs;

        for (let j = 0; j < data.length; j++) {
            // console.log(data[j]);
            transactions.push(utils.decode(data[j]));
        }
    }
    // console.log(transactions);

    /**
     * @param getFromTenderMint set value for realtime data 10 lastest block and 10 lastest transaction
     * @param setPageSize update value from max height of all blocks tendermint node have
     */

    store.dispatch(
        getFromTenderMint(blockchain.block_metas, transactions)
    );

    store.dispatch(
        setPageSize(maxHeight)
    );
}