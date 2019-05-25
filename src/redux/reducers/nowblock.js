let initState = { height: 0 }

export default function getNowBlock(state = initState, action) {
    switch (action.type) {
        case 'NOW_BLOCK':
            return { ...state, height: action.height }

        default:
            return state;
    }
}