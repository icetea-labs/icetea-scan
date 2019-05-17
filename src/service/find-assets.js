import tweb3 from "../tweb3";

export const findBlocks = async (height, max_height) => {

    console.log(max_height)

    let result = [];
    try {

        for (let index = 0; index < max_height; index++) {

            let check = 0;
            let block_height = index.toString();
            let data_height = height.toString();

            for (let j = 0; j < block_height.length; j++) {


                if (data_height[j] === block_height[j]) {
                    check += 1;
                }  else{
                    check -=1;
                }
            }


            if (check > 0) {
                console.log(index)
                result.push(await tweb3.getBlock({ height: block_height }));
            }
        }
        // find by height

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