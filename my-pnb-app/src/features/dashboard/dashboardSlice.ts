import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MerchantData {
  vpa_id: string;
  merchant_name: string;
  merchant_mobile: string;
  merchant_account_no: string;
  device_status: string;
  mapping_status: string;
  qr_string: string;
  qr_type: string;
  serial_number: string | null;
  terminal_id: string | null;
  state: string;
  city: string;
  branch: string;
  mcc: string;
}

interface DashboardState {
  merchants: MerchantData[];
  selectedVpa: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  merchants: [],
  selectedVpa: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardSuccess: (state, action: PayloadAction<MerchantData[]>) => {
      state.loading = false;
      state.merchants = action.payload;
      // Auto-select first VPA
      if (action.payload.length > 0) {
        state.selectedVpa = action.payload[0].vpa_id;
      }
    },
    fetchDashboardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedVpa: (state, action: PayloadAction<string>) => {
      state.selectedVpa = action.payload;
    },
  },
});

export const {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
  setSelectedVpa,
} = dashboardSlice.actions;

export type { MerchantData };
export default dashboardSlice.reducer;