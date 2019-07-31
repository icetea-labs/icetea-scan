import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { ContractMode } from '@iceteachain/common';
import moment from 'moment';
import { toTEA, diffTime } from '../../utils';
import { Button } from 'antd';

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
      <span className="statusTx">
        <i className={typeColor} />
        <span>{txType}</span>
      </span>
    </React.Fragment>
  );
}
export function TxStatus(props) {
  return <span className={props.value ? 'error_color' : 'success_color'}>{props.value ? 'Error' : 'Success'}</span>;
}
export function TxTypeTranfer(props) {
  return (
    <div className="TxDirection">
      {props.txType === 0 || props.txType === 1 ? (
        <span>--</span>
      ) : (
        <div className={props.value === 'IN' ? 'In' : 'Out'}> {props.value}</div>
      )}
    </div>
  );
}

export function NumTxs(props) {
  return (
    <Link to={`/txs?height=${props.height}`}>
      <span>{`${props.value} Txns`} </span>
    </Link>
  );
}
export function Age(props) {
  return <span>{diffTime(props.value)}</span>;
}
export function TimeWithFormat(props) {
  const formatValue = props.format ? props.format : 'MMMM-DD-YYYY h:mm:ss';
  return <span className={props.className}>{moment(props.value).format(formatValue)}</span>;
}
export function Balance(props) {
  return <span>{`${toTEA(props.value)} TEA`}</span>;
}
export function Language(props) {
  let { address, isContractAddress } = props;
  return props.value === ContractMode.WASM ? (
    <span>WebAssembly</span>
  ) : (
    <div className="viewSource">
      <span>JavaScript</span>
      {isContractAddress && (
        <Button type="primary">
          <Link to={`/src/${address}`} target="_blank">
            View Source
          </Link>
        </Button>
      )}
    </div>
  );
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

const breakPoint = '992px';
const px2rem = px => `${px / 16}rem`;
const rem = px => `${px / 16}rem`;
export const media = {
  pc: (...args) =>
    css`
      @media (min-width: ${breakPoint}) {
        ${css(...args)}
      }
    `,
  mobile: (...args) =>
    css`
      @media (max-width: ${breakPoint}) {
        ${css(...args)}
      }
    `,
};
export const FlexBox = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  flex: ${props => props.flex};
  padding: ${props => props.padding};
  height: ${props => props.height};
  flex-wrap: ${props => props.wrap};
  margin: ${props => props.margin};
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
`;
export const FlexWidthBox = styled.div`
  width: ${props => props.width};
  ${media.mobile`
    width: 100%;
  `}
`;
export const FlexItem = styled.div`
  flex: ${props => props.flex || 1};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  width: ${props => props.width};
`;
export const ShadowBox = styled.div.attrs({
  className: 'shadow_box',
})`
  width: ${props => props.width};
  background-color: #fff;
  box-shadow: 0px 2px 10px 0px rgba(90, 102, 124, 0.1);
  padding: ${props => props.padding};
  box-sizing: border-box;
  margin: ${props => props.margin};
  ::-webkit-scrollbar {
    width: 4px;
    border-radius: 4px;
    background-color: #fff;
  }
  ::-webkit-scrollbar-track {
    background-color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #dfe2e7;
  }
  ::-webkit-scrollbar-corner {
    background-color: #fff;
  }
  ${media.mobile`
    padding: ${props => props.padding && '16px 12px'};
    margin: 0px 0px 16px 0px;
  `}
`;
export const TextOvewflow = styled.div.attrs({
  className: 'text-overflow',
})`
  width: ${props => props.width};
`;
export const LayoutDisplay = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 1100;
  background: rgba(0, 0, 0, 0.4);
`;
