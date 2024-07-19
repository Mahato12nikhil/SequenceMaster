import React, {useEffect} from 'react';
import {View} from 'react-native';
import { useAppDispatch } from '../../state/UseTypedSelector';
import { fetchAppConfig } from '../../state/reducers/AppConfig';

export default function Splash() {
  const dispatch = useAppDispatch()
    //fetch AppConfig
    useEffect(() => {
        dispatch(fetchAppConfig())
    }, []);

  return <View></View>;
}
