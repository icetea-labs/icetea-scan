import React from 'react';
import { Link } from 'react-router-dom';
import { ContractMode } from '@iceteachain/common';
import moment from 'moment';
import { toTEA, diffTime } from '../../utils';

export function Hash(props) {
  return (
    <Link to={`/tx/${props.value}`} title={props.value} {...props}>
      {props.children ? props.children : props.value}
    </Link>
  );
}
export function Block(props) {
  return (
    <Link to={`/block/${props.value}`} title={props.value} {...props}>
      {props.children ? props.children : props.value}
    </Link>
  );
}
export function Address(props) {
  return (
    <React.Fragment>
      {props.value ? (
        <Link to={`/address/${props.value}`} title={props.value} {...props}>
          {props.children ? props.children : props.value}
        </Link>
      ) : (
        <span>--</span>
      )}
    </React.Fragment>
  );
}
export function TxType(props) {
  let txType = 'transfer';
  let typeColor = 'transfer';

  if (props.value === 0) {
    txType = 'deploy';
    typeColor = 'deploy';
  } else if (props.value === 1) {
    txType = 'call';
    typeColor = 'call';
  }
  typeColor += ' fa fa-circle';

  return (
    <React.Fragment>
      <i className={typeColor} />
      <span>{txType}</span>
    </React.Fragment>
  );
}
export function Age(props) {
  return <span>{diffTime(props.value)}</span>;
}
export function TimeWithFormat(props) {
  const formatValue = props.format ? props.format : 'MMMM-DD-YYYY h:mm:ss';
  return <span>{moment(props.value).format(formatValue)}</span>;
}
export function Balance(props) {
  return <span>{`${toTEA(props.value)} TEA`}</span>;
}
export function Language(props) {
  return <span>{props.value === ContractMode.WASM ? 'WebAssembly' : 'JavaScript'}</span>;
}
export function HeaderMap(props) {
  return (
    <div className="breadcrumb">
      {props.value.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {index !== 0 && <div className="breadcrumb-separator">/</div>}
            <span className="breadcrumb-item">
              <Link to={item.path}>{item.text}</Link>
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}
export function TotalInfo(props) {
  return (
    <React.Fragment>
      {props.total > 0 ? (
        <div className="sub-title">
          More than > <span>{props.total}</span> {props.text[0]} found
        </div>
      ) : (
        <div className="sub-title">
          <span>{props.total}</span> {props.text[1]} found
        </div>
      )}
    </React.Fragment>
  );
}
