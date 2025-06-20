import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import Iconify from "../../components/iconify";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";
import Logo from "../../components/logo";
import { useAuthContext } from "../../auth/useAuthContext";
import useResponsive from "../../hooks/useResponsive";

function Header() {
  const isDesktop = useResponsive("up", "md");
  const { logout } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dynamicHeader = [
    "/user/login",
    "/user/reset-password",
    "/user/login-verify",
  ].includes(pathname) ? (
    <>
      {" "}
      {isDesktop && <Typography>Don’t have and account?</Typography>}
      <Button onClick={() => navigate(PATH_AUTH.signUp)}>Sign up</Button>
    </>
  ) : ["/user/application-review", "/user/upload-docs"].includes(pathname) ? (
    <Button
      variant="outlined"
      onClick={() => {
        logout();
        navigate(PATH_AUTH.login);
      }}
    >
      Logout
    </Button>
  ) : (
    <>
      {" "}
      {isDesktop && <Typography>Already have account?</Typography>}
      <Button onClick={() => navigate(PATH_AUTH.login)}>Sign in</Button>
    </>
  );

  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      py={1}
      px={{ xs: 2, md: 4 }}
    >
      <Box sx={{ width: "fit-content" }}>
        <Logo />
      </Box>
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        {dynamicHeader}
        {/* <Iconify icon={"mdi:search"} height={40} width={40} /> */}
      </Stack>
    </Stack>
  );
}

export default React.memo(Header);
