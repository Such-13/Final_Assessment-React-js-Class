/// <reference types="vite/client" />

export const authService = {
  initiateLogin: (username?: string) => {
    const clientId = import.meta.env.VITE_OIDC_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_OIDC_REDIRECT_URI;
    const authorizeEndpoint = "https://pnb-auth-stage.isupay.in/application/o/authorize/";

    const authUrl = new URL(authorizeEndpoint);
    const scope = "path openid profile email offline_access authorities privileges user_name created adminName bankCode goauthentik.io/api";

    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    
    // CHANGE THIS: From 'token' to 'id_token token'
    authUrl.searchParams.append('response_type', 'id_token token'); 
    
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('state', Math.random().toString(36).substring(7));
    authUrl.searchParams.append('nonce', Math.random().toString(36).substring(7)); // Required for id_token
    
    if (username) {
      authUrl.searchParams.append('login_hint', username);
    }

    console.log("DEBUG: Final Auth URL ->", authUrl.toString());
    window.location.href = authUrl.toString();
  }
};