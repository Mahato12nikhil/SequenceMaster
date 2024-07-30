import {CommonActions} from '@react-navigation/native';
import {createNavigationContainerRef} from '@react-navigation/native';
import { PATH_HOME, PATH_SPLASH } from './constants';


export type RootStackParamList = {
  [PATH_SPLASH]: undefined;
  [PATH_HOME]: undefined;
};
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigateTo(
  routeName: keyof RootStackParamList,
  params?: object,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
}
