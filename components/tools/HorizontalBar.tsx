import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const HorizontalBar = ({
  progress,
  width,
  barType,
  textColor,
  label,
  barColor = '#FFFF00',
  progressedColor = '#FFD700',
}: HorizontalBarProps) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500, 
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressInterpolate = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 300],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressed,
          {width: progressInterpolate, backgroundColor: progressedColor},
        ]}
      />
      <View style={styles.textAlign}>
        <View style={{flexDirection: 'row'}}>
         <Text>Higher</Text>
          <Icon
            name="arrowup"
            size={20}
            color="#000"
            style={{height: 20}}
          />
        </View>
       <Text>{progress}%</Text>
        <Text>1.2 Bonus</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#FFFF00',
    overflow: 'hidden',
  },
  progressed: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFD700',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF', // Main text color
    textShadowColor: '#000', // Shadow color (border color)
    textShadowOffset: { width: -1, height: 1 }, // Offset for shadow (border)
    textShadowRadius: 1, // Radius for shadow blur
  },
  textAlign: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingRight: 5,
    paddingLeft: 5,
    zIndex: 1
  },
});

export default HorizontalBar;
