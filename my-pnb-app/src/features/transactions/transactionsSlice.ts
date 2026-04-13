import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  Transaction_Id: string;
  Account_Number: string;
  VPA_ID: string;
  "Date_&_Time": string;
  Transaction_Amount: number;
}

interface TransactionState {
  data: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  data: [],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action: PayloadAction<Transaction[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = transactionsSlice.actions;
export default transactionsSlice.reducer;