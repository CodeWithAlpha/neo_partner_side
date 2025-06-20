import { defaultItemsPerPage } from "../config";

export const END_POINTS = {
  AUTH: {
    ME: "auth/me",
    LOGIN: "auth/partner-login",
    VERIFY: "auth/partner/verify-otp",
    SIGN_UP: "partner/sign-up",
    FORGOT_PASSWORD_OTP_SEND: "auth/forgot-password",
    FORGOT_PASSWORD_OTP_VERIFY: "auth/reset-password",
    RESEND_OTP: "auth/resend-otp",
    SIGN_UP_VERIFY: (id: string) => `partner/verify-otp/${id}`,
    UPLOAD_DOCS: (id: string) => `partner/collect-documents/${id}`,
  },
  API_CREDS: {
    SEND_OTP_FOR_FULL_VIEW_APIKEY: "auth/view-creds/send",
    VERIFY_OTP_FOR_FULL_VIEW_APIKEY: "auth/view-creds/verify",
    SEND_OTP_FOR_REFRESH_APIKEY: "partner/refresh-apikey/send-otp",
    VERIFY_OTP_FOR_REFRESH_APIKEY: "partner/refresh-apikey/verify-otp",
    SEND_OTP_FOR_ADD_IP: "api-creds/send-otp/ip",
    VERIFY_OTP_FOR_ADD_IP: "api-creds/verify-otp/ip",
    SEND_OTP_FOR_ADD_CALLBACK: "api-creds/send-otp/callback-url",
    VERIFY_OTP_FOR_ADD_CALLBACK: "api-creds/verify-otp/callback-url",
    SEND_OTP_FOR_DELETE_IP: "api-creds/delete/send-otp/ip",
    VERIFY_OTP_FOR_DELETE_IP: "api-creds/delete/verify-otp/ip",
    SEND_OTP_FOR_DELETE_CALLBACK: "api-creds/delete/send-otp/callback-url",
    VERIFY_OTP_FOR_DELETE_CALLBACK: "api-creds/delete/verify-otp/callback-url",
  },
  DASHBOARD: {
    GET: (startDate: string, endDate: string) =>
      `auth/dashboard?startDate=${startDate}&endDate=${endDate}`,
  },
  Transactions: {
    GET_API_TRANSACTION: (
      page: number,
      itemPerPage: number,
      neoTxnId: string,
      startDate: string,
      endDate: string,
      startTime: string,
      endTime: string,
      clientTxnId: string,
      status: string
    ) =>
      `transaction/own?page=${page}&limit=${itemPerPage}&startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}&neoTxnId=${neoTxnId}&clientTxnId=${clientTxnId}&status=${status}`,
    GET_WALLET_LADGER_TRANSACTIONS: (
      page: number,
      itemPerPage: number,
      search: string,
      startDate: string,
      endDate: string,
      startTime: string,
      endTime: string
    ) =>
      `transaction/own/wallet-operations?page=${page}&limit=${itemPerPage}&startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}&search=${search}`,
    GET_API_TRANSACTION_REPORT: (
      page: number,
      itemPerPage: number,
      type: string,
      startDate: string,
      endDate: string,
      startTime: string,
      endTime: string
    ) =>
      `report/own?page=${page}&limit=${itemPerPage}&type=${type}&startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}`,
  },
  FUND_REQUESTS: {
    GET_REQUESTS: (
      page: number,
      itemPerPage: number,
      status: "pending" | "approved" | "reject"
    ) => `fund-request/own?page=${page}&limit=${itemPerPage}&status=${status}`,
    GET_ADMIN_BANKS: "admin-bank?page=1&limit=100",
    GET_BANK_MODES: (bankId: string) => `admin-bank/commissions/${bankId}`,
    CLAIM: "fund-request",
  },
  PLAN: {
    GET_PLAN_DETAIL: "plan/partner",
  },
  CATEGORY: {
    CREATE: "category",
    GET_LIST: (searchKey: string) => `category?search=${searchKey || ""}`,
  },
  SERVICES: {
    LIST_BY_CATEGORY: (page: number, limit: number, id: string) =>
      `partner/services/${id}?page=${page}&limit=${limit}`,
  },
  COMMON: {
    GET_SIGNED_URL: "auth/generate-signed-url",
    get_SIGNED_CONTENT: "auth/send-file-content",
  },
};
