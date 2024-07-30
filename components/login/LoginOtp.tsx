import React, { useEffect, useState } from 'react'
import {  StyleSheet, Text, View } from 'react-native'
import Checkbox from "react-native-bouncy-checkbox";
import InputBox from './InputBox';
import { useInterval } from '../../hooks';
import { userLoginState } from '../../state/reducers/UserSlice';
import { useAppDispatch, useAppSelector } from '../../state/UseTypedSelector';
import { showToast } from '../../utils/logger';
import { updateTokenThunk } from '../../state/reducers/tokenSlice';
import { AddVirtualBalance, LoginAction } from '../../services/backend';
import { COLOR_YELLOW, VIRTUAL_BALANCE_AMOUNT } from '../../utils/constants';
import Button from './Button';
export default function LoginOtp() {

    const {otpLength, resendOtpTimer} = useAppSelector(state => state.appConfig);
    const {loginState, intermediatePhone} = useAppSelector(state => state.user);
    const [timer, setTimer] = useState(resendOtpTimer);
    const [showTimer, setShowTimer] = useState(false);
    const [showResend, setShowResend] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    useInterval(
        () => {
          setTimer(timer > 0 ? timer - 1 : 0);
        },
        showTimer ? 1000 : null,
      );
    
      useEffect(() => {
        if (loginState === userLoginState.otp) {
          setTimer(resendOtpTimer);
          setShowTimer(true);
          setShowResend(false);
        }
      }, [loginState, resendOtpTimer]);
    
      useEffect(() => {
        if (timer === 0) {
          setShowTimer(false);
          setShowResend(true);
        }
      }, [timer]);
    
      const onLoginClick = async () => {
        if (otp.length !== otpLength) {
          const msg = `OTP is of ${otpLength} digits`;
          showToast(msg,'info');
          return;
        }
        try {
          setLoading(true);
          if (!intermediatePhone) {
            throw new Error('phone is not entered');
          }
          const {data} = await LoginAction(intermediatePhone, otp);
          setLoading(false);
          dispatch(updateTokenThunk(data));
          await AddVirtualBalance(VIRTUAL_BALANCE_AMOUNT, true);
        } catch (err) {
          showToast(''+err,'error');
          setLoading(false);
        }
      };
    
      const onChangeOtp = (value: string) => {
        if (!/^[0-9]*$/.test(value) || value.length > otpLength) {
          return;
        }
        setOtp(value);
      };
    
      if (loginState !== userLoginState.otp) {
        return <></>;
      }
    
  return (
    <View style={styles.login_items}>
    <Text style={{ fontSize: 24, color: COLOR_YELLOW }}>Log In</Text>
    <View style={styles.login_lower}>
      <InputBox label='Enter OTP' value={otp} onChangeText={onChangeOtp}/>
      <Button onClick={onLoginClick} text='Log In' loading={loading} />
    </View>
  </View> 
  )
}
const styles=StyleSheet.create({
    login_items: {
        marginTop: '2%',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
      },
      textBackground: {
        backgroundColor: 'white',
      },
      login_lower: {
        marginTop: '3%',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
      },
    
})
