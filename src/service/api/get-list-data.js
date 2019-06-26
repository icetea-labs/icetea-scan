import { _get } from "./base-api";
import { listBlocks, listTxs } from "./list-api";
import { store } from "../init-store";
import { getListBlocks } from "../../redux/actions/handleListBlocks";
import { getListTxs } from "../../redux/actions/handleTransactions";

export const getListBlockApi =  async (params) => {
    let response = await _get(params, listBlocks);

    try {
        if (response.status === 200){
            let data = response.data;
            store.dispatch(getListBlocks(data));
        }
    } catch (err){
        throw err
    }
}

export const getListTxApi =  async (params) => {
    let response = await _get(params, listTxs);

    try {
        if (response.status === 200){
            let data = response.data;
            store.dispatch(getListTxs(data));
        }
    } catch(err){
        throw err;
    }
}