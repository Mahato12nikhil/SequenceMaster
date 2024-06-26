import React from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

const VerticalBar = ({ height =80}:any) => {
  return (
    <TouchableOpacity style={[styles.container, { height: height }]} onPressIn={()=>console.log('vertical pressed')}>
      <View style={styles.innerBar} />
    </TouchableOpacity>
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
