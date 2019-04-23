let initRealTimeData = {
    blocks: [],
    transactions: [],
};

export default function getRealTimeData (state = initRealTimeData, action) {
    switch (action.type) {
        case 'GET_REALTIME':
            
            return {...state, blocks: action.blocks, transactions: action.transactions};
    
        default:
            return state;
    }
}