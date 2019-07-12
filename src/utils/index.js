import React from "react";
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
  // moment.relativeTimeThreshold("s", 10);
  moment.relativeTimeThreshold("ss", 60);
  moment.relativeTimeThreshold("m", 60);
  moment.relativeTimeThreshold("h", 20);
  // moment.relativeTimeThreshold("d", 25);
  // moment.relativeTimeThreshold("M", 10);

  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "%d secs",
      ss: "%d secs",
      m: "a minute",
      mm: "%d minutes",
      h: "%d hour",
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
  let typeColor = "transfer";

  if (dataOp === 0) {
    txType = "deploy";
    typeColor = "deploy";
  } else if (dataOp === 1) {
    txType = "call";
    typeColor = "call";
  }
  typeColor += " fa fa-circle";

  return (
    <React.Fragment>
      <i className={typeColor} />
      <span>{txType}</span>
    </React.Fragment>
  );
}
