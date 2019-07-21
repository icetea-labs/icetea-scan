import tweb3 from "../../tweb3";
export const decimal = 6;
export const execContract = async (params, name_func, address, method, fee, value) => {
    console.log(params, name_func, address, method, fee, value );
    let data = null;
    try {
        let contract = tweb3.contract(address);
        if (method === name_func) {
            let transaction = await contract[name_func](...params).sendSync({
                value: toUNIT(parseFloat(value)),
                fee: toUNIT(parseFloat(fee))
            });

            if (transaction === null) {
                return {
                    code_status: 'fail', data: false, code: 400
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

export const callWithWallet = async (from, to, value, fee, data) => {
    let formData = {
        from,
        to,
        value,
        fee,
        data,
    }
    formData = encodeURIComponent(JSON.stringify(formData));
    let url = encodeURIComponent('http://localhost:3006/address/'+ from +'?txSigned=');
    let result;
    if (formData) {
        window.location = "https://wallet.icetea.io/signTransaction/" + formData + "/" + url;
    } else {
        result = await tweb3.sendTransactionSync(formData, {});
    }

    console.log(result);
}

function toUNIT(tea) {
    tea = (+tea).toFixed(decimal)
    return tea * (10 ** decimal)
}