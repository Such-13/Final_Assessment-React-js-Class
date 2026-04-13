import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import transactionsReducer from '../features/transactions/transactionsSlice';
import qrReducer from '../features/qr/qrSlice'; 
import languageReducer from '../features/language/languageSlice'; 
import dashboardReducer from '../features/dashboard/dashboardSlice';
/**
 * SOLID: Open-Closed Principle
 * We are extending the store to support 'language' without 
 * changing the existing features (auth, transactions, qr).
 */
export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    auth: authReducer,
    transactions: transactionsReducer,
    qr: qrReducer,
    language: languageReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;