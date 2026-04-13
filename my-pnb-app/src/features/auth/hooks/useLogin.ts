import { useState } from 'react';
import { authService } from '../../../services/authService';

export const useLogin = () => {
  const [username, setUsername] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // Save username BEFORE redirecting to OIDC
      sessionStorage.setItem('pnb_login_username', username.trim());
      authService.initiateLogin(username.trim());
    }
  };

  return { username, setUsername, handleLogin };
};