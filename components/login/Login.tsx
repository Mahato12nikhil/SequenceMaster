import React, { useState } from 'react';
import { GestureResponderEvent, ImageBackground, Linking, StyleSheet, Text, View } from 'react-native';
import { COLOR_YELLOW } from '../../utils/constants';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useAppDispatch, useAppSelector } from '../../state/UseTypedSelector';
import LoginForm from './LoginForm';
import LoginOtp from './LoginOtp';
import { updateHomeView } from '../../state/reducers/Screen';
import { HomeView } from '../utility/Interfaces';
export default function Login() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {termCondUrl} = useAppSelector(state => state.appConfig);

  const onPress = async () => {
    const canOpen = await Linking.canOpenURL(termCondUrl);
    if (canOpen) {
      await Linking.openURL(termCondUrl);
    }
  };

  function onClose(event: GestureResponderEvent): void {
    dispatch(updateHomeView(HomeView.LAUNCHER))
  }

  return (
    <ImageBackground
      source={require('../../assets/images/login_container.png')}
      style={[styles.login_container]}
      resizeMode="contain">
      <AntIcon name='closecircleo' size={40} style={styles.closeIcon} onPress={onClose}></AntIcon>
      <LoginForm/>
      <LoginOtp/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  login_container: {
    height: '100%',
    width: '100%',
  },
  closeIcon:{
    position:'relative',
    zIndex:2,
    top:2,
    left:'95%',
    color:COLOR_YELLOW
  }
});


