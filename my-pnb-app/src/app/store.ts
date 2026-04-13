import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import transactionsReducer from '../features/transactions/transactionsSlice';
import qrReducer from '../features/qr/qrSlice'; 
// 1. Add the Language Reducer import
import languageReducer from '../features/language/languageSlice'; 

/**
 * SOLID: Open-Closed Principle
 * We are extending the store to support 'language' without 
 * changing the existing features (auth, transactions, qr).
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    qr: qrReducer,
    // 2. Add the language slice to the global state
    language: languageReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;