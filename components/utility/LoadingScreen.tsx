// LoadingScreen.js
import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Loader  from 'react-native-loader-kit';

const LoadingScreen = ({ visible }:any) => {
  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <View style={styles.container}>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <Loader
        style={{ width: 50, height: 50 }}
        name={'BallBeat'}
        color={'red'} 
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default LoadingScreen;
