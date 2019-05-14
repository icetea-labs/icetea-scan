import tweb3 from "../tweb3";

export const findBlocks = async (value) => {

    let result = [];

    try {

        // find by height
        let height_result = await tweb3.getBlock({ height: value });
        console.log(height_result);

        if (height_result !== null) {
            result.push(height_result);
        }

        // find by hash 
        // not support

    } catch (error) {
        console.log(error);
        throw error;
    }

    // TODO: find by hash
    return result;
}

export const findTxs = async (hash) => {

    let result = []
    //TODO: find by hash
    try {

        // find by height
        let height_result = await tweb3.getTransaction(hash, 'hex');
        console.log(height_result);

        if (height_result !== null) {
            result.push(height_result);
        }

        // find by hash 
        // not support

    } catch (error) {
        console.log(error);
        throw error;
    }

    return result;
}

export const findAccount = async (value) => {

    let result = [];

    return result;
}