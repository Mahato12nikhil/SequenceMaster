import React from 'react';
import { Home } from './components/Home';
import VerticalBar from './components/tools/VerticalBar';
import { Provider } from 'react-redux';
import { store } from './state/store';


function App() {
  return (
    <Provider store={store}>
     <Home/>
    </Provider>
   
  );
}
export default App


