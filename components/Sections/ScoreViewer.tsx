import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

const ScoreViewer = () => {
  return (
    <View style={styles.container}>
    <Svg height="200" width="200">
      <Polygon
        points="100,10 190,50 190,150 100,190 10,150 10,50"
        fill="lime"
        stroke="purple"
        strokeWidth="1"
      />
    </Svg>
  </View>
  );
};
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  });
export default ScoreViewer;
