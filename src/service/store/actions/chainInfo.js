/*
 * action types
 */
export const actionTypes = {
  SET_BLOCKS: "SET_BLOCKS",
  SET_TRANSACTIONS: "SET_TRANSACTIONS",
  SET_TOTAL_CONTRACT: "SET_TOTAL_CONTRACT"
};
/*
 * action creators
 */
export const setBlocks = data => ({
  type: actionTypes.SET_BLOCKS,
  data
});
export const setTransactions = data => ({
  type: actionTypes.SET_TRANSACTIONS,
  data
});
export const setTotalContract = data => ({
  type: actionTypes.SET_TOTAL_CONTRACT,
  data
});
