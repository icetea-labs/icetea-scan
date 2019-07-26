import axios from 'axios';

export const listBlocks = '/block/list';
export const countBlock = '/block/count';
export const singleBlock = '/block'; //:height
export const latestBlock = '/block/latest';

export const listTxs = '/tx/list';
export const singleTx = '/tx'; //:hash
export const countTxs = '/tx/count';

export const _get = async (params, api) => {
  const url = process.env.REACT_APP_API + api;
  const response = await axios.get(url, { params, headers: null });
  return response;
};
