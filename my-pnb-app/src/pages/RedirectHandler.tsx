import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoginSuccess } from '../features/auth/authSlice';

const RedirectHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Get the full URL to see what happened
    console.log("Full Redirect URL:", window.location.href);

    // 2. Extract the hash (the part after #)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    const accessToken = params.get('access_token');
    const error = params.get('error');

    if (accessToken) {
      console.log("✅ Token found! Saving session...");
      
      dispatch(setLoginSuccess({ 
        token: accessToken,
        user: { id: "pnb_user" } 
      }));

      // Small delay to ensure Redux updates before moving
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
      
    } else if (error) {
      alert("Auth Error from Bank: " + error);
      navigate('/login');
    } else {
      console.log("❌ No token found in URL hash.");
      // If we land here, the URL didn't have #access_token=
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2 style={{ color: '#A8103E' }}>Authenticating with PNB...</h2>
      <p>Processing secure token. Please wait.</p>
    </div>
  );
};

export default RedirectHandler;