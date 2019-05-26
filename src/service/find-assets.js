import tweb3 from "../tweb3";

/**
 * @param {height: number, max_height: number} findBlock -return await of block
 * 
 */

export const findBlocks = async (height, max_height) => {

    let result = [];
    try {

        for (let index = 0; index < max_height; index++) {

            let check = 0;
            let block_height = index.toString();
            let data_height = height.toString();

            for (let j = 0; j < block_height.length; j++) {
                if (data_height[j] === block_height[j]) {
                    check += 1;
                } else {
                    check -= 1;
                }
            }

            if (check > 0) {
                result.push(await tweb3.getBlock({ height: block_height }));
                // break;
            }
        }
        // find by height

    } catch (error) {
        // console.log(error);
        throw error;
    }

    return result;
}

/**
 * 
 *@param {findTxs: string} findTxs find tranas
 @return {Array<Object>} return list of txs
 */

export const findTxs = async (hash, pageIndex) => {
    let result = []
    //TODO: find by hash

    let all_txs = [];
    // console.log(hash, pageIndex);

    for (let i = 0; i < pageIndex; i++) {

        let data_txs = await tweb3.searchTransactions("tx.height>0", { page: i, per_page: 20 });
        let data = data_txs.txs;
        // console.log(data);

        for (let j = 0; j < data.length; j++) {
            all_txs.push(data[j]);
        }
    }

    // console.log(all_txs);

    let find_hash = hash.toString();
    try {

        // find by hash
        for (let i = 0; i < all_txs.length; i++) {
            let tx = { ...all_txs[i], check: 0 };

            for (let j = 0; j < find_hash.length; j++) {
                if (tx.hash[j] === find_hash[j]) {
                    tx.check += 1;
                } else {
                    tx.check -= 1;
                }
            }

            if (tx.check >= 0) {
                result.push(tx);
            }
        }
        // console.log(result);

        if (result.length !== 0) {
            quickSort(0, result.length - 1, (result.length - 1 + 0) / 2, result);
        }


    } catch (error) {
        console.log(error);
        throw error;
    }

    // console.log(result);

    return result;
}

function quickSort(max, min, center, result) {
    if ((max - min) === 1) {
        return -1;
    } else {
        let _max = result[max].check;
        let _min = result[min].check;

        // đệ quy
        if (min + 1 === center) {
            quickSort(min, center - 1, (center - 1 - min) / 2, result);
            quickSort(center , max - 1, (max - 1 - center) / 2, result);
        }

        // Swap
        if (_min > _max) {
            let temp = result[min];
            result[min] = result[max];
            result[max] = temp;
        }
    }
}

export const findAccount = async (value) => {
    let result = [];

    return result;
}