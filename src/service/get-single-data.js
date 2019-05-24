import tweb3 from "../tweb3";

export const getDataBlock = async (height) => {
    try {
        let max_block = await tweb3.getBlock();
        let max_height = parseInt(max_block.block_meta.header.height);

        if (height > max_height) {
            return { code_status: "too_high", data: "false", code: 400 }
        }

        if (height < 1) {
            return { code_status: "too_low", data: "false", code: 400 }
        }

        let block_data = await tweb3.getBlock({ height });

        return { code_status: "ok", data: block_data.block_meta, code: 200 };
    } catch (err) {
        throw err;
    }
}


export const getDataContract = async (address) => {

    let contract_data = await tweb3.getAccountInfo(address);

    if (contract_data !== null) {
        return { code_status: 'ok', data: contract_data, code: 200 }
    }
    return { code_status: 'can`t get data', data: false, code: 400 };
}

export const getAllContracts = async(alias) => {
    let all_contract = await tweb3.getContracts(alias);

    if (all_contract !== null) {
        return { code_status: 'ok', data: all_contract, code: 200}
    }

    return {code_status: 'can`t get data', data: false, code: 400}
}
