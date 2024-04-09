import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './components/gameSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});