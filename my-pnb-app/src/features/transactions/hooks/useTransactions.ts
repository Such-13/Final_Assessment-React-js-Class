import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../../services/axios';
import { fetchStart, fetchSuccess, fetchFailure } from '../transactionsSlice';
import { RootState } from '../../../app/store';

export const useTransactions = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.transactions);

  const getReport = async (startDate: string, endDate: string, vpaId: string) => {
    dispatch(fetchStart());
    try {
      const response = await axiosInstance.post('https://apidev-sdk.iserveu.online/pnb/sb/reports/querysubmit_user', {
        startDate,
        endDate,
        vpa_id: vpaId,
        mode: 'both' // As per Case 1 in your documentation
      });

      // Based on your Sample Response structure
      if (response.data && response.data.data) {
        dispatch(fetchSuccess(response.data.data));
      } else {
        dispatch(fetchSuccess([]));
      }
    } catch (err: any) {
      dispatch(fetchFailure(err.message || 'Failed to fetch reports'));
    }
  };

  return { data, loading, error, getReport };
};