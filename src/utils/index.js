import moment from "moment";

export const decimal = 6;

export function toTEA(unit) {
  return unit / 10 ** decimal;
}

export function toUNIT(tea) {
  const resp = tea.toFixed(decimal);
  return resp * 10 ** decimal;
}
export function diffTime(time) {
  // Set new thresholds
  moment.relativeTimeThreshold("s", 60);
  moment.relativeTimeThreshold("m", 60);
  moment.relativeTimeThreshold("h", 20);
  // moment.relativeTimeThreshold("d", 25);
  // moment.relativeTimeThreshold("M", 10);

  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "%d seconds",
      ss: "%d seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    }
  });
  return moment(time).fromNow();
}

export function convertTxType(dataOp) {
  let txType = "transfer";
  if (dataOp === 0) {
    txType = "deploy";
  } else if (dataOp === 1) {
    txType = "call";
  }
  return txType;
}
