import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Platform, Pressable, StyleSheet, View } from 'react-native';
import {TopSection} from './Sections/TopSection';
import InstructerSec from './Sections/InstructerSec';
import { useDispatch } from 'react-redux';
import Game from './game/Game';
import Launcher from './launcher/Launcher';
import Login from './login/Login';
import { HomeView, Tutorials } from './utility/Interfaces';
import { showMessage } from '../utils/logger';
import { getAsyncData, setAsyncData } from './utility/utils';
import { TUTORIAL_COMPLETE, TUTORIAL_COMPLETE_TRUE } from '../utils/constants';
import { useAppSelector } from '../state/UseTypedSelector';
import LoadingScreen from './utility/LoadingScreen';
import LoginContainer from './login/LoginContainer';


export const Home = () => {
  const screenState=useAppSelector((state) =>state.screen)
  const [tutorialMode, setTutorialMode] = useState<boolean>(true);
  const [selectedTutorial, setSelectedTutorial] = useState<any>(require('../assets/images/tut_account.png'));
  const [homeView, setHomeView] = useState<HomeView>(screenState.homeView);
  const [tutorialTag, setTutorialTag] = useState<string>('');

  const dispatch = useDispatch()

  function selectTutorial(selected: Tutorials) {
    setTutorialTag(selected)
    switch (selected) {
      case Tutorials.ACCOUNT:
        setSelectedTutorial(require('../assets/images/tut_account.png'));
        break;
      case Tutorials.POST_ACCOUNT:
        setSelectedTutorial(require('../assets/images/tut_account.png'));
        break;
      case Tutorials.MAIL:
        setSelectedTutorial(require('../assets/images/tut_mail.png'));
        break;
      case Tutorials.BONUS_MONEY:
        setSelectedTutorial(require('../assets/images/tut_money.png'));
        break;
      case Tutorials.REAL_MONEY:
        setSelectedTutorial(require('../assets/images/tut_money.png'));
        break;
      case Tutorials.ADD_MONEY:
        setSelectedTutorial(require('../assets/images/tut_add_money.png'));
        break;
      case Tutorials.WALLET:
        setSelectedTutorial(require('../assets/images/tut_withdrawl.png'));
        break;
      case Tutorials.EVENT:
        setSelectedTutorial(require('../assets/images/tut_event.png'));
        break;
      case Tutorials.GAME:{
        setSelectedTutorial(require('../assets/images/tut_game.png'));
      }
      case Tutorials.BONUS_CLAIM:{
        showMessage('Home',tutorialTag)
        setTutorialMode(false)
        setHomeView(HomeView.LAUNCHER)
        setAsyncData(TUTORIAL_COMPLETE,TUTORIAL_COMPLETE_TRUE)
      } 
        break;
      default:
        setSelectedTutorial(null);
        break;
    }
  }
  const checkTutorialMode = async () => {
    const tut_mode = await getAsyncData(TUTORIAL_COMPLETE);
    if (tut_mode && tut_mode===TUTORIAL_COMPLETE_TRUE) {    
      setTutorialMode(false);
      setHomeView(HomeView.LAUNCHER);
    }
  };
  
  useEffect(() => {
    checkTutorialMode(); 
  }, [])
  useEffect(() => {
    if(screenState.homeView!==HomeView.UNDEFINED){}
       setHomeView(screenState.homeView) 
  }, [screenState.homeView])
  
  return (
    <View style={styles.container} >
      <LoadingScreen visible={false}/>
      <ImageBackground
        source={require('../assets/images/game-bg.png')}
        style={styles.background}>
        <View style={{ height: '15%', width: '100%' }}>
          <TopSection gameMode={homeView===HomeView.GAME}/>
        </View>
        {tutorialMode && (
          <Image source={selectedTutorial} style={styles.overlayImage} />
        )}
        <View style={{ height: '80%', width: '100%', justifyContent: 'flex-end' }}>
          {homeView === HomeView.LOGIN && <LoginContainer />}
          {homeView === HomeView.LAUNCHER && <Launcher />}
          {homeView === HomeView.GAME && <Game />}
        </View>
        {tutorialMode && <View style={styles.instructorContainer}>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 5
  },
  overlayImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  instructorContainer: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateY: -50 }],
    width: '100%',
    height: '100%',
  },
  horizontalBarContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '50%',
    top: '35%',
  },
  scoreViewContainer: {
    position: 'absolute',
    left: '7%',
    top: '30%',
  },
});

export default Home;
