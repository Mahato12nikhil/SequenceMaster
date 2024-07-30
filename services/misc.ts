
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY_REFRESH_TOKEN, KEY_USER_PHONE, KEY_HIDE_BAL_TS } from "../utils/constants";
import {NativeModules, Platform, ToastAndroid} from 'react-native';
import { UPI_NOTE, UPI_PAYEE_NAME } from "../utils/config";
const {UpiPayModule} = NativeModules;
export async function saveRefreshToken(token: string) {
    await AsyncStorage.setItem(KEY_REFRESH_TOKEN, token);
  }
  export async function saveUserPhone(phone: string) {
    await AsyncStorage.setItem(KEY_USER_PHONE, phone);
  }
  export async function getRefreshToken(): Promise<string | null> {
    const val = await AsyncStorage.getItem(KEY_REFRESH_TOKEN);
    return val;
  }
  export async function getUserPhone(): Promise<string | null> {
    const val = await AsyncStorage.getItem(KEY_USER_PHONE);
    return val;
  }
  export async function getHideBalanceTs(): Promise<string | null> {
    const val = await AsyncStorage.getItem(KEY_HIDE_BAL_TS);
    return val;
  }
  export async function saveHideBalanceTs(ts: number) {
    await AsyncStorage.setItem(KEY_HIDE_BAL_TS, ts.toString());
  }
  
  type PaymentResponse = {
    isSuccessful: boolean;
    response: string;
  };
  
  export async function openPaymentApp(
    vpa: string,
    amount: number,
    transactionRef: string,
  ): Promise<PaymentResponse> {
    if (!vpa) {
      throw new Error('vpa is required');
    }
    if (!amount || amount <= 0) {
      throw new Error('amount is required');
    }
    if (!Number.isInteger(amount)) {
      throw new Error('amount must be an integer');
    }
    if (!transactionRef) {
      throw new Error('transactionRef is required');
    }
    const url = `upi://pay?cu=INR&am=${amount}&pa=${encodeURIComponent(
      vpa,
    )}&pn=${encodeURIComponent(UPI_PAYEE_NAME)}&tr=${encodeURIComponent(
      transactionRef,
    )}&tn=${encodeURIComponent(UPI_NOTE)}`;
    const res = await UpiPayModule.initializePayment(url);
    return parsePaymentResponse(res);
  }
  
  function parsePaymentResponse(response: string): PaymentResponse {
    // [TODO]: Fix this code with better logic implementation
    let isSuccessful = false;
    const splitted = response.split('::');
    for (let val of splitted) {
      const inner = val.split('=>');
      if (inner.length === 2) {
        const k = inner[0];
        const v = inner[1];
        if (k === 'Status' && v?.toLowerCase() === 'success') {
          isSuccessful = true;
          break;
        }
        let isFound = false;
        if (k === 'response') {
          const parts = v.split('&');
          for (let p of parts) {
            const partsSplitted = p.split('=');
            if (partsSplitted.length === 2) {
              const kp = partsSplitted[0];
              const kv = partsSplitted[1];
              if (kp === 'Status' && kv?.toLowerCase() === 'success') {
                isSuccessful = true;
                isFound = true;
                break;
              }
            }
          }
        }
        if (isFound) {
          break;
        }
      }
    }
  
    return {isSuccessful, response};
  }
  