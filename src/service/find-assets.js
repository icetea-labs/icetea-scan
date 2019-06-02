import tweb3 from "../tweb3";

/**
 * @param {height: number, max_height: number} findBlock -return await of block
 * 
 */

export const findBlocks = async (height) => {

    let last_block = await tweb3.getBlock();
    let max_height = last_block.block_meta.header.height
    let result = [];
    let sortArray;
    try {

        for (let index = 0; index < max_height; index++) {
            let block_height = index.toString();
            let data_height = height.toString();
            let check = 0;

            for (let j = 0; j < block_height.length; j++) {
                if (data_height[j] === block_height[j]) {
                    check += 1;
                } else {
                    if (data_height > 1) {
                        check -= 1;
                    }
                }
            }

            if (check >= 0) {
                let data = await tweb3.getBlock({ height: block_height })
                result.push({ ...data, check });
                // break;
            }
        }

        // sortArray = quickSort(result, 0, result.length - 1);
        sortArray = result.sort((a, b) => {
            return (
                b.check - a.check
            )
        })

    } catch (error) {
        // console.log(error);
        throw error;
    }

    return sortArray;
}

/**
 * 
 *@param {findTxs: string} findTxs find tranas
 @return {Array<Object>} return list of txs
 */

export const findTxs = async (hash) => {
    let result = []
    let all_txs = [];
    let sortArray;
    let last_block = await tweb3.getBlock();
    let pageIndex = parseInt(last_block.block_meta.header.num_txs) / 20;

    for (let i = 0; i < pageIndex; i++) {

        let data_txs = await tweb3.searchTransactions("tx.height>0", { page: i, per_page: 20 });
        let data = data_txs.txs;
        // console.log(data);

        for (let j = 0; j < data.length; j++) {
            all_txs.push(data[j]);
        }
    }

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

            if (tx.check > 0) {
                result.push(tx);
            }
        }

        sortArray = result.sort((a, b) => {
            return (
                a.check - b.check
            )
        })
    } catch (error) {
        // console.log(error);
        throw error;
    }
    return sortArray;
}


// Swap
// function swap(items, left_index, right_index) {
//     let temp = items[left_index];
//     items[left_index] = items[right_index];
//     items[right_index] = temp;
// }

// function parition(items, left_index, right_index) {
//     let pivot = items[Math.floor((right_index + left_index) / 2)].check;
//     let i = left_index;
//     let j = right_index;

//     while (i <= j) {
//         while (items[i].check < pivot.check) {
//             i++;
//         }

//         while (items[j].check > pivot.check) {
//             j--;
//         }

//         if (i < j) {
//             swap(items, i, j);
//             i++;
//             j--;
//         }
//     }
// }

// function quickSort(items, left_index, right_index) {
//     let index;
//     if (items.length > 1) {
//         index = parition(items, left_index, right_index);
//         if (left_index < index - 1) {
//             quickSort(items, left_index, index - 1);
//         }

//         if (index < right_index) {
//             quickSort(items, index, right_index);
//         }
//     }
//     return items
// }