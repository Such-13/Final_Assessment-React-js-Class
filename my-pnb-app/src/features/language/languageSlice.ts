import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  currentLanguage: string;
  availableLanguages: string[];
  loading: boolean;
  error: string | null;
}

const initialState: LanguageState = {
  currentLanguage: '',
  availableLanguages: [],
  loading: false,
  error: null,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    },
    setAllLanguages: (state, action: PayloadAction<string[]>) => {
      state.availableLanguages = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
});

export const { setLoading, setCurrentLanguage, setAllLanguages, setError } = languageSlice.actions;
export default languageSlice.reducer;