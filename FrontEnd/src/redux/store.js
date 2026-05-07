import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import adminReducer from './slice/adminSlice';
import smartLinkReducer from './slice/smartlinkSlice';
import configReducer from './slice/configSlice';
import withdrawalReducer from './slice/withdrawalSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    smartLink: smartLinkReducer,
    config: configReducer,
    withdrawal: withdrawalReducer,
  },
});
