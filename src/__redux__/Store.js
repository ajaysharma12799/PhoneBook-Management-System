/* eslint-disable no-underscore-dangle */
import { configureStore } from '@reduxjs/toolkit';
import ContactReducer from '../features/Contacts/contactSlice';

const Store = configureStore({
  reducer: {
    Contact: ContactReducer,
  },
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
});

export default Store;
