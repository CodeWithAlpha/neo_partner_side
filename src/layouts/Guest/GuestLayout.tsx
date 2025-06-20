// @mui
import { Typography, Stack, Box, useTheme } from "@mui/material";

//
import { StyledRoot, StyledSectionBg, StyledContent } from "./styles";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import { motion } from "framer-motion";
import { NAV } from "../../config";
import useResponsive from "../../hooks/useResponsive";
import ShowLastUpdate from "../../components/CustomComponents/ShowLastUpdate";

// ----------------------------------------------------------------------

export default function GuestLayout() {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const { pathname } = useLocation();

  return (
    <StyledRoot>
      <Box
        component={motion.div}
        sx={{
          bgcolor: "background.default",
          width: "100%",
          position: "fixed",
          zIndex: 9,
        }}
      >
        <Header />
      </Box>
      <StyledContent
        sx={{
          [theme.breakpoints.up("md")]: {
            width: pathname == "/user/application-review" ? "100%" : 580,
            height: "100vh",
            flexShrink: 0,
            padding: theme.spacing(10, 8, 10, 8),
          },
        }}
      >
        <Stack sx={{ width: 1 }}>
          <Outlet />
        </Stack>
      </StyledContent>
      {pathname != "/user/application-review" && (
        <>
          {[
            "/user/login",
            "/user/reset-password",
            "/user/login-verify",
            "reset-password-verify",
          ].includes(pathname) ? (
            <Box
              component={motion.div}
              sx={{
                display: "none",
                position: "relative",
                padding: `${NAV.H_DASHBOARD_ITEM * 2}px ${
                  NAV.H_DASHBOARD_ITEM * 1
                }px`,
                [theme.breakpoints.up("md")]: {
                  backgroundColor: theme.palette.primary.main,
                  display: "flex",
                  flexDirection: "column",
                },
              }}
              initial={{ flexGrow: 0 }}
              animate={{ flexGrow: 1 }}
            >
              <Typography variant="h3" color="common.white">
                Welcome Back to NeoAPIBox
              </Typography>
              <Typography variant="h4" color="common.white">
                Your secure access to APIs, reports, and wallet management
              </Typography>
              <Typography fontSize={16} mt={2} color="common.white">
                Log in to your NeoAPIBox Partner Portal to manage your API
                credentials, access wallet services, view documentation,
                download transaction reports, and track your usage insights.
                Experience a seamless platform built for developers, partners,
                and financial innovators.
              </Typography>

              <StyledSectionBg />
            </Box>
          ) : (
            <Box
              component={motion.div}
              sx={{
                display: "none",
                position: "relative",
                padding: `${NAV.H_DASHBOARD_ITEM * 2}px ${
                  NAV.H_DASHBOARD_ITEM * 1
                }px`,
                [theme.breakpoints.up("md")]: {
                  backgroundColor: theme.palette.primary.main,
                  display: "flex",
                  flexDirection: "column",
                },
              }}
              initial={{ flexGrow: 0 }}
              animate={{ flexGrow: 1 }}
            >
              <Typography variant="h3" color="common.white">
                Create Your NeoAPIBox Account
              </Typography>
              <Typography variant="h4" color="common.white">
                Register to start using our secure and powerful API
                infrastructure.
              </Typography>
              <Typography fontSize={16} mt={2} color="common.white">
                Register today to get access to NeoAPIBox’s suite of financial
                and utility APIs. As a partner, you’ll be able to securely
                generate credentials, manage transactions, load wallet funds,
                and much more — all from one smart dashboard designed with ease
                and scalability in mind.
              </Typography>

              <StyledSectionBg />
            </Box>
          )}
        </>
      )}
      {isDesktop && (
        <Box
          component={motion.div}
          sx={{
            backgroundColor: "background.default",
            width: "100%",
            position: "fixed",
            bottom: 0,
            zIndex: 9,
          }}
        >
          <Footer />
        </Box>
      )}
      <ShowLastUpdate />
    </StyledRoot>
  );
}
