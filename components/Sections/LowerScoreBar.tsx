import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { COLOR_YELLOW } from '../../utils/constants';

export default function LowerScoreBar() {
  return (
    <View style={{ }}>
      <View style={styles.imgcontainer}></View>
      <View style={{ zIndex: 1 }}>
        <ImageBackground
          source={require('../../assets/images/scoreback.png')}
          resizeMode="stretch"
          style={styles.scoreBack}
        >
          <Text style={styles.scoreText}>234-4</Text>
        </ImageBackground>
      </View>
      <View style={styles.scoreViewDiagContainer}>
        <Image
          source={require('../../assets/images/scoreviewdiag.png')}
          style={styles.scoreViewDiag}
        />
      </View>
      <Image
        source={require('../../assets/images/straightbar.png')}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.lowerPortion}>
        {/* Design to be done for lower portion */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgcontainer: {
    width: '100%',
  },
  scoreBack: {
    width: 100,
    height: 40,
    marginLeft: '13%',
  },
  scoreText: {
    color: 'white',
    marginLeft:30,
    marginTop:10
  },
  scoreViewDiagContainer: {
    marginLeft: '10%',
    marginTop: -33, 
  },
  scoreViewDiag: {
    zIndex: 0,
  },
  image: {
    width: '100%',
  },
  lowerPortion: {
    height: 45,
    width: '100%',
    backgroundColor: 'black',
    marginTop: -2, 
  },
});
