import React from 'react';
import { GestureResponderEvent, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native';
import { COLOR_YELLOW } from '../../utils/constants';
import Checkbox from "react-native-bouncy-checkbox";
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
export default function Login() {

  function onPress(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  const handleLogin = () => {
   
  };

  function onClose(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <ImageBackground
      source={require('../../assets/images/login_container.png')}
      style={[styles.login_container]}
      resizeMode="contain">
      <AntIcon name='closecircleo' size={40} style={styles.closeIcon} onPress={onClose}></AntIcon>
      <View style={styles.login_items}>
        <Text style={{ fontSize: 24, color: COLOR_YELLOW }}>Log In</Text>
        <View style={styles.login_lower}>
          <TextInput
            placeholder="Enter your phone number"
            style={styles.phone_input_back}
          />
          <View style={{ flexDirection: 'row', marginTop: '3%' }}>
            <Checkbox size={20} style={{ marginTop: '1%' }} />
            <Text style={{ fontSize: 18, color: COLOR_YELLOW, marginTop: '1%', textAlign: 'center' }}>
              I have read the <Text onPress={onPress} style={{ textDecorationLine: 'underline' }}>Terms and condition</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <View style={styles.loginButtonContent}>
              <Text style={styles.loginButtonText}>Login</Text>
              <Icon name='arrow-right-circle' size={20} style={styles.loginButtonIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
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
  phone_input_back: {
    backgroundColor: 'white',
    height: 'auto',
    width: '30%',
    textAlign: 'center',
    padding: 12,
    fontSize: 18,
    borderRadius: 5,
  },
  loginButton: {
    marginTop: '2%',
    width: '30%', 
    height: 'auto',
    padding: 12,
    backgroundColor: COLOR_YELLOW,
    borderRadius:5
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  loginButtonIcon: {
    marginLeft: 10,
  },
  closeIcon:{
    position:'relative',
    zIndex:2,
    top:2,
    left:'95%',
    color:COLOR_YELLOW
  }
});


