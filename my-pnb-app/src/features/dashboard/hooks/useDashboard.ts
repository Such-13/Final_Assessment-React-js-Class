import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import axiosInstance from '../../../services/axios';
import { ENDPOINTS } from '../../../constants/api';
import { encryptionService } from '../../../services/encryptionService';
import {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
  setSelectedVpa,
} from '../dashboardSlice';

export const useDashboard = () => {
  const dispatch = useDispatch();

  const { merchants, selectedVpa, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  const fetchMerchantData = async () => {
    dispatch(fetchDashboardStart());
    try {
      // 1. Get the username saved during login
      const username = sessionStorage.getItem('pnb_login_username');

      if (!username) {
        dispatch(fetchDashboardFailure('No user identifier found'));
        return;
      }

      // 2. Prepare the raw data
      const isNumber = /^\d+$/.test(username);
      const rawPayload = isNumber
        ? { mobile_number: username }
        : { vpa_id: username };

      // 3. SECURE THE PAYLOAD: Wrap and Encrypt
      // This creates the {"RequestData": "encrypted_string"} structure
      const securePayload = encryptionService.wrapAndEncrypt(rawPayload);

      // 4. Send the secured payload to the API
      const response = await axiosInstance.post(
        ENDPOINTS.DASHBOARD.FETCH_BY_ID,
        securePayload
      );

      // 5. HANDLE RESPONSE: Decrypt if the server sent back an encrypted string
      let resultData = response.data;
      if (typeof response.data === 'string') {
        resultData = encryptionService.decryptResponse(response.data);
      }

      // 6. Update Redux state
      if (resultData && resultData.data) {
        dispatch(fetchDashboardSuccess(resultData.data));
      } else {
        dispatch(fetchDashboardFailure('No data received from server'));
      }
    } catch (err: any) {
      dispatch(fetchDashboardFailure(
        err.response?.data?.message || err.message || 'Failed to fetch dashboard data'
      ));
    }
  };

  const changeVpa = (vpa: string) => {
    dispatch(setSelectedVpa(vpa));
  };

  const selectedMerchant = merchants.find(m => m.vpa_id === selectedVpa) 
    || merchants[0];

  return {
    merchants,
    selectedVpa,
    selectedMerchant,
    loading,
    error,
    fetchMerchantData,
    changeVpa,
  };
};