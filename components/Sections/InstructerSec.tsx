import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLOR_WHITE, COLOR_YELLOW} from '../../utils/constants';

export default function InstructerSec({selectTutorial}: any) {
  const [tutorial_text,setTutorialText]=useState('Welcome to Sequence master')
  const [tutorial_tag,setTutorialTag]=useState('')


  function handlePress(): void {
    switch (tutorial_tag) {
      case '':
        selectTutorial('account');
        setTutorialText(`You can tap 'Account' to login with your phone number`);
        setTutorialTag('account');
        break;
      case 'account':
        selectTutorial('none');
        setTutorialText(`After successful login you will receive welcome bonus`);
        setTutorialTag('postaccount');
        break;
      case 'postaccount':
        selectTutorial('mail');
        setTutorialText(`Tap 'Mail' to claim the welcome bonus`);
        setTutorialTag('mail');
        break;
      case 'mail':
        selectTutorial('bonus_money');
        setTutorialText(`The bonus money in your wallet will be shown here`);
        setTutorialTag('bonus_money');
        break;
      case 'bonus_money':
        selectTutorial('real_money');
        setTutorialText(`The real money in your wallet will be shown here`);
        setTutorialTag('real_money');
        break;
      case 'real_money':
        selectTutorial('add_money');
        setTutorialText(`You can add money from here`);
        setTutorialTag('add_money');
        break;
      case 'add_money':
        selectTutorial('wallet');
        setTutorialText(`You can withdraw money from your wallet`);
        setTutorialTag('wallet');
        break;
      case 'wallet':
        selectTutorial('event');
        setTutorialText(`You will find the latest event and announcement here`);
        setTutorialTag('event');
        break;
      case 'event':
        selectTutorial('game');
        setTutorialText(`Let's start a game with the bonus money you have received`);
        setTutorialTag('game');
        break;
      case 'game':
        selectTutorial('game');
        setTutorialText(`Alternatively you can use real money from your account if you have already recharged`);
        setTutorialTag('postgame');
        break;
      case 'postgame':
        selectTutorial('game');
        setTutorialText(`In every match, you will see three numbers and you have to guess the fourth one...`);
        setTutorialTag('postgame_2');
        break;
      case 'postgame_2':
        selectTutorial('game');
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
      <TouchableOpacity style={styles.touchable} onPress={handlePress}>
        <ImageBackground
          source={require('../../assets/images/Instruction_text_back.png')}
          style={styles.tutorial_back}
          resizeMode="stretch">
          <Text style={styles.tutorial_back_text}>{tutorial_text}</Text>
          <Text style={[styles.tutorial_back_text,{marginTop:'10%'}]}>Tap to continue</Text>
        </ImageBackground>
      </TouchableOpacity>
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
    height: '50%',
    width: '80%',
    position: 'absolute',
    left: 0,
    zIndex: 1,
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
    zIndex: 2,
    marginBottom: '40%',
  },
});
