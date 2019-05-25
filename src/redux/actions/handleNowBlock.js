export function setNowBlock(height) {
    return {
        type: 'NOW_BLOCK',
        height,
    }
}