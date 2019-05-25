export function setIndex(total_blocks, total_txs){
    return{
        type: 'TOTAL_INDEX',
        total_blocks,
        total_txs
    }
}
