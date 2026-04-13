import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import axiosInstance from '../../../services/axios';
import { ENDPOINTS } from '../../../constants/api';
import { setLoading, setCurrentLanguage, setAllLanguages, setError } from '../languageSlice';

export const useLanguage = () => {
  const dispatch = useDispatch();
  const { currentLanguage, availableLanguages, loading } = useSelector((state: RootState) => state.language);

  // Fetch current language for a specific TID
  const fetchCurrent = async (tid: string) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(ENDPOINTS.LANGUAGE.CURRENT(tid));
      if (response.data.result === 'success') {
        dispatch(setCurrentLanguage(response.data.data));
      }
    } catch (err) {
      dispatch(setError("Failed to fetch current language"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Fetch all available languages for the dropdown
  const fetchAll = async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.LANGUAGE.FETCH_ALL);
      if (response.data.result === 'success') {
        dispatch(setAllLanguages(response.data.data));
      }
    } catch (err) {
      console.error("Failed to load languages");
    }
  };

  // Update to a new language
  const updateLang = async (tid: string, newLang: string) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post(ENDPOINTS.LANGUAGE.UPDATE, {
        tid: tid,
        update_language: newLang
      });
      return response.data; // Will return success message from your docs
    } catch (err) {
      dispatch(setError("Update failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { currentLanguage, availableLanguages, loading, fetchCurrent, fetchAll, updateLang };
};