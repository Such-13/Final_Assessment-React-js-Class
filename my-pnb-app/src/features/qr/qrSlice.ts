import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * SOLID: Single Responsibility Principle
 * This slice manages only the state related to QR code generation.
 */

interface QrState {
  qrImage: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: QrState = {
  qrImage: null,
  loading: false,
  error: null,
};

const qrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    // 1. Start the loading state
    fetchQrStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // 2. Handle successful base64 image receipt
    fetchQrSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.qrImage = action.payload;
    },
    // 3. Handle API errors
    fetchQrFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions for use in the Custom Hook (useQr)
export const { fetchQrStart, fetchQrSuccess, fetchQrFailure } = qrSlice.actions;

// Export the reducer for the Central Store
export default qrSlice.reducer;