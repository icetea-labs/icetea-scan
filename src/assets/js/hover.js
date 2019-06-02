

export const checkScroll = (paramester) =>{
    if (document.documentElement.scrollTop > paramester) {
        return false
    }
    return true;
}

export default checkScroll;