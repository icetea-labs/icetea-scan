import tweb3 from './tweb3';
// import store from '../../store';
// import * as actions from '../../store/actions';

export const getTxHistoryByAddress = async (address) => {
  try {
    const txFrom = await tweb3.searchTransactions(`system.from='${address}' AND system._ev = 'tx'`, { per_page: 100 });
    const txTo = await tweb3.searchTransactions(`system.to='${address}' AND system._ev = 'tx'`, { per_page: 100 });
    const txPayer = await tweb3.searchTransactions(`system.payer='${address}' AND system._ev = 'tx'`, { per_page: 100 });

    const all = txFrom.txs.concat(txTo.txs).concat(txPayer.txs); //.map(tweb3.utils.decodeTxResult);
    if (all) {
      return { msg: 'ok', data: all, status: 200 };
    }
  } catch (err) {
    throw err;
  }

  return { msg: 'can`t get data', data: false, status: 400 };
};

/**
 *  @param {string} getTransaction
 * @return {object } return re  uest of data
 */
export const getDataTransaction = async (hash) => {
  let info = null;

  try {
    info = await tweb3.getTransaction(hash, 'hex');

    if (info !== null) {
      return { msg: 'ok', data: info, status: 200 };
    }
  } catch (err) {
    throw err;
  }

  return { msg: 'can`t get data', data: false, status: 404 };
};
