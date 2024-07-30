import React, { useEffect, useReducer, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import HorizontalBar from '../tools/HorizontalBar'
import ScoreViewer from '../Sections/ScoreViewer'
import LowerScoreBar from '../Sections/LowerScoreBar'
import { COLOR_YELLOW } from '../../utils/constants'
import { useAppDispatch, useAppSelector } from '../../state/UseTypedSelector'
import { useFocusEffect } from '@react-navigation/native'
import { showMessage, showToast } from '../../utils/logger'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { ACTION_TYPES, initialState, questionReducer } from './reducer'
import { SubmitAnswerResponse, updateBalanceDelta, updateBalanceHideTs } from '../../state/reducers/WalletSlice'
import { backButtonHandler, handleAppStateChange } from '../../utils/helper'
import { useInterval } from '../../hooks'
import { leaveGame } from '../../state/reducers/GameSlice'
import { hasBalance } from '../../utils/utilFns'

export default function Game() {
  const [localState, localDispatch] = useReducer(questionReducer, initialState);
  const {webSocketQuestionTopic, webSocketAnswerTopic} = useAppSelector(
    state => state.appConfig,
  );
  const {gameToken, gameJoinSocketUrl, selectedAmount, gameType} =
    useAppSelector(state => state.game);
  const appDispatch = useAppDispatch();
  const webSocket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  useFocusEffect(backButtonHandler);
  useEffect(handleAppStateChange, []);

  useInterval(
    () => localDispatch({type: ACTION_TYPES.DECREMENT_TIMER}),
    localState.timeLeft > 0 ? 1000 : null,
  );

  useEffect(() => {
    if (localState.timeLeft === 0 && localState.answerResp) {
      appDispatch(updateBalanceDelta(localState.answerResp));
    }
  }, [appDispatch, localState.answerResp, localState.timeLeft]);

  useEffect(() => {
    if (!localState.initializing && localState.timeLeft === 0) {
      localDispatch({type: ACTION_TYPES.SHOW_OVERLAY_TIMER_FINISH});
    }
  }, [localState.initializing, localState.timeLeft]);

  useEffect(() => {
    showMessage('','gameJoinSocketUrl: '+gameJoinSocketUrl)
    if (!gameJoinSocketUrl) {
      showToast('Game socket URL not found','error');
      return;
    }
    const socket = io(gameJoinSocketUrl);
    webSocket.current = socket;
    const wss = webSocket.current;
    wss.on('connect', () => {
      localDispatch({type: ACTION_TYPES.CONNECTED});
      showToast('connected to server','success');
    });
    wss.on('connect_error', _err => {
      console.log(_err);
      showToast('Could not connect to server', 'error');
    });
    wss.on('disconnect', _reason => showToast('Disconnected from server','error'));
    wss.on(webSocketQuestionTopic, (data: any) => {
      //appDispatch(hideBalanceDelta());
      localDispatch({type: ACTION_TYPES.QUESTION_RECEIVED, payload: data});
    });
    return () => {
     //appDispatch(hideBalanceDelta());
      appDispatch(leaveGame(gameToken));
      wss.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOptionSelected = (selectedOptionId: number) => {
    appDispatch(updateBalanceHideTs());
    if (!hasBalance(selectedAmount, gameType)) {
      localDispatch({type: ACTION_TYPES.INSUFFICIENT_BALANCE});
      return;
    }
    localDispatch({type: ACTION_TYPES.OPTION_SELECTED});
    const answerCallback = (res: SubmitAnswerResponse) => {
      if (res.insufficientBalance) {
        showToast('Insufficient balance','error');
      } else if (res.invalidToken) {
        showToast('Invalid game token','error');
      } else if (res.isTimeout) {
        showToast('Answer not saved! Timeout.','error');
      } else {
        localDispatch({type: ACTION_TYPES.SET_ANSWER_RESPONSE, payload: res});
      }
    };
    if (webSocket.current) {
      const obj = {
        roundId: localState.roundId,
        questionId: localState.questionId,
        selectedOptionId,
        gameToken,
        gameType,
      };
      webSocket.current.emit(webSocketAnswerTopic, obj, answerCallback);
    }
  };
  return (
    <View style={{ }}>
      <View style={styles.scoreViewContainer}>
        <ScoreViewer />
        <View style={[styles.horizontalBarContainer]}>
          <View style={{ marginBottom: 15 }}>
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
          <View style={{ marginBottom: 15 }}>
            <HorizontalBar
              progress={24}
              width={''}
              label={''}
              barType={''}
              barColor={''}
              textColor={''}
              progressedColor={'#FFD700'}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
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
        </View>
      </View>
      <View style={{marginTop:10}}>
        <LowerScoreBar />
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  scoreViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  horizontalBarContainer: {

    height: 'auto',
  },
})