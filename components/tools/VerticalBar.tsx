import React from 'react';
import { StyleSheet, View } from 'react-native';

const VerticalBar = ({ height =80}:any) => {
  return (
    <View style={[styles.container, { height: height }]}>
      <View style={styles.innerBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 15,
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: 'rgba(240, 217, 11, 1)',
  },
  innerBar: {
    flex: 1,
  },
});

export default VerticalBar;
