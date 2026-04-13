/**
 * SOLID: Open-Closed Principle
 * Base URLs are separated to allow switching between Auth and No-Auth environments 
 * easily without touching the component logic.
 */

export const BASE_URLS = {
  STAGE_AUTH: import.meta.env.VITE_BASE_URL_AUTH || 'https://auth-dev-stage.iserveu.online',
  STAGE_NO_AUTH: import.meta.env.VITE_BASE_URL_NO_AUTH || 'https://api-dev-stage.iserveu.online',
};

export const ENDPOINTS = {
  // SDUI Logic (From Section I & II)
  SDUI: {
    FETCH: '/pnb/sdui/fetch',
    FETCH_SELECTIVE: '/pnb/sdui/fetch_selective',
    INSERT: '/pnb/sdui/insertData',
    UPDATE: '/pnb/sdui/updateData',
  },

  // Dashboard & User Management (From PNB USER FETCH)
  DASHBOARD: {
    FETCH_BY_ID: '/pnb/fetch/fetchById',
    FETCH_BY_DATE: '/pnb/fetch/fetch-users',
    ONBOARD_MERCHANT: '/pnb/merchant/bulk-onboard', // This is a No-Auth endpoint
  },

  // Transactions (From Merchant Mobile Application)
  TRANSACTIONS: {
    QUERY_SUBMIT: '/pnb/sb/reports/querysubmit_user',
    GET_STATUS: (queryId: string) => `/pnb/sb/reports/get_report_status/${queryId}`,
  },

  // QR Logic (From QR_CONVERT_TO_BASE64 API)
  QR: {
    CONVERT_TO_BASE64: '/pnb/merchant/qr_convert_to_base64',
  },

  // Language Logic (From Soundbox Language APIs)
  LANGUAGE: {
    FETCH_ALL: '/pnb/isu_soundbox/lang/fetch_language',
    UPDATE: '/pnb/isu_soundbox/lang/update_language',
    CURRENT: (tid: string) => `/pnb/isu_soundbox/user_api/current_language/${tid}`,
    STATUS_CHECK: (tid: string) => `/pnb/isu_soundbox/lang/status_check/${tid}`,
    STATUS_UPDATE: '/pnb/isu_soundbox/lang/status_update',
  },
};