export function firstIndex() {
    return {
        type: 'FIRST_INDEX',
    }
}

export function lastIndex() {
    return {
        type: 'LAST_INDEX'
    }
}

export function nextIndex(pageIndex) {
    return {
        type: 'NEXT_INDEX',
        pageIndex,
    }
}

export function beyondIndex(pageIndex) {
    return {
        type: 'BEYOND_INDEX',
        pageIndex,
    }
}

export function setPageSize(pageSize){
    return{
        type: 'SIZE_INDEX',
        pageSize
    }
}
