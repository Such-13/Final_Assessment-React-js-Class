import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: any | null;
  roles: string[];
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem('pnb_access_token'),
  isAuthenticated: !!sessionStorage.getItem('pnb_access_token'),
  user: null,
  roles: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Used by useAuth hook
    setSession: (state, action: PayloadAction<{
      user: any;
      accessToken: string;
      roles: string[];
    }>) => {
      state.token = action.payload.accessToken;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.roles = action.payload.roles;
      state.loading = false;
      sessionStorage.setItem('pnb_access_token', action.payload.accessToken);
    },
    clearSession: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.roles = [];
      sessionStorage.clear();
    },
    // Used by RedirectHandler
    setLoginSuccess: (state, action: PayloadAction<{
      token: string;
      user?: any;
    }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user || null;
      state.loading = false;
      sessionStorage.setItem('pnb_access_token', action.payload.token);
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.roles = [];
      sessionStorage.clear();
    },
  },
});

export const {
  setSession,
  clearSession,
  setLoginSuccess,
  setAuthLoading,
  logout,
} = authSlice.actions;

export default authSlice.reducer;