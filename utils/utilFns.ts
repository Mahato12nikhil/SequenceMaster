import {BALANCE_DECIMAL_PRECISION} from './config';
import {store as reduxStore} from '../state/store';
import { GAMETYPE } from './constants';

export function roundTwoDecimalPlace(n: number) {
  if (typeof n !== 'number') {
    throw new Error('expected number');
  }
  // @ts-ignore
  const num = Math.round(n + 'e' + BALANCE_DECIMAL_PRECISION);
  return Number(num + 'e' + -BALANCE_DECIMAL_PRECISION);
}

export const SCALE_FACTOR = Math.pow(10, BALANCE_DECIMAL_PRECISION);

export function doubleDigitNum(n: number): string {
  if (n < 0) {
    throw new Error('Cannot add left padding for negative numbers');
  }
  return n < 10 ? '0' + n : n.toString();
}

export function formatDateTime(dt: number): string {
  const date = new Date(dt);
  const year = date.getFullYear();
  const month = doubleDigitNum(date.getMonth() + 1);
  const dd = doubleDigitNum(date.getDate());
  const hh = doubleDigitNum(date.getHours());
  const mm = doubleDigitNum(date.getMinutes());
  const ss = doubleDigitNum(date.getSeconds());
  return `${dd}/${month}/${year} ${hh}:${mm}:${ss}`;
}

export function hasBalance(amount: number, gameType:string): boolean {
  if(gameType===GAMETYPE.REAL_MONEY)
    return reduxStore.getState().wallet.balance >= amount;
  return reduxStore.getState().wallet.virtualBalance>=amount;
}
