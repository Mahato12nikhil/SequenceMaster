import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, ClipPath, Defs, Image, Polygon } from 'react-native-svg';
import VerticalBar from '../tools/VerticalBar';

const ScoreViewer = () => {
  const barsData = ['10%','20%','80%','100%']; 
  return (
    <View style={styles.container}>
      <View style={styles.circleWrapper}>
        <Svg height="50" width="50" style={styles.circleContainer}>
          <Defs>
            <ClipPath id="clip">
              <Circle cx="25" cy="25" r="24" />
            </ClipPath>
          </Defs>
          <Circle
            cx="25"
            cy="25"
            r="24"
            fill="none"
            stroke="purple"
            strokeWidth="3"
          />
          <Image
            x="0"
            y="0"
            width="50"
            height="50"
            preserveAspectRatio="xMidYMid slice"
            href={require('../../assets/images/dummy_team_icon.png')}
            clipPath="url(#clip)"
          />
        </Svg>
      </View>
      <View style={styles.barsContainer}>
        {barsData.map((height, index) => (
          <View style={{marginRight:20}}><VerticalBar key={index} height={height} /></View>
          
        ))}
      </View>
      <Svg height="40" width="250">
        <Polygon
          points="0,0 120,0 130,5 220,5 250,40 0,40"
          fill="blue"
          stroke="yellow"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </Svg>
      <Svg height="40" width="250">
        <Polygon
          points="0,0 250,0 250,40 0,40"
          fill="black"
          stroke="yellow"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circleWrapper: {
    position: 'absolute',
    top: '51%',
    left: -20,
    zIndex: 5,
  },
  circleContainer: {
   
  },
  barsContainer: {
    height:100,
    width:190,
    marginLeft:50,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom:2,
  },
});

export default ScoreViewer;
