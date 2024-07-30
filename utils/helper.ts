import {AppState, BackHandler} from 'react-native';
import {goBack} from './navigation';

export function backButtonHandler() {
  const onBackPress = () => {
    return true;
  };
  const subscription = BackHandler.addEventListener(
    'hardwareBackPress',
    onBackPress,
  );

  return () => subscription.remove();
}

export function handleAppStateChange() {
  // when app is minimised, leave game
  // call goBack which calls leaveGame on unmount
  const subscription = AppState.addEventListener('change', nextAppState => {
    if (nextAppState !== 'active') {
      goBack();
    }
  });

  return () => {
    subscription.remove();
  };
}
