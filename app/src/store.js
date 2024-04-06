import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './moveListener';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});