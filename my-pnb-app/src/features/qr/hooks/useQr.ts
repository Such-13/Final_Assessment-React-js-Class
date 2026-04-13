import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import axiosInstance from '../../../services/axios';
import { fetchQrStart, fetchQrSuccess, fetchQrFailure } from '../qrSlice';
import { ENDPOINTS } from '../../../constants/api';


export const useQr = () => {
  const dispatch = useDispatch();
  const { qrImage, loading } = useSelector((state: RootState) => state.qr);

  const convertToQR = async (qrString: string) => {
    dispatch(fetchQrStart());
    try {
      // POST to: https://auth-dev-stage.iserveu.online/pnb/merchant/qr_convert_to_base64
      const response = await axiosInstance.post('/pnb/merchant/qr_convert_to_base64', {
        qrString: qrString
      });

      // Your doc says response contains "base64Image"
      if (response.data && response.data.base64Image) {
        dispatch(fetchQrSuccess(response.data.base64Image));
      } else {
        dispatch(fetchQrFailure("Invalid response format"));
      }
    } catch (err: any) {
      dispatch(fetchQrFailure(err.message || 'QR Generation failed'));
    }
  };

  return { qrImage, loading, convertToQR };
};