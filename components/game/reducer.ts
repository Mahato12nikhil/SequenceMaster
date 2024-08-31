import {SubmitAnswerResponse} from '../../state/reducers/WalletSlice';

import {store as reduxStore} from '../../state/store';
import { OVERLAY_MSG_BALANCE, OVERLAY_MSG_CHECKING_ANS, OVERLAY_MSG_INITIALIZING, OVERLAY_MSG_WAIT } from '../../utils/constants';
import { showMessage } from '../../utils/logger';

export type QuestionState = {
  roundId: number;
  questionId: number;
  questionText: string;
  questionType: string;
  questionSequence: string;
  options: any[];
  optionsKey:any[]
  previousSolution: string;
  prevCorrectOption: string;
  showOverlay: boolean;
  overlayMsg: string;
  initializing: boolean;
  timeLeft: number;
  answerResp: SubmitAnswerResponse | null;
};
export enum ACTION_TYPES {
  DECREMENT_TIMER,
  SHOW_OVERLAY_TIMER_FINISH,
  CONNECTED,
  DISCONNECT,
  OPTION_SELECTED,
  SET_ANSWER_RESPONSE,
  QUESTION_RECEIVED,
  INSUFFICIENT_BALANCE,
}

export type ActionType = {
  type: ACTION_TYPES;
  payload?: any;
};

export const initialState: QuestionState = {
  roundId: 0,
  questionId: 0,
  questionText: '',
  options: [],
  optionsKey:[],
  questionType:'',
  questionSequence:'',
  previousSolution: '',
  prevCorrectOption: '',
  showOverlay: true,
  overlayMsg: OVERLAY_MSG_INITIALIZING,
  initializing: true,
  timeLeft: 0,
  answerResp: null,
};

export function questionReducer(state: QuestionState, action: ActionType) {
  if (action.type === ACTION_TYPES.DECREMENT_TIMER) {
    const timeLeft = state.timeLeft > 0 ? state.timeLeft - 1 : 0;
    return {...state, timeLeft};
  }
  if (action.type === ACTION_TYPES.SHOW_OVERLAY_TIMER_FINISH) {
    return {...state, showOverlay: true, overlayMsg: OVERLAY_MSG_WAIT};
  }
  if (action.type === ACTION_TYPES.CONNECTED) {
    return {...state, initializing: false};
  }
  if (action.type === ACTION_TYPES.OPTION_SELECTED) {
    const showOverlay = true;
    const overlayMsg = OVERLAY_MSG_CHECKING_ANS;
    const answerResp = null;
    return {...state, showOverlay, overlayMsg, answerResp};
  }
  if (action.type === ACTION_TYPES.INSUFFICIENT_BALANCE) {
    const showOverlay = true;
    const overlayMsg = OVERLAY_MSG_BALANCE;
    const answerResp = null;
    return {...state, showOverlay, overlayMsg, answerResp};
  }
  if (action.type === ACTION_TYPES.SET_ANSWER_RESPONSE) {
    if (action.payload) {
      return {...state, answerResp: action.payload};
    }
  }
  if (action.type === ACTION_TYPES.QUESTION_RECEIVED) {
    if (action.payload) {
      const roundId = action.payload.roundId;
      const questionId = action.payload.questionId;
      const questionText = action.payload.question;
      const options = action.payload.options;
      const optionsKey = action.payload.optionsKey;
      const questionType = action.payload.questionType;
      const questionSequence = action.payload.questionSequence;
      const previousSolution = action.payload.previousSolution;
      const prevCorrectOption = action.payload.previousCorrectOption;
      const showOverlay = false;
      const timeLeft = reduxStore.getState().appConfig.questionTimer;
      const answerResp = null;
      return {
        ...state,
        roundId,
        questionId,
        questionText,
        options,
        optionsKey,
        questionType,
        questionSequence,
        previousSolution,
        prevCorrectOption,
        showOverlay,
        timeLeft,
        answerResp,
      };
    }
  }
  return state;
}
