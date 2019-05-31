import tweb3 from "../tweb3";
export const decimal = 6;
export const execContract = async (params, name_func, address, method, fee, value) => {

    console.log(name_func, method);
    let data = null;
    try {

        let contract = tweb3.contract(address);

        if (method === name_func){
            let tracsaction = await contract[name_func](...params).sendSync({
                value: toUNIT(parseFloat(value)),
                fee: toUNIT(parseFloat(fee))
            });
    
            if (tracsaction === null) {
                return {
                    code_status: 'address is fail', data: false, code: 400
                }
            }
        } else {
            data = await tweb3[method](address, name_func, params);

            if (data !== null) {
                return { code_status: 'success', data, code: 200 }
            }
        }
    } catch (err) {
        return { code_status: err, data: false, code: 404 }
    }
}

function toUNIT(tea) {
    tea = (+tea).toFixed(decimal)
    return tea * (10 ** decimal)
}
