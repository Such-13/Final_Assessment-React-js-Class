import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: any | null;
}

const initialState: AuthState = {
  // Check if a session already exists on page load
  token: sessionStorage.getItem('pnb_access_token'),
  isAuthenticated: !!sessionStorage.getItem('pnb_access_token'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginSuccess: (state, action: PayloadAction<{ token: string; user?: any }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user || null;
      
      // Session Management: Persist the token
      sessionStorage.setItem('pnb_access_token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      sessionStorage.clear();
    },
  },
});

export const { setLoginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;