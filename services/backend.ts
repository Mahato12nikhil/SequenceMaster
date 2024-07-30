import RestService from "./rest";
import { ACTION_TYPES, baseURL } from "./urls";

export const serviceClient = new RestService({baseURL: baseURL});
const getClient = () => serviceClient.client;

export const GetOTPAction = (phone: string) => {
  const url = `${baseURL}?actionType=${ACTION_TYPES.GET_OTP}&phone=${phone}`;
  return getClient().get(url);
};

export const LoginAction = (phone: string, otp: string) => {
  const url = `${baseURL}?actionType=${ACTION_TYPES.CHECK_OTP}&phone=${phone}&otp=${otp}`;
  return getClient().get(url);
};
export const RenewToken = (phone: string, refreshToken: string) => {
  const payload = {
    actionType: ACTION_TYPES.REFRESH_TOKEN,
    phone,
    refreshToken,
  };
  return getClient().post(baseURL, payload);
};
export const GetAppConfigAction=()=>{
    const url = `${baseURL}?actionType=${ACTION_TYPES.APP_CONFIG}`;
    return getClient().get(url) ;

}
export const PingWebSocketServer = async (url: string) => {
    const data = await fetch(url);
    const text = await data.text();
    return text;
  };
  export const EnterGameAction = (amount: number,gameType:string) => {
    const payload = {actionType: ACTION_TYPES.ENTER_GAME, amount,gameType};
    return getClient().post(baseURL, payload);
  };
  
  export const LeaveGameAction = (gameToken: string) => {
    const payload = {actionType: ACTION_TYPES.LEAVE_GAME, gameToken};
    return getClient().post(baseURL, payload);
  };  

  export const GetBalanceAction = () => {
    const url = `${baseURL}?actionType=${ACTION_TYPES.GET_BALANCE}`;
    return getClient().get(url);
  };
  export const AddVirtualBalance=(amount:number,isLoginBonus:boolean=false)=>{
    const payload = {actionType: ACTION_TYPES.ACT_TYP_ADD_VIRTUAL_BALANCE, amount,isLoginBonus};
    return getClient().post(baseURL, payload);
  }
  export const AddBalanceInitAction = (amount: number) => {
    const payload = {actionType: ACTION_TYPES.ADD_BALANCE_INIT, amount};
    return getClient().post(baseURL, payload);
  };
  export const AddReferralCode=(amount:number)=>{
    const payload = {actionType: ACTION_TYPES.ACT_TYP_ADD_VIRTUAL_BALANCE, amount};
    return getClient().post(baseURL, payload);
  }
  export const AddBalanceFinalizeAction = (
    amount: number,
    transactionId: string,
    isSuccessful: boolean,
    errorReason?: string,
    trackingId?: string,
  ) => {
    const payload = {
      actionType: ACTION_TYPES.ADD_BALANCE_FINALIZE,
      amount,
      transactionId,
      isSuccessful,
      errorReason,
      trackingId,
    };
    return getClient().post(baseURL, payload);
  };
  
  export const WithdrawBalanceInitAction = (
    amount: number,
    receiverUpiId: string,
    confirmReceiverUpiId: string,
  ) => {
    const payload = {
      actionType: ACTION_TYPES.WITHDRAW_BALANCE_INIT,
      amount,
      receiverUpiId,
      confirmReceiverUpiId,
    };
    return getClient().post(baseURL, payload);
  };
  
  export const GetPaymentHistAction = (pageSize = 10, pageIndex = 0) => {
    const url = `${baseURL}?actionType=${ACTION_TYPES.GET_PAYMENT_HISTORY}&pageSize=${pageSize}&pageIndex=${pageIndex}`;
    return getClient().get(url);
  };
  
