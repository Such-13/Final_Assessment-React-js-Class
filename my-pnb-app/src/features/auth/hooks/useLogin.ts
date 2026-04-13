import { useState } from 'react';
import { authService } from '../../../services/authService';

/**
 * SOLID: Single Responsibility
 * This hook manages the Login form state and triggers the OIDC service.
 */
export const useLogin = () => {
  const [username, setUsername] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // Calling the OIDC service we built earlier
      authService.initiateLogin(username);
    }
  };

  return { username, setUsername, handleLogin };
};