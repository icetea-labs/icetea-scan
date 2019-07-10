import tweb3 from "../../tweb3";

/**
 * 
 * @param {string || number} getDataBlock get data of a single block
 * @return {Object}  data return a request, ex: { msg: string, data: object || boolean, status: number  } 
 */

export const getDataBlock = async (height) => {
    try {
        let max_block = await tweb3.getBlock();
        let max_height = parseInt(max_block.block_meta.header.height);

        if (height > max_height) {
            return { msg: "too_high", data: "false", status: 400 }
        }

        if (height < 1) {
            return { msg: "too_low", data: "false", status: 400 }
        }

        let block_data = await tweb3.getBlock({ height });

        return { msg: "ok", data: block_data.block_meta, status: 200 };
    } catch (err) {
        throw err;
    }
}

/**
 * 
 * @param {string} getDataContract get data of a single contract
 * @return {Object} data return a request, ex: { msg: string, data: object || boolean, status: number  } 
 */

export const getDataContract = async (address) => {

    let contract_data = await tweb3.getAccountInfo(address);

    if (contract_data !== null) {
        return { msg: 'ok', data: contract_data, status: 200 }
    }
    return { msg: 'can`t get data', data: false, status: 400 };
}

/**
 * 
 * @param {boolean} getAllContracts get list name of contract
 * @return {Object} data return a request, ex: { msg: string, data: object || boolean, status: number  } 
 */

export const getAllContracts = async (alias) => {
    let all_contract = await tweb3.getContracts(alias);

    if (all_contract !== null) {
        return { msg: 'ok', data: all_contract, status: 200 }
    }

    return { msg: 'can`t get data', data: false, status: 400 }
}

/**
 * @param {string} getMetadataContract
 * @return {object} return data of contract
 * 
 */

export const getMetadataContract = async (address) => {

    let metadata = null;
    try {
        metadata = await tweb3.getMetadata(address);
    } catch (err) {
        throw err
    }

    if (metadata === null) {
        return { msg: 'error in address', data: false, status: 404 }
    }

    return { msg: 'success', data: metadata, status: 200 }
}

/**
 * @param {string} getAddressInfo 
 * @return {object} return data of address
 */

export const getAccountInfo = async (address) => {

    let info = null;

    try {
        info = await tweb3.getAccountInfo('teat1t766tnnlcd3937rrlxjld9vzhcpxr5qwh8sqhq');
        if (info !== null) {
            return { msg: 'ok', data: info, status: 200 }
        }
    } catch (err) {
        throw err;
    }
    return { msg: 'can`t get data', data: false, status: 404 }
}

/**
 *  @param {string} getTransaction 
 * @return {object } return re  uest of data 
 */
export const getDataTransaction = async (hash) => {
    let info = null;

    try {
        info = await tweb3.getTransaction(hash, 'hex');

        if (info !== null) {
            return {msg: 'ok', data: info, status: 200}
        }
    } catch (err){
        throw err;
    }

    return {msg: 'can`t get data', data: false, status: 404}
}