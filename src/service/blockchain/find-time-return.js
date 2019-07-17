import tweb3 from "../../tweb3";
import moment from "moment";
// import { _get } from "./api/base-api";
// import { singleBlock } from "./api/list-api";

/**
 * 
 * @param {number} diffTime create array that setup time 
 * @return {Promise} if Promise.resolve have data that string like "10 h 20min 20 s"  
 */

export const diffTime = async (height) => {

  let diffTime = "";

  let blockInfo = await tweb3.getBlock({ height });

  // Get time of Tx by Block
  let blockTime = blockInfo.block_meta.header.time;

  let time_convert = moment(blockTime).format("DD/MM/YYYY HH:mm:ss");

  // Get time of Tx by Block

  // Set time for tx
  let currentTime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
  // console.log('currentTime', currentTime);
  let ms = moment(currentTime, "DD/MM/YYYY HH:mm:ss").diff(moment(time_convert, "DD/MM/YYYY HH:mm:ss"));
  let d = moment.duration(ms);

  if (d.days() > 0) {
    diffTime = ` ${d.days()} days ${d.hours()} hours ago `;
  } else if (d.hours() > 0) {
    diffTime = ` ${d.hours()} hours ${d.minutes()} mins ago `;
  } else if (d.minutes() > 0) {
    diffTime = ` ${d.minutes()} mins ${d.seconds()} secs ago `;
  } else {
    diffTime = ` ${d.seconds()} secs ago `;
  }
    // console.log(diffTime)
  return diffTime;
}

export default diffTime;