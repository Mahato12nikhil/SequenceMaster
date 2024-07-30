import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Splash from './components/utility/Splash';
import {NavigationContainer} from '@react-navigation/native';
import { navigationRef, RootStackParamList } from './utils/navigation';
import { PATH_HOME, PATH_SPLASH } from './utils/constants';
import { StyleSheet, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import Toast from 'react-native-toast-message';

function App() {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  const noHeader = () => null;
  return (
    <Provider store={store}>
    <NavigationContainer ref={navigationRef}>

        <View style={styles.wrapper}>
          <RootStack.Navigator initialRouteName={PATH_SPLASH}>
            <RootStack.Screen
              name={PATH_SPLASH}
              options={{header: noHeader}}
              component={Splash}
            />
            <RootStack.Screen
              name={PATH_HOME}
              options={{header: noHeader}}
              component={Home}
            />
          </RootStack.Navigator>
        </View>
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})
export default App


