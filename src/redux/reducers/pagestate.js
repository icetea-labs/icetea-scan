let initPageState = { pageBlockLimit: 1, pageTxsLimit: 1, total_blocks: 1, total_txs: 1 };

export default function changePageState(state = initPageState, action) {

    switch (action.type) {
        case 'TOTAL_INDEX': {
            return {
                ...state,
                total_blocks: action.total_blocks,
                total_txs: action.total_txs,
                pageBlockLimit: Math.ceil(action.total_blocks / 20) ,
                pageTxsLimit: Math.ceil(action.total_txs / 20) - 1,
            }
        }

        default:
            return state;
    }
}