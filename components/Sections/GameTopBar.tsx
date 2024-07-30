import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLOR_YELLOW } from '../../utils/constants';
import { useAppDispatch } from '../../state/UseTypedSelector';
import { updateHomeView } from '../../state/reducers/Screen';
import { HomeView } from '../utility/Interfaces';

export default function GameTopBar() {
  const dispatch=useAppDispatch()
    const arr=[1,2,3,4,5,6]
  function onExitPress(): void {
    dispatch(updateHomeView(HomeView.LAUNCHER))
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={styles.timerContainer}>
          <View>
            <Text style={[styles.timerText, {fontSize: 12}]}>
              Time Remaining
            </Text>
          </View>
          <View style={styles.timerBottom}>
            <Icon
              name="timer-outline"
              size={24}
              color="#fff"
              style={{height: 24, textAlign: 'center', margin: 2}}
            />
            <Text style={styles.timerText}>
              {'3'}/{'10'}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable style={styles.exitContainer} onPress={onExitPress}>
            <Text style={{fontWeight: 'bold', color: 'black', padding: 2}}>
              Exit stadium
            </Text>
            <EntypoIcon
              size={24}
              name="circle-with-cross"
              color="#000"
              style={{textAlign: 'center', margin: 2}}
            />
          </Pressable>
          <MaterialIcons
            size={50}
            name="error"
            color="white"
            style={{textAlign: 'center', margin: 2}}
          />
        </View>
        <View>
            <View>
                <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Last 6 rounds:</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                {arr.map((key,val)=>{
                    return (
                            <View style={[styles.dot,{backgroundColor:COLOR_YELLOW},{margin:2}]}></View>
                    )
                })}
            </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  timerContainer: {
    flexDirection: 'column',
    padding: 10,
  },
  timerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 20,
    color: 'white',
  },
  exitContainer: {
    backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
  },
  dot:{
    borderRadius:50,
    height:16,
    width:16
  }
});
