import { Box, Link, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import Logo from "../../components/logo";
import { rowVariants } from "../../utils/cssStyles";
import { motion } from "framer-motion";
import Iconify from "../../components/iconify";

const socialLinks = [
  {
    title: "Github",
    icon: (
      <Iconify
        icon="fa:github-alt"
        width="20px"
        height="20px"
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
        width="20px"
        height="20px"
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
        width="20px"
        height="20px"
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
        width="20px"
        height="20px"
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

function Footer() {
  return (
    <Stack
      flexDirection={{ md: "row" }}
      justifyContent={"space-between"}
      gap={1}
      py={1}
      variants={rowVariants}
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <Box>
        <Logo />
        <Typography textAlign={{ xs: "center", md: "start" }}>
          A Product of Neosprint India
        </Typography>
      </Box>
      <Box>
        <Stack
          flexDirection={"row"}
          gap={2}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          <Link
            sx={{ cursor: "pointer" }}
            onClick={() =>
              window.open(import.meta.env.VITE_NEO_WEB_URL + "privacy-policy")
            }
            className="hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            sx={{ cursor: "pointer" }}
            onClick={() =>
              window.open(import.meta.env.VITE_NEO_WEB_URL + "terms-of-use")
            }
            className="hover:underline"
          >
            Terms of Use
          </Link>
          <Link
            sx={{ cursor: "pointer" }}
            onClick={() =>
              window.open(import.meta.env.VITE_NEO_WEB_URL + "cookies-policy")
            }
            className="hover:underline"
          >
            Cookies Policy
          </Link>
        </Stack>
        <Typography
          color="text.secondary"
          textAlign={{ xs: "center", md: "end" }}
          my={{ xs: 2, md: 0 }}
        >
          All Rights Reserved, Neosprint India Private Limited
        </Typography>
        <Stack
          flexDirection={"row"}
          gap={3}
          justifyContent={{ xs: "center", md: "end" }}
          mt={1}
        >
          {socialLinks.map((item) => (
            <Tooltip title={item.title} arrow>
              <span onClick={() => window.open(item.link)}>{item.icon}</span>
            </Tooltip>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

export default Footer;
