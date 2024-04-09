import { configureStore } from '@reduxjs/toolkit';
//import gameReducer from './moveListener';
import gameReducer from './components/gameSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});