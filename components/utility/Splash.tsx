import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../state/UseTypedSelector';
import { fetchAppConfig } from '../../state/reducers/AppConfig';
import LoaderKit from 'react-native-loader-kit'
import LoadingScreen from './LoadingScreen';
import { updateHomeView } from '../../state/reducers/Screen';
import { HomeView } from './Interfaces';
import { navigateTo } from '../../utils/navigation';
import { PATH_HOME } from '../../utils/constants';
import { getRefreshToken, getUserPhone } from '../../services/misc';
import { updateTokenThunk } from '../../state/reducers/tokenSlice';
import { RenewToken } from '../../services/backend';
import { showToast } from '../../utils/logger';

const TOTAL_SPLASH_DURATION = 5000;
export default function Splash() {
  const appConfigState=useAppSelector(state=>state.appConfig)
  const [loading,setLoading]=useState(true)
  const [splashFinished, setSplashFinished] = useState(false);
  const [showPlusMinus, setShowPlusMinus] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const [validVersion, setValidVersion] = useState(true);
  const {appConfigLoaded} = useAppSelector(state => state.appConfig);
  const dispatch = useAppDispatch();

    //fetch AppConfig
    useEffect(() => {
        dispatch(fetchAppConfig())
        renewAndFinishSplash();
    }, []);
    const renewAndFinishSplash = async () => {
      await Promise.all([
        new Promise(resolve => setTimeout(resolve, TOTAL_SPLASH_DURATION)),
        renewLogin(),
      ]);
      setSplashFinished(true);
    };
    const renewLogin = async () => {
      try {
        const userPhone = await getUserPhone();
        const refreshToken = await getRefreshToken();
        if (!userPhone || !refreshToken) {
          return;
        }
        const {data} = await RenewToken(userPhone, refreshToken);
        if (data.success) {
          dispatch(updateTokenThunk(data));
        }
      } catch (err: any) {
        showToast('Error trying to renew login','error');
      }
    };
  
    useEffect(() => {
      if(appConfigState.appConfigLoaded)
        navigateTo(PATH_HOME)
        dispatch(updateHomeView(HomeView.LAUNCHER)) 
        setLoading(false);
    }, [appConfigState]);
    
  return <View>
    <LoadingScreen visible={loading}/>
  </View>
}
