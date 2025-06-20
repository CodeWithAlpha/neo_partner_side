// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/user";
const ROOTS_DASHBOARD = "/auth";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: path(ROOTS_AUTH, "/login"),
  loginVerify: path(ROOTS_AUTH, "/login-verify"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  resetPasswordVerify: path(ROOTS_AUTH, "/reset-password-verify"),
  signUp: path(ROOTS_AUTH, "/sign-up"),
  signUpVerify: path(ROOTS_AUTH, "/sign-up-verify"),
  uploadDocs: path(ROOTS_AUTH, "/upload-docs"),
  applicationReview: path(ROOTS_AUTH, "/application-review"),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dashboard: path(ROOTS_DASHBOARD, "/dashboard"),
  ApiCredentials: path(ROOTS_DASHBOARD, "/ApiCredentials"),
  wallet: path(ROOTS_DASHBOARD, "/wallet"),
  Services: path(ROOTS_DASHBOARD, "/Services"),
  ApiDocs: path(ROOTS_DASHBOARD, "/ApiDocs"),
  transactions: path(ROOTS_DASHBOARD, "/transactions"),
  profile: path(ROOTS_DASHBOARD, "/profile"),
  // apiuser: {
  //   root: path(ROOTS_DASHBOARD, "/apiuser"),
  //   apiuserall: path(ROOTS_DASHBOARD, "/apiuser/all"),
  //   apiuseraddnew: path(ROOTS_DASHBOARD, "/apiuser/addnew"),
  // },
  // services: {
  //   root: path(ROOTS_DASHBOARD, "/services"),
  //   categorywise: path(ROOTS_DASHBOARD, "/services/category"),
  //   servicewise: path(ROOTS_DASHBOARD, "/services/service"),
  // },
  // plans: {
  //   root: path(ROOTS_DASHBOARD, "/plans"),
  //   existing: path(ROOTS_DASHBOARD, "/plans/existing"),
  //   new: path(ROOTS_DASHBOARD, "/plans/new"),
  // },
  // fundRequests: {
  //   root: path(ROOTS_DASHBOARD, "/fundRequests"),
  //   list: path(ROOTS_DASHBOARD, "/fundRequests/list"),
  //   banks: path(ROOTS_DASHBOARD, "/fundRequests/banks"),
  //   bankList: path(ROOTS_DASHBOARD, "/fundRequests/bankList"),
  //   "control&settings": path(ROOTS_DASHBOARD, "/fundRequests/control&settings"),
  // },
  // systemLogs: path(ROOTS_DASHBOARD, "/systemLogs"),
  // transactions: path(ROOTS_DASHBOARD, "/transactions"),
  // reports: path(ROOTS_DASHBOARD, "/reports"),

  // three: path(ROOTS_DASHBOARD, "/three"),
  user: {
    root: path(ROOTS_DASHBOARD, "/user"),
    four: path(ROOTS_DASHBOARD, "/user/four"),
    five: path(ROOTS_DASHBOARD, "/user/five"),
    six: path(ROOTS_DASHBOARD, "/user/six"),
  },
};
