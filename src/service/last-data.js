import tweb3 from "../tweb3";

export async function getLastBlock() {

    let lastBlock = await tweb3.getBlock();

    let data = {
        time: lastBlock.block_meta.header.time,
        height: lastBlock.block_meta.header.height,
        total_txs: lastBlock.block_meta.header.total_txs,
        total_address: null
    }

    return lastBlock;
}