import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {COLOR_WHITE, COLOR_YELLOW} from '../../utils/constants';
import TopleftSection from './TopLeftSection';
import TopRightSection from './TopRightSection';
import TopMidSection from './TopMidSection';
import GameTopBar from './GameTopBar';

export default function TopSection() {

  const gameMode=true
  return (
    <View style={styles.top_container}>
      {gameMode && <View style={{width:'80%',height:'100%'}}><GameTopBar/></View>}
      {!gameMode && <ImageBackground
        source={require('../../assets/images/rectangle20.png')}
        style={styles.top_left_back}
        resizeMode="stretch">
        <TopleftSection />
      </ImageBackground>}
      {!gameMode && <ImageBackground
        source={require('../../assets/images/rectangle22.png')}
        style={styles.top_middle_back}
        resizeMode="stretch">
        <TopMidSection />
      </ImageBackground>}
      <ImageBackground
        source={require('../../assets/images/rectangle21.png')}
        style={[styles.top_right_back,gameMode && {backgroundColor:'black'}]}
        resizeMode="stretch">
        <TopRightSection />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  top_container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  top_left_back: {
    flex: 1,
    height: '100%',
  },
  top_middle_back: {
    flex: 2,
    height: '80%',
  },
  top_right_back: {
    flex: 1,
    height: '100%',
  },
});
