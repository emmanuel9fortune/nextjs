import React from 'react'
import { configureStore } from '@reduxjs/toolkit';
import infoReducer from './infoSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    info: infoReducer,
  },
});



const FirebasePage = () => {
  return (
    <div>
      {/* Your page content here */}
    </div>
  );
};

export default FirebasePage;
