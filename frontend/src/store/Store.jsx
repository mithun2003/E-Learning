import { configureStore } from '@reduxjs/toolkit';
import rootAction from '../Reducers/RootReducer';

const store = configureStore({
  reducer: rootAction,
});

export default store;
