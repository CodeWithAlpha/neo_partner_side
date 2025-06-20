import {
  alpha,
  Box,
  Button,
  Collapse,
  Drawer,
  Grid,
  Grid2,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Logo from "../../components/logo";
import useResponsive from "../../hooks/useResponsive";
import Iconify from "../../components/iconify";
import { homePageFontStyles } from "../../pages/Home";
import { useAuthContext } from "../../auth/useAuthContext";
import { PATH_AUTH, PATH_DASHBOARD } from "../../routes/paths";
import { useNavigate } from "react-router-dom";
import image from "../../assets/illustrations/NeoTeamImage.jpg";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { AuthUserType } from "../../auth/types";
import AccountPopover from "../../layouts/dashboard/header/AccountPopover";

const navItems = [
  { label: "Home", href: "" },
  {
    label: "Neosprint",
    href: "https://neosprintindia.com/about/",
    isdropdown: true,
  },
  { label: "How to Start", href: "how-to-start" },
  { label: "Features", href: "features" },
  { label: "Contact", href: "contact" },
];

const neoSprintDropdownData = [
  {
    icon: (
      <Iconify
        icon="fa-solid:building"
        width="24px"
        height="24px"
        style={{ color: "#00ad53" }}
      />
    ),
    title: "Company Overview",
    desc: "Neosprint India: A leading IT consulting company specializing in technology, UI/UX, branding, and marketing, driving business growth through innovation.",
    href: "https://neosprintindia.com/about/",
  },
  {
    icon: (
      <Iconify
        icon="stash:people-group"
        width="26px"
        height="26px"
        style={{ color: "#00ad53" }}
      />
    ),
    title: "Our Team",
    desc: "Our team comprises experienced professionals who combine expertise and innovation to deliver exceptional results for our clients’ success.",
    href: "https://neosprintindia.com/neo-team/",
  },
  {
    icon: (
      <Iconify
        icon="healthicons:agriculture"
        width="26px"
        height="26px"
        style={{ color: "#00ad53" }}
      />
    ),
    title: "Company Culture",
    desc: "Our company fosters a positive and inclusive culture that values collaboration, continuous learning, and employee well-being for a thriving work environment.",
    href: "https://neosprintindia.com/company-culture/",
  },
  {
    icon: (
      <Iconify
        icon="mdi:partnership"
        width="24px"
        height="24px"
        style={{ color: "#00ad53" }}
      />
    ),
    title: "Partnerships and Collaborations",
    desc: "We establish strategic partnerships and collaborations to leverage expertise, expand capabilities, and deliver comprehensive solutions to our clients.",
    href: "https://neosprintindia.com/partnerships-and-collaborations/",
  },
];

const resourceLinks = [
  { label: "Blog", href: "https://neosprintindia.com/neo-insights/" },
  { label: "Case Studies", href: "https://neosprintindia.com/case-studies/" },
  {
    label: "Privacy Policy",
    href: "https://neosprintindia.com/privacy-policy/",
  },
  {
    label: "Cookies Policy",
    href: "https://neosprintindia.com/cookies-policy/",
  },
  {
    label: "Terms Of Services",
    href: "https://neosprintindia.com/terms-of-services/",
  },
];

function Header() {
  const { user } = useAuthContext();

  const theme = useTheme();
  const navigate = useNavigate();
  const isDesktop = useResponsive("up", "md");

  const [isSubMenu, setIsSubMenu] = useState(false);

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  const DrawerList = (
    <Box sx={{ width: 250, p: 1 }} role="presentation">
      <Logo
        pt={2}
        onClick={() => window.open(import.meta.env.VITE_NEO_WEB_URL)}
      />
      <List sx={{ mt: 2 }}>
        {navItems.map((item, index) => (
          <>
            <ListItemButton>
              <ListItemText
                key={item.label}
                primary={
                  <Typography
                    fontSize={18}
                    fontWeight={600}
                    onClick={() =>
                      item.label != "Neosprint" &&
                      window.open(import.meta.env.VITE_NEO_WEB_URL + item.href)
                    }
                  >
                    {item.label}{" "}
                  </Typography>
                }
                sx={{
                  cursor: "pointer",
                  my: 0.5,
                  transition: "200ms ease-in-out",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    transition: "200ms ease-in-out",
                  },
                }}
                onClick={() => {
                  item.label == "Neosprint"
                    ? setIsSubMenu(!isSubMenu)
                    : toggleDrawer(false);
                }}
              />{" "}
              {item.isdropdown && (isSubMenu ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {item.isdropdown && (
              <Collapse in={isSubMenu} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {neoSprintDropdownData.map((item) => (
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography
                            fontSize={16}
                            fontWeight={600}
                            onClick={() => {
                              setIsSubMenu(false);
                              setOpen(false);
                              window.open(item.href);
                            }}
                            sx={{ ml: 2 }}
                          >
                            {item.title}{" "}
                          </Typography>
                        }
                        sx={{
                          cursor: "pointer",
                          transition: "200ms ease-in-out",
                          "&:hover": {
                            color: theme.palette.primary.main,
                            transition: "200ms ease-in-out",
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </>
        ))}
      </List>
    </Box>
  );

  if (isDesktop) {
    return (
      <Grid2 container spacing={1} py={1}>
        {/* <Box
      display={'grid'}
      gridTemplateColumns={''}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      > */}
        <Grid2 size={5}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center",
            }}
          >
            {navItems.map((item) =>
              item.isdropdown ? (
                <Box
                  key={item.label}
                  className="menu"
                  sx={{
                    position: "relative",
                    "&:hover .dropdown": {
                      visibility: "visible",
                      opacity: 1,
                      transform: "translateY(0)",
                      transition: "200ms ease-in-out",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.primary",
                      cursor: "pointer",
                      fontWeight: 500,
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {item.label}
                  </Typography>

                  <Grid
                    container
                    spacing={2}
                    className="dropdown"
                    sx={{
                      backgroundColor: "white",
                      maxWidth: "1320px",
                      opacity: 0,
                      transform: "translateY(10px)",
                      transition: "200ms ease-in-out",
                      position: "fixed",
                      top: 80,
                      visibility: "hidden",
                      zIndex: 1,
                      boxShadow: (theme) => theme.shadows[13],
                      borderRadius: 2,
                    }}
                  >
                    <Grid item xs={12} md={4}>
                      <Typography variant="h6" fontWeight={600} p={2}>
                        About Neosprint
                      </Typography>
                      {neoSprintDropdownData.map((data) => (
                        <Box
                          key={data.title}
                          display="flex"
                          gap={2}
                          p={2}
                          py={1}
                          onClick={() => window.open(data.href)}
                        >
                          <Box
                            sx={{
                              px: 1.5,
                              py: 1,
                              bgcolor: "#e8f5e9",
                              borderRadius: "50%",
                              height: "fit-content",
                            }}
                          >
                            {data.icon}
                          </Box>
                          <Box
                            sx={{
                              cursor: "pointer",
                              transition: "200ms ease-in-out",
                              "&:hover": {
                                transform: "translateX(5px)",
                                transition: "200ms ease-in-out",
                              },
                            }}
                          >
                            <Typography fontWeight={600} fontSize={20}>
                              {data.title}
                            </Typography>
                            <Typography fontSize={14}>{data.desc}</Typography>
                          </Box>
                        </Box>
                      ))}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{ bgcolor: (theme) => theme.palette.grey[200] }}
                    >
                      <Box p={2}>
                        <img
                          src={image}
                          alt="Neo Team"
                          style={{ borderRadius: 8 }}
                        />
                        <Typography fontWeight={600} mt={2} fontSize={18}>
                          Careers and Opportunities
                        </Typography>
                        <Typography variant="body2" mb={2}>
                          At Neosprint, we believe in nurturing talent and
                          providing exciting career opportunities. Join our team
                          to work on innovative projects, expand your skills
                          through training programs, and grow professionally in
                          a collaborative and supportive environment. We value
                          career development and offer a platform for your
                          success.
                        </Typography>
                        <Button
                          variant="contained"
                          color="success"
                          href="https://neosprintindia.com/neosprint-career/"
                          target="_blank"
                          sx={{ fontWeight: 600 }}
                        >
                          Apply Now
                        </Button>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{
                        position: "relative",
                        bgcolor: (theme) => theme.palette.grey[200],
                        borderTopRightRadius: "16px",
                        borderBottomRightRadius: "16px",
                        borderLeft: "1px solid #dadada",
                      }}
                    >
                      <Typography fontWeight={600} p={2} fontSize={18}>
                        Resources
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={1} p={2}>
                        {resourceLinks.map((res) => (
                          <Typography
                            key={res.label}
                            sx={{
                              cursor: "pointer",
                              fontWeight: 500,
                              "&:hover": { color: "primary.main" },
                            }}
                            onClick={() => window.open(res.href)}
                          >
                            {res.label}
                          </Typography>
                        ))}
                      </Box>
                      <Paper
                        elevation={0}
                        sx={{
                          mt: 3,
                          p: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          borderRadius: 1,
                          bgcolor: "white",
                          position: "fixed",
                          bottom: 15,
                          right: 15,
                        }}
                      >
                        <Typography fontSize={14}>
                          Are looking for custom service?
                        </Typography>
                        <Iconify
                          icon="material-symbols-light:call-sharp"
                          width="20"
                          height="20"
                          style={{ color: "#00ad53", cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              "https://neosprintindia.com/get-a-consultation/"
                            )
                          }
                        />{" "}
                        <Typography
                          onClick={() =>
                            window.open(
                              "https://neosprintindia.com/get-a-consultation/"
                            )
                          }
                          sx={{ color: "#00ad53", cursor: "pointer" }}
                        >
                          Get a Callback
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Typography
                  key={item.label}
                  onClick={() => navigate(item.href)}
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    fontWeight: 500,
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {item.label}
                </Typography>
              )
            )}
          </Box>
        </Grid2>
        <Grid2 size={2}>
          <Logo
            disabledLink
            onClick={() => window.open(import.meta.env.VITE_NEO_WEB_URL)}
          />
        </Grid2>
        <Grid2 size={5}>
          {user?._id ? (
            <>
              <Stack flexDirection={"row"} justifyContent={"end"} gap={2}>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 4, px: 3 }}
                  onClick={() => navigate(PATH_DASHBOARD.dashboard)}
                >
                  Dashboard
                </Button>
                <AccountPopover />
              </Stack>
            </>
          ) : (
            <Stack flexDirection={"row"} justifyContent={"end"} gap={2}>
              <Button
                variant="contained"
                sx={{ borderRadius: 4, px: 3 }}
                onClick={() => navigate(PATH_AUTH.signUp)}
              >
                Signup
              </Button>
              <Button
                variant="outlined"
                sx={{ borderRadius: 4, px: 3 }}
                onClick={() => navigate(PATH_AUTH.login)}
              >
                Login
              </Button>
            </Stack>
          )}
        </Grid2>
      </Grid2>
    );
  }

  return (
    <>
      <Stack
        alignItems={"end"}
        justifyContent={"center"}
        sx={{ position: "relative" }}
      >
        <Logo
          sx={{
            position: "absolute",
            top: 15,
            left: 0,
          }}
        />
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{
            color: "text.primary",
            justifySelf: "end",
            width: "fit-content",
            pt: 2,
          }}
        >
          <Iconify icon="tabler:menu-4" width={30} />
        </IconButton>
      </Stack>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}

export default Header;
