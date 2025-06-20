import { Navigate, useRoutes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// auth
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
// layouts
import CompactLayout from "../layouts/compact";
import DashboardLayout from "../layouts/dashboard";
// config
import { PATH_BEFORE_LOGIN } from "../config";
//
import {
  Page404,
  PageOne,
  PageTwo,
  PageSix,
  PageFour,
  PageFive,
  PageThree,
  Transactions,
  Home,
  LoginPage,
  LoginVerifyPage,
  ResetPassword,
  SignUpPage,
  Dashboard,
  Services,
  ApiDocs,
  SignUpVerify,
  UploadDocuments,
  ResetPasswordVerify,
  ApplicationReview,
  ApiCredentials,
  Wallet,
  Profile,
} from "./elements";
import LoginLayout from "../layouts/login";
import PageWrapper from "../components/animate/PageWrapper";
import { Suspense } from "react";
import LoadingScreen from "../components/loading-screen";
import GuestLayout from "../layouts/Guest";

export default function Router() {
  const location = useLocation(); // Get current route
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <PageWrapper>
          <Home />
        </PageWrapper>
      ),
    },
    {
      path: "/user",
      element: (
        <GuestGuard>
          <GuestLayout />
        </GuestGuard>
      ),
      children: [
        { element: <Navigate to={"/login"} replace />, index: true },
        { path: "login", element: <LoginPage /> },
        { path: "login-verify", element: <LoginVerifyPage /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "reset-password-verify", element: <ResetPasswordVerify /> },
        { path: "sign-up", element: <SignUpPage /> },
        { path: "sign-up-verify", element: <SignUpVerify /> },
        { path: "upload-docs", element: <UploadDocuments /> },
        { path: "application-review", element: <ApplicationReview /> },
      ],
    },

    //dashboard
    {
      path: "/auth",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={"/auth/dashboard"} replace />, index: true },
        {
          path: "dashboard",
          element: (
            <PageWrapper>
              {" "}
              <Dashboard />{" "}
            </PageWrapper>
          ),
        },
        {
          path: "ApiCredentials",
          element: (
            <PageWrapper>
              {" "}
              <ApiCredentials />{" "}
            </PageWrapper>
          ),
        },
        {
          path: "wallet",
          element: (
            <PageWrapper>
              {" "}
              <Wallet />{" "}
            </PageWrapper>
          ),
        },
        {
          path: "Services",
          element: (
            <PageWrapper>
              {" "}
              <Services />{" "}
            </PageWrapper>
          ),
        },
        {
          path: "ApiDocs",
          element: (
            <PageWrapper>
              {" "}
              <ApiDocs />{" "}
            </PageWrapper>
          ),
        },
        {
          path: "transactions",
          element: (
            <PageWrapper>
              {" "}
              <Transactions />{" "}
            </PageWrapper>
          ),
        },
        {
          path: "profile",
          element: (
            <PageWrapper>
              {" "}
              <Profile />{" "}
            </PageWrapper>
          ),
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [
        {
          path: "404",
          element: (
            <PageWrapper>
              <Page404 />
            </PageWrapper>
          ),
        },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);

  return (
    <AnimatePresence mode="wait">
      {/* Ensure unique key changes on route transitions */}
      <Suspense fallback={<LoadingScreen />}>
        <div key={location.pathname} style={{ width: "100%" }}>
          {routes}
        </div>
      </Suspense>
    </AnimatePresence>
  );
}
