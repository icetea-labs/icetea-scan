export function getFromTenderMint(blocks, transactions){
    return {
        type: 'GET_REALTIME',
        blocks,
        transactions,
    }
}