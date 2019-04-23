

let initPageState = { pageIndex: 1, pageSize: 1 };

export default function changePageState(state = initPageState, action) {
    switch (action.type) {
        case 'SIZE_INDEX': {
            return { ...state, pageSize: action.pageSize }
        }
        case 'FIRST_INDEX':
            return { ...state, pageIndex: 1 };

        case 'LAST_INDEX':
            return { ...state, pageIndex: state.pageSize };

        case 'NEXT_INDEX':
            if (action.pageIndex === state.pageSize) {
                return { ...state, pageIndex: state.pageSize }
            }
            return { ...state, pageIndex: action.pageIndex + 1 };

        case 'BEYOND_INDEX':
            if (action.pageIndex === 1) {
                return { ...state, pageIndex: 1 }
            }
            return { ...state, pageIndex: action.pageIndex - 1, };

        default:
            return state;
    }
}