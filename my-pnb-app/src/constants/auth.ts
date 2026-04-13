// Auth configuration for PNB OIDC
export const authConfig = {
  authority: 'https://pnb-auth-stage.isupay.in/application/o/pnb/',
  client_id: 'SaDG8kozoNOUC07Uv46et8',
  redirect_uri: `${window.location.origin}/redirected`,
  post_logout_redirect_uri: `${window.location.origin}/`,
  scope: 'openid profile email offline_access authorities privileges user_name created adminName bankCode goauthentik.io/api',
  response_type: 'code',
  automaticSilentRenew: true,
  loadUserInfo: true,
}
 
export const SESSION_KEY = 'pnb_session'
export const TOKEN_KEY = 'pnb_token'