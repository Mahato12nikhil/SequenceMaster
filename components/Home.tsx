import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Platform, Pressable, StyleSheet, View } from 'react-native';
import TopSection from './Sections/TopSection';
import InstructerSec from './Sections/InstructerSec';
import HorizontalBar from './tools/HorizontalBar';
import ScoreViewer from './Sections/ScoreViewer';
import LowerScoreBar from './Sections/LowerScoreBar';
import { useDispatch } from 'react-redux';
import { fetchGameData } from '../state/reducers/GameReducer';

export const Home = () => {
  const [tutorialMode, setTutorialMode] = useState(true);
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null);
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(fetchGameData())
  }, [dispatch])
  
  function selectTutorial(selected: string) {
    switch (selected) {
      case 'account':
        setSelectedTutorial(require('../assets/images/tut_account.png'));
        break;
      case 'postaccount':
        setSelectedTutorial(require('../assets/images/tut_account.png'));
        break;
      case 'mail':
        setSelectedTutorial(require('../assets/images/tut_mail.png'));
        break;
      case 'bonus_money':
        setSelectedTutorial(require('../assets/images/tut_money.png'));
        break;
      case 'real_money':
        setSelectedTutorial(require('../assets/images/tut_money.png'));
        break;
      case 'add_money':
        setSelectedTutorial(require('../assets/images/tut_add_money.png'));
        break;
      case 'wallet':
        setSelectedTutorial(require('../assets/images/tut_withdrawl.png'));
        break;
      case 'event':
        setSelectedTutorial(require('../assets/images/tut_event.png'));
        break;
      case 'game':
        setSelectedTutorial(require('../assets/images/tut_game.png'));
        break;
      default:
        setSelectedTutorial(null);
        break;
    }
  }

  return (
    <View style={styles.container} >
      <ImageBackground
        source={require('../assets/images/game-bg.png')}
        style={styles.background}>
        <View style={{ height: '15%', width: '100%' }}>
          <TopSection />
        </View>
        
        
        {tutorialMode && (
          <Image source={selectedTutorial} style={styles.overlayImage} />
        )}
        <View style={styles.scoreViewContainer}>
          <ScoreViewer />
        </View>
       
        <View style={[styles.horizontalBarContainer]}>
          <View style={{marginBottom:15}}>
            <HorizontalBar
              progress={50}
              width={''}
              label={''}
              barType={''}
              barColor={''}
              textColor={''}
              progressedColor={'#FFD700'}
            />
          </View>
          <View style={{marginBottom:15}}>
          <HorizontalBar
            progress={24}
            width={''}
            label={''}
            barType={''}
            barColor={''}
            textColor={''}
            progressedColor={'#FFD700'}
          />
          </View>
          <View style={{marginBottom:15}}>
          <HorizontalBar
            progress={50}
            width={''}
            label={''}
            barType={''}
            barColor={''}
            textColor={''}
            progressedColor={'#FFD700'}
          />
          </View>
        </View>
        <View style={{ height: '25%', width: '100%', }}>
          <LowerScoreBar/>
        </View>
        {!tutorialMode && <View style={styles.instructorContainer}>
          <InstructerSec selectTutorial={selectTutorial} />
        </View>}
       
      </ImageBackground>
    </View>
  );
};
const isIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  overlayImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  instructorContainer: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateY: -50 }],
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  horizontalBarContainer: {
    position: 'absolute',
    width:'100%',
    height:'100%',
    left: '50%',
    top: '35%',
    zIndex: 2,
  },
  scoreViewContainer: {
    position: 'absolute',
    left: '7%',
    top: '30%',
    zIndex: 1,
  },
});

export default Home;
