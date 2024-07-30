import React, {useEffect} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Login from './Login';
import {PATH_HOME} from '../../utils/constants';
import { showToast } from '../../utils/logger';
import { useAppDispatch, useAppSelector } from '../../state/UseTypedSelector';
import { updateHomeView } from '../../state/reducers/Screen';
import { HomeView } from '../utility/Interfaces';

function LoginContainer() {
  const {userDetail} = useAppSelector(state => state.user);
  const {token} = useAppSelector(state => state.token);
  const dispatch=useAppDispatch()
  
  useEffect(() => {
    if (userDetail?.phone && token) {
      showToast('Login successful','success');
      dispatch(updateHomeView(HomeView.LAUNCHER));
    }
  }, [token, userDetail?.phone]);

  return <Login />;
}

export default LoginContainer;
