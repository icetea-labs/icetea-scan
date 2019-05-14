export function getRealTimeBlocksAndTxs(blocks, transactions){
    return {
        type: 'GET_REALTIME',
        blocks,
        transactions,
    }
}