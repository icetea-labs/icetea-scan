import tweb3 from '../../tweb3';
import store from '../../store';
import * as actions from '../../store/actions';

export const getTxHistoryByAddress = async address => {
  try {
    const fromList = await tweb3.searchTransactions("tx.from='" + address + "'", { per_page: 100 });
    const toList = await tweb3.searchTransactions("tx.to='" + address + "'", { per_page: 100 });
    const payerList = await tweb3.searchTransactions("tx.payer='" + address + "'", { per_page: 100 });
    const all = fromList.txs
      .concat(toList.txs)
      .concat(payerList.txs)
      .map(tweb3.utils.decodeTxResult);

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
export const getDataTransaction = async hash => {
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
