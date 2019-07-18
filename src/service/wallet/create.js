import { ecc, AccountType } from '@iceteachain/common';
import tweb3 from '../../tweb3';

const newKeyPairWithAddress = ecc.newKeys;

export const createRegularKey = () => {
  let keyInfo = newKeyPairWithAddress(AccountType.REGULAR_ACCOUNT);

  return {
    privateKey: keyInfo.privateKey,
    address: keyInfo.address,
  };
};

export const createBankKey = isFaucet => {
  let keyInfo = newKeyPairWithAddress(AccountType.BANK_ACCOUNT);

  tweb3.wallet.importAccount(keyInfo.privateKey);
  tweb3.wallet.defaultAccount = keyInfo.address;

  isFaucet &&
    tweb3
      .contract('system.faucet')
      .methods.request(/* address */)
      .sendCommit({ from: keyInfo.address, payer: 'system.faucet' })
      .catch(handleError);

  return {
    privateKey: keyInfo.privateKey,
    address: keyInfo.address,
  };
};

const handleError = function(error) {
  console.error(error);
  window.alert(String(error));
};
