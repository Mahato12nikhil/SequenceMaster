import React, {useState} from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import TopSection from './Sections/TopSection';
import InstructerSec from './Sections/InstructerSec';
import HorizontalBar from './tools/HorizontalBar';
import ScoreViewer from './Sections/ScoreViewer';

export const Home = () => {
  const [tutorialMode, setTutorialMode] = useState(true);
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null);

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
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/game-bg.png')}
        style={styles.background}>
        <View style={{height: '15%', width: '100%'}}>
          <TopSection />
        </View>
        {tutorialMode && (
          <Image source={selectedTutorial} style={styles.overlayImage} />
        )}
        <View style={styles.instructorContainer}>
          <InstructerSec selectTutorial={selectTutorial} />
        </View>
        <ScoreViewer/>
        <View style={styles.HorizontalBarContainer}>
          <HorizontalBar
            progress={50}
            width={''}
            label={''}
            barType={''}
            barColor={''}
            textColor={''}
            progressedColor={'#FFD700'}
          />
          <HorizontalBar
            progress={24}
            width={''}
            label={''}
            barType={''}
            barColor={''}
            textColor={''}
            progressedColor={'#FFD700'}
          />
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
      </ImageBackground>
    </View>
  );
};

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
    justifyContent: 'flex-start',
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
    zIndex: 2,
    transform: [{translateY: -50}],
    width: '100%',
    height: '100%',
  },
  HorizontalBarContainer:{
    position:'absolute',
    left:'50%',
    top:'30%',
  }
});

export default Home;
