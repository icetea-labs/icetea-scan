import tweb3 from '../../tweb3';
import store from '../../store';
import * as actions from '../../store/actions';

/**
 *
 * @param {string || number} getDataBlock get data of a single block
 * @return {Object}  data return a request, ex: { msg: string, data: object || boolean, status: number  }
 */

export const getDataBlock = async height => {
  try {
    let max_block = await tweb3.getBlock();
    let max_height = parseInt(max_block.block_meta.header.height);

    if (height > max_height) {
      return { msg: 'too_high', data: 'false', status: 400 };
    }

    if (height < 1) {
      return { msg: 'too_low', data: 'false', status: 400 };
    }

    let block_data = await tweb3.getBlock({ height });

    return { msg: 'ok', data: block_data.block_meta, status: 200 };
  } catch (err) {
    throw err;
  }
};
