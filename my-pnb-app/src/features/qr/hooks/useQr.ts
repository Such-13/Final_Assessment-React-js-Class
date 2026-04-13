import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import axiosInstance from '../../../services/axios';
import { ENDPOINTS } from '../../../constants/api';
import { encryptionService } from '../../../services/encryptionService';
import { 
  fetchQrStart, 
  fetchQrSuccess, 
  fetchQrFailure 
} from '../qrSlice';

export const useQr = () => {
  const dispatch = useDispatch();
  
  // Get current QR state from Redux
  const { qrImage, loading, error } = useSelector(
    (state: RootState) => state.qr
  );

  const convertToQR = async (qrString: string) => {
    // 1. Start loading state
    dispatch(fetchQrStart());
    
    try {
      // 2. Prepare and SECURE the payload
      // Backend expects {"RequestData": "encrypted_string"}
      const rawPayload = { qrString };
      const securePayload = encryptionService.wrapAndEncrypt(rawPayload);

      // 3. Make the API Call
      const response = await axiosInstance.post(
        ENDPOINTS.QR.CONVERT_TO_BASE64, 
        securePayload
      );

      // 4. Handle Response: Decrypt if the server sent an encrypted string
      const resultData = typeof response.data === 'string' 
        ? encryptionService.decryptResponse(response.data) 
        : response.data;

      // 5. Update Redux with the base64 image
      if (resultData && resultData.base64Image) {
        dispatch(fetchQrSuccess(resultData.base64Image));
      } else {
        dispatch(fetchQrFailure("Invalid response format from QR server"));
      }
      
    } catch (err: any) {
      // Handle errors (Auth failure, network issues, etc.)
      const errorMessage = err.response?.data?.message || err.message || 'QR Generation failed';
      dispatch(fetchQrFailure(errorMessage));
    }
  };

  return { qrImage, loading, error, convertToQR };
};