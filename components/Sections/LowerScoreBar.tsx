import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';

export default function LowerScoreBar() {
  return (
    <View style={{marginTop: 5}}>
      <View style={styles.imgcontainer}>
        <View style={{marginLeft: '15%', marginTop: 15}}>
          <Image source={require('../../assets/images/scoreviewdiag.png')} />
        </View>
        <Image
          source={require('../../assets/images/straightbar.png')}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={{position: 'absolute', zIndex: 4, left: '19%', top: '6%'}}>
        <ImageBackground
          source={require('../../assets/images/scoreback.png')}
          resizeMode="stretch"
          style={{
            height: 40,
            marginLeft: '3%',
            padding: 5,
            paddingBottom: 5,
            alignItems: 'center',
            justifyContent:'center'
          }}>
          <Text style={{color: 'white'}}>234-4</Text>
        </ImageBackground>
      </View>
      <View style={styles.lowerPortion}>
        {/*design to be done for lower portion*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgcontainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: '10%',
  },
  image: {
    width: '100%',
  },
  lowerPortion: {
    height: 45,
    width: '100%',
    backgroundColor: 'blue',
    position: 'absolute',
    top: '40%',
    zIndex: 2,
  },
});
