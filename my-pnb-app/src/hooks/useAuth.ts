/// <reference types="vite/client" />

const clientId = import.meta.env.VITE_OIDC_CLIENT_ID;
const redirectUri = import.meta.env.VITE_OIDC_REDIRECT_URI;
const authority = "https://pnb-auth-stage.isupay.in/application/o/pnb/";
const authorizeEndpoint = "https://pnb-auth-stage.isupay.in/application/o/authorize/";

export const authService = {
  // 1. Logic to start the login
  login: async () => {
    const authUrl = new URL(authorizeEndpoint);
    const scope = "openid profile email offline_access authorities privileges user_name created adminName bankCode goauthentik.io/api";
    
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('response_type', 'id_token token');
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('state', Math.random().toString(36).substring(7));
    authUrl.searchParams.append('nonce', Math.random().toString(36).substring(7));

    window.location.href = authUrl.toString();
  },

  // 2. Logic to handle the return from PNB
  handleRedirectCallback: async () => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    
    if (!accessToken) throw new Error("No access token found");

    // Create a mock user object based on your screenshot requirements
    return {
      access_token: accessToken,
      profile: { name: "PNB User", preferred_username: "pnb_user" }
    };
  },

  // 3. Logic to check if we already have a session
  getCurrentUser: () => {
    const token = sessionStorage.getItem('pnb_access_token');
    if (token) {
      return {
        access_token: token,
        profile: { name: "PNB User" }
      };
    }
    return null;
  },

  // 4. Logic for roles (returning dummy roles for now based on your UI)
  getRolesFromSession: () => {
    return ['MERCHANT_USER'];
  },

  // 5. Logout logic
  logout: async () => {
    sessionStorage.clear();
    window.location.href = '/login';
  }
};