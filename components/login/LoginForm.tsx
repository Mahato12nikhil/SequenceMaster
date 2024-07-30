import React, { useState } from 'react';
import { GestureResponderEvent, ImageBackground, Linking, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native';
import { COLOR_YELLOW } from '../../utils/constants';
import Checkbox from "react-native-bouncy-checkbox";
import AntIcon from 'react-native-vector-icons/AntDesign';
import InputBox from './InputBox';
import { showToast } from '../../utils/logger';
import { userLoginState, userRegLogState } from '../../state/reducers/UserSlice';
import { GetOTPAction } from '../../services/backend';
import { useAppDispatch, useAppSelector } from '../../state/UseTypedSelector';
import Button from './Button';
export default function LoginForm() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {termCondUrl} = useAppSelector(state => state.appConfig);
  const {loginState} = useAppSelector(state => state.user);
  const onPress = async () => {
    const canOpen = await Linking.canOpenURL(termCondUrl);
    if (canOpen) {
      await Linking.openURL(termCondUrl);
    }
  };
  const getOtpClick = async () => {
    if (phone.length !== 10) {
      const msg = 'Please enter valid Phone Number';
      showToast(msg,'info');
      return;
    }
    try {
      setLoading(true);
      await GetOTPAction(phone);
      setLoading(false);
      const payload = {value: userLoginState.otp, intermediatePhone: phone};
      dispatch(userRegLogState(payload));
    } catch (err) {
      const msg = 'Unknown error occurred';
      showToast(msg,'info');
      setLoading(false);
    }
  };
  const onChangePhone = (value: string) => {
    if (!/^[0-9]*$/.test(value) || value.length > 10) {
      return;
    }
    setPhone(value);
  };
  if (loginState !== userLoginState.login) {
    return <></>;
  }
  return (
      <View style={styles.login_items}>
        <Text style={{ fontSize: 24, color: COLOR_YELLOW }}>Log In</Text>
        <View style={styles.login_lower}>
          <InputBox label='Enter your phone number' value={phone} onChangeText={onChangePhone}/>
          <View style={{ flexDirection: 'row', marginTop: '3%' }}>
            <Checkbox size={20} style={{ marginTop: '1%' }} />
            <Text style={{ fontSize: 18, color: COLOR_YELLOW, marginTop: '1%', textAlign: 'center' }}>
              I have read the <Text onPress={onPress} style={{ textDecorationLine: 'underline' }}>Terms and condition</Text>
            </Text>
          </View>
          <Button onClick={getOtpClick} text='GET OTP' loading={loading} />
        </View>
      </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  login_container: {
    height: '100%',
    width: '100%',
  },
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

 
  closeIcon:{
    position:'relative',
    zIndex:2,
    top:2,
    left:'95%',
    color:COLOR_YELLOW
  }
});


