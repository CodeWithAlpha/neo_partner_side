// @mui
import { useTheme } from "@mui/material/styles";
import {
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// hooks
import useOffSetTop from "../../../hooks/useOffSetTop";
import useResponsive from "../../../hooks/useResponsive";
// config
import { HEADER, NAV } from "../../../config";
// components
import Logo from "../../../components/logo";
import Iconify from "../../../components/iconify";
import { useSettingsContext } from "../../../components/settings";
//
import { NavSectionHorizontal } from "../../../components/nav-section";
import { useAuthContext } from "../../../auth/useAuthContext";
import NavConfig from "../nav/config";
import AccountPopover from "./AccountPopover";
import { fIndianCurrency } from "../../../utils/formatNumber";
import React from "react";

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default React.memo(function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const { logout, user } = useAuthContext();

  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const isDesktop = useResponsive("up", "md");

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  const renderContent = (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      gap={1}
      width={"100%"}
    >
      {!isDesktop ? (
        <IconButton
          onClick={onOpenNav}
          sx={{
            color: "text.primary",
            justifyContent: "start",
            width: "fit-content",
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      ) : (
        <Box sx={{ width: "fit-content" }}>
          <Logo />
        </Box>
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        {isDesktop && <NavSectionHorizontal data={NavConfig} />}
        <Typography
          sx={{
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            borderRadius: 5,
            py: 0.5,
            px: 2,
          }}
          color="primary.main"
        >
          <Iconify
            icon="fa6-solid:coins"
            width="512"
            height="512"
            sx={{ pt: 0.5 }}
          />{" "}
          {fIndianCurrency(+user?.wallet.bal.$numberDecimal)}
        </Typography>
        <AccountPopover />
      </Stack>
    </Stack>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: "background.default",
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { md: 4 },
          flexGrow: 1,
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
});
