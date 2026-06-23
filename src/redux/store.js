import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';

const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
});

export default store;
