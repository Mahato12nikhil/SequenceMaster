import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable
} from 'react-native';
import {COLOR_WHITE, COLOR_YELLOW} from '../../utils/constants';
import {  } from 'react-native-gesture-handler';
import { Tutorials } from '../utility/Interfaces';

export default function InstructerSec({selectTutorial}: any) {
  const [tutorial_text,setTutorialText]=useState('Welcome to Sequence master')
  const [tutorial_tag,setTutorialTag]=useState('')


  function handlePress(): void {
    console.log('clicked')
    switch (tutorial_tag) {
      case '':
        selectTutorial(Tutorials.ACCOUNT);
        setTutorialText(`You can tap 'Account' to login with your phone number`);
        setTutorialTag(Tutorials.ACCOUNT);
        break;
      case Tutorials.ACCOUNT:
        selectTutorial('none');
        setTutorialText(`After successful login you will receive welcome bonus`);
        setTutorialTag(Tutorials.POST_ACCOUNT);
        break;
      case Tutorials.POST_ACCOUNT:
        selectTutorial(Tutorials.MAIL);
        setTutorialText(`Tap 'Mail' to claim the welcome bonus`);
        setTutorialTag(Tutorials.MAIL);
        break;
      case Tutorials.MAIL:
        selectTutorial(Tutorials.BONUS_MONEY);
        setTutorialText(`The bonus money in your wallet will be shown here`);
        setTutorialTag(Tutorials.BONUS_MONEY);
        break;
      case Tutorials.BONUS_MONEY:
        selectTutorial(Tutorials.REAL_MONEY);
        setTutorialText(`The real money in your wallet will be shown here`);
        setTutorialTag(Tutorials.REAL_MONEY);
        break;
      case Tutorials.REAL_MONEY:
        selectTutorial(Tutorials.ADD_MONEY);
        setTutorialText(`You can add money from here`);
        setTutorialTag(Tutorials.ADD_MONEY);
        break;
      case Tutorials.ADD_MONEY:
        selectTutorial(Tutorials.EVENT);
        setTutorialText(`You can withdraw money from your wallet`);
        setTutorialTag(Tutorials.EVENT);
        break;
      case Tutorials.WALLET:
        selectTutorial(Tutorials.EVENT);
        setTutorialText(`You will find the latest event and announcement here`);
        setTutorialTag(Tutorials.EVENT);
        break;
      case Tutorials.EVENT:
        selectTutorial(Tutorials.GAME);
        setTutorialText(`Let's start a game with the bonus money you have received`);
        setTutorialTag(Tutorials.GAME);
        break;
      case Tutorials.GAME:
        selectTutorial(Tutorials.GAME);
        setTutorialText(`Alternatively you can use real money from your account if you have already recharged`);
        setTutorialTag('postgame');
        break;
      case 'postgame':
        selectTutorial(Tutorials.GAME);
        setTutorialText(`In every match, you will see three numbers and you have to guess the fourth one...`);
        setTutorialTag('postgame_2');
        break;
      case 'postgame_2':
        selectTutorial(Tutorials.GAME);
        setTutorialText(`You will be given three answers per question, but you can only choose one of them`);
        setTutorialTag('postgame_3');
        break;
      case 'postgame_3':
        selectTutorial('none');
        setTutorialText(`Congratulations for finishing the Tutorial`);
        setTutorialTag('bonus_claim');
        break;
      default:
        
        break;
    }
  }
  

  return (
    <View style={styles.container}>
      <Pressable style={styles.touchable} onPress={handlePress}>
        <ImageBackground
          source={require('../../assets/images/Instruction_text_back.png')}
          style={styles.tutorial_back}
          resizeMode="stretch">
          <Text style={styles.tutorial_back_text}>{tutorial_text}</Text>
          <Text style={[styles.tutorial_back_text,{marginTop:'10%'}]}>Tap to continue</Text>
        </ImageBackground>
      </Pressable>
      <Image
        style={styles.instructerAvatar}
        source={require('../../assets/images/instructer.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: '2%',
    position: 'relative',
  },
  touchable:{
    flex:1,
    height: '50%',
    width: '80%',
    position: 'absolute',
    left: 0,

  },
  tutorial_back: {
    height:'70%',
    width:'100%',
  },
  tutorial_back_text:{
    color:COLOR_WHITE,
    marginTop:'4%',
    marginLeft:'4%'
  },
  instructerAvatar: {
    resizeMode: 'stretch',
    height: '70%',
    marginLeft: '60%',
    marginBottom: '40%',
  },
});
