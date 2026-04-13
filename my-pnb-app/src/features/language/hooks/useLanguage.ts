import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import axiosInstance from '../../../services/axios';
import { ENDPOINTS } from '../../../constants/api';
import { encryptionService } from '../../../services/encryptionService';
import { 
  setLoading, 
  setCurrentLanguage, 
  setAllLanguages, 
  setError 
} from '../languageSlice';

export const useLanguage = () => {
  const dispatch = useDispatch();
  const { currentLanguage, availableLanguages, loading } = useSelector(
    (state: RootState) => state.language
  );

  // 1. Fetch current language (GET - No encryption usually needed for params)
  const fetchCurrent = async (tid: string) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(ENDPOINTS.LANGUAGE.CURRENT(tid));
      if (response.data.result === 'success') {
        dispatch(setCurrentLanguage(response.data.data));
      }
    } catch (err) {
      console.error("Failed to fetch current language");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 2. Fetch all available languages
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

  // 3. Update to a new language (POST - Encrypted)
  const updateLang = async (tid: string, newLang: string) => {
    dispatch(setLoading(true));
    try {
      const rawPayload = { tid, update_language: newLang };
      
      // Wrap and Encrypt the payload to satisfy the "RequestData" requirement
      const securePayload = encryptionService.wrapAndEncrypt(rawPayload);

      const response = await axiosInstance.post(
        ENDPOINTS.LANGUAGE.UPDATE, 
        securePayload
      );
      
      // Decrypt if the response is an encrypted string
      const resultData = typeof response.data === 'string' 
        ? encryptionService.decryptResponse(response.data) 
        : response.data;
        
      return resultData;
    } catch (err: any) {
      dispatch(setError("Update failed"));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { 
    currentLanguage, 
    availableLanguages, 
    loading, 
    fetchCurrent, 
    fetchAll, 
    updateLang 
  };
};