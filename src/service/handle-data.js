import tweb3 from "../tweb3";
import { getListBlocks } from '../redux/actions/handleListBlocks';
import { utils } from 'icetea-web3';
import { getDataTransactions } from '../redux/actions/handleTransactions';
import { store } from './init-store';

/**
 * 
 * @param {number} height height of all Blocks
 * @param {number} pageIndex index of paging
 * @param {number} paramester amount of all block
 */

export const getBlocks = async (total_blocks, pageIndex, paramester) => {
    let maxHeight = total_blocks - (pageIndex - 1 ) * paramester;
    let minHeight = maxHeight - paramester;

    if (minHeight < 0) {
        minHeight = 0;
    }

    let options = {
        maxHeight,
        minHeight
    }
    // console.log(options);

    let data = await tweb3.getBlocks(options);
    let list_blocks = data.block_metas;

    store.dispatch(getListBlocks(list_blocks));
}

export const getTransactions = async (pageIndex, paramester, height, total_blocks, total_txs) => {

    let transactions = [];
    let data_txs;
    let data;

    if (height !== null) {
        data_txs = await tweb3.searchTransactions("tx.height=" + height);
        data = data_txs.txs;

        for(let i = 0 ;i < data.length; i ++){
            transactions.push(utils.decodeTxResult(data[i]));
        }

    } else {
        var num_max_txs = total_txs - paramester * (pageIndex -1);
        var num_min_txs = num_max_txs - paramester;
    
        // console.log(pageIndex)
    
        if (num_max_txs <= 0) {
            num_max_txs = num_max_txs + 20;
            num_min_txs = 0;
        }
    
        if (num_min_txs <= 0 ) {
            num_min_txs = 0;
        }
    
        // console.log(num_max_txs, num_min_txs, pageIndex);
    
        let option = {
            maxHeight: 0,
            minHeight: 0
        }
    
        let index_blocks = total_blocks;
    
        while (index_blocks !== 0) {
            let data = await tweb3.getBlock({ height: index_blocks });
            let height_txs = parseInt(data.block_meta.header.total_txs);
            if (num_max_txs === height_txs) {
                option.maxHeight = parseInt(data.block_meta.header.height);
                // console.log('maxHeight is', option.maxHeight);
            }
    
    
            if (num_min_txs === height_txs) {
                option.minHeight = parseInt(data.block_meta.header.height);
                // console.log('maxHeight is', option.minHeight);
            }
            index_blocks--;
        }
    
        for (let index = option.maxHeight; index > option.minHeight; index--) {
            // console.log(option.maxHeight, option.minHeight);
            let data_txs = await tweb3.searchTransactions('tx.height=' + index);
            let data = data_txs.txs;
            // console.log(data);
            for (let j = 0; j < data.length; j++) {
                let x = data[j];
                transactions.push(utils.decodeTxResult(x));
            }
        }
    }

    store.dispatch(getDataTransactions(transactions));
}