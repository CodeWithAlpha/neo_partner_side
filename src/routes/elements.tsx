import { ElementType, lazy, Suspense } from "react";
import LoadingScreen from "../components/loading-screen";

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const Home = lazy(() => import("../pages/Home"));

//login
export const LoginPage = Loadable(
  lazy(() => import("../pages/auth/login/LoginPage"))
);
export const LoginVerifyPage = Loadable(
  lazy(() => import("../pages/auth/login/LoginVerifyPage"))
);
export const ResetPassword = Loadable(
  lazy(() => import("../pages/auth/login/ResetPassword"))
);
export const ResetPasswordVerify = Loadable(
  lazy(() => import("../pages/auth/login/ResetPasswordVerify"))
);

//registration
export const SignUpPage = Loadable(
  lazy(() => import("../pages/auth/registration/SignUpPage"))
);
export const SignUpVerify = Loadable(
  lazy(() => import("../pages/auth/registration/SignUpVerify"))
);
export const UploadDocuments = Loadable(
  lazy(() => import("../pages/auth/registration/UploadDocuments"))
);
export const ApplicationReview = Loadable(
  lazy(() => import("../pages/auth/registration/ApplicationReview"))
);

//auth
export const Dashboard = lazy(() => import("../pages/dashboard/Index"));
export const ApiCredentials = lazy(
  () => import("../pages/apiCredentials/index")
);
export const Wallet = lazy(() => import("../pages/wallet/index"));

export const Transactions = lazy(() => import("../pages/transactions/index"));
export const Services = lazy(() => import("../pages/services/index"));
export const ApiDocs = lazy(() => import("../pages/ApiDocs"));

export const Profile = lazy(() => import("../pages/Profile"));

export const PageOne = lazy(() => import("../pages/PageOne"));
export const PageTwo = lazy(() => import("../pages/PageTwo"));
export const PageThree = lazy(() => import("../pages/PageThree"));
export const PageFour = lazy(() => import("../pages/PageFour"));
export const PageFive = lazy(() => import("../pages/PageFive"));
export const PageSix = lazy(() => import("../pages/PageSix"));

export const Page404 = lazy(() => import("../pages/Page404"));
