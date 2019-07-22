import axios from 'axios';
import {host} from '../../environment/env';

export const _get = async (params, api) => {
    let url = host + api;
    let response = await axios.get(url, {params , headers: null});
    return response;
}