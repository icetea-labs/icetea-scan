import tweb3 from "../tweb3";
import moment from "moment";

/**
 * 
 * @param {number} diffTime create array that setup time 
 * @return {Promise} if Promise.resolve have data that string like "10 h 20min 20 s"  
 */

export const diffTime = async (height) => {

  console.log('check Height in diffTime',height);

  let diffTime = "";
  let blockInfo = await tweb3.getBlock({ height });
  // console.log('blockInfo CK', blockInfo);

  // Get time of Tx by Block
  let blockTime = moment(blockInfo.block_meta.header.time).format("DD/MM/YYYY HH:mm:ss");
  // console.log('blockTime CK', blockTime)

  // Set time for tx
  let currentTime = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
  // console.log('currentTime CK', currentTime)
  let ms = moment(currentTime, "DD/MM/YYYY HH:mm:ss").diff(moment(blockTime, "DD/MM/YYYY HH:mm:ss"));
  let d = moment.duration(ms);

  // console.log('ms CK', ms)
  // console.log('time check', d)

  if (d.days() > 0) {
    diffTime = ` ${d.days()} days ${d.hours()} hours ago `;
  } else if (d.hours() > 0) {
    diffTime = ` ${d.hours()} hours ${d.minutes()} mins ago `;
  } else if (d.minutes() > 0) {
    diffTime = ` ${d.minutes()} mins ${d.seconds()} secs ago `;
  } else {
    diffTime = ` ${d.seconds()} secs ago `;
  }

  //   console.log(diffTime)
  return diffTime;
}

export default diffTime;