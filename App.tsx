import React from 'react';
import { Home } from './components/Home';
import VerticalBar from './components/tools/VerticalBar';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Splash from './components/utility/Splash';
import Login from './components/login/Login';
import Game from './components/game/Game';
import LowerScoreBar from './components/Sections/LowerScoreBar';
import ScoreViewer from './components/Sections/ScoreViewer';


function App() {
  return (
    <Provider store={store}>
     <Home/>
    </Provider>
  );
}
export default App


