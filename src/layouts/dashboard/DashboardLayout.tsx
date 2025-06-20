import { useState } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { Box, Stack, Tooltip } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import { useSettingsContext } from "../../components/settings";
//
import Main from "./Main";
import Header from "./header";
import NavMini from "./nav/NavMini";
import NavVertical from "./nav/NavVertical";
import NavHorizontal from "./nav/NavHorizontal";
import Footer from "../Guest/Footer";
import Iconify from "../../components/iconify";
import ShowLastUpdate from "../../components/CustomComponents/ShowLastUpdate";
import ChatWidget from "../../components/CustomComponents/ChatWidget";

// ----------------------------------------------------------------------

const socialLinks = [
  {
    title: "Github",
    icon: (
      <Iconify
        icon="fa:github-alt"
        width="14px"
        height="14px"
        sx={{
          cursor: "pointer",
          transition: "300ms ease-in-out",
          "&:hover": {
            color: "#00ad53",
            scale: 1.1,
            transition: "300ms ease-in-out",
          },
        }}
      />
    ),
    link: "http://github.com/NeosprintIndia",
  },
  {
    title: "X",
    icon: (
      <Iconify
        icon="proicons:x-twitter"
        width="14px"
        height="14px"
        sx={{
          cursor: "pointer",
          transition: "300ms ease-in-out",
          "&:hover": {
            color: "#00ad53",
            scale: 1.1,
            transition: "300ms ease-in-out",
          },
        }}
      />
    ),
    link: "https://x.com/neoapibox",
  },
  {
    title: "Instagram",
    icon: (
      <Iconify
        icon="ri:instagram-line"
        width="14px"
        height="14px"
        sx={{
          cursor: "pointer",
          transition: "300ms ease-in-out",
          "&:hover": {
            color: "#00ad53",
            scale: 1.1,
            transition: "300ms ease-in-out",
          },
        }}
      />
    ),
    link: "https://www.instagram.com/neoapibox",
  },
  {
    title: "Linkedin",
    icon: (
      <Iconify
        icon="bi:linkedin"
        width="14px"
        height="14px"
        sx={{
          cursor: "pointer",
          transition: "300ms ease-in-out",
          "&:hover": {
            color: "#00ad53",
            scale: 1.1,
            transition: "300ms ease-in-out",
          },
        }}
      />
    ),
    link: "https://www.linkedin.com/showcase/neoapibox",
  },
];

export default function DashboardLayout() {
  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive("up", "md");

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = (
    <NavVertical openNav={open} onCloseNav={handleClose} />
  );

  if (isNavHorizontal) {
    return (
      <>
        <Header onOpenNav={handleOpen} />
        {!isDesktop && renderNavVertical}

        <Main>
          <Outlet />
          {isDesktop && (
            <Stack
              flexDirection={"row"}
              gap={2}
              sx={{ position: "fixed", right: 25, bottom: 1, zIndex: 9999 }}
            >
              {socialLinks.map((item) => (
                <Tooltip title={item.title} arrow>
                  <span onClick={() => window.open(item.link)}>
                    {item.icon}
                  </span>
                </Tooltip>
              ))}
            </Stack>
          )}
        </Main>
        <ShowLastUpdate />
        <ChatWidget />
      </>
    );
  }

  if (isNavMini) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: "flex" },
            minHeight: { lg: 1 },
          }}
        >
          {isDesktop ? <NavMini /> : renderNavVertical}

          <Main>
            <Outlet />
          </Main>
        </Box>
        <ShowLastUpdate />
        <ChatWidget />
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={handleOpen} />

      <Box
        sx={{
          display: { lg: "flex" },
          minHeight: { lg: 1 },
        }}
      >
        {renderNavVertical}

        <Main>
          <Outlet />
        </Main>
      </Box>
      <ShowLastUpdate />
      <ChatWidget />
    </>
  );
}
