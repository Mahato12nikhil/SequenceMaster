import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Svg, {Circle, ClipPath, Defs, Image, Polygon} from 'react-native-svg';
import VerticalBar from '../tools/VerticalBar';
import { COLOR_YELLOW } from '../../utils/constants';

const ScoreViewer = () => {
  const barsData = ['10%', '20%', '80%', '100%'];
  const overs = ['5-10', '11-15', '16-20', '21-30'];
  const runs = [10, 20, 80, 100];
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
          <View style={{marginRight: 30}}>
            <VerticalBar key={Math.random().toString()} height={height} />
          </View>
        ))}
      </View>
      <View>
        
      </View>
      <Svg height="40" width="250">
        <Polygon
          points="0,0 120,0 130,5 220,5 250,40 0,40"
          fill="blue"
          stroke="yellow"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        <Text style={styles.teamName}>RBC</Text>
       
      </Svg>
      <Svg height="40" width="250">
        <Polygon
          points="0,0 250,0 250,40 0,40"
          fill="rgba(28, 28, 18, 1)"
          stroke="yellow"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                {color: 'rgba(192, 142, 107, 1)', fontSize: 12, marginLeft: 3},
              ]}>
              Overs
            </Text>
            <View style={{flexDirection: 'row'}}>
              {overs.map(data => {
                return (
                  <Text
                    style={[
                      styles.overText,
                      {color: 'rgba(255,255,255,1)', marginLeft: 18},
                    ]}>
                    {data}
                  </Text>
                );
              })}
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                {color: 'rgba(192, 142, 107, 1)', fontSize: 12, marginLeft: 3},
              ]}>
              Runs
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              {runs.map(data => {
                return (
                  <Text
                    style={[
                      styles.overText,
                      {color: 'rgba(255,255,255,1)', marginLeft: 30},
                    ]}>
                    {data}
                  </Text>
                );
              })}
            </View>
          </View>
          <View></View>
        </View>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft:20,
    height:'auto',
    width:250,
  },
  circleWrapper: {
    position:'absolute',
    top:'52%',
    left:-20,
    zIndex:1,
  },
  circleContainer: {},
  barsContainer: {
    height: 100,
    width: 190,
    marginLeft: 50,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 2,
  },
  overText: {
    fontSize: 10,
    lineHeight: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  teamName: {
    color: 'white',
    fontFamily: 'JejuGothic',
    marginLeft: 40,
    marginTop:'1%',
    fontSize:25
  },
  vsTeam:{
    fontSize:15,
    marginLeft:100,
    color:'white',
    fontFamily: 'JejuGothic',
  }
});

export default ScoreViewer;
