// @mui
import { styled, alpha } from "@mui/material/styles";
import { Popover, ListItemButton, ListItemIcon } from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// config
import { NAV, ICON } from "../../../config";
//
import { NavItemProps } from "../types";

// ----------------------------------------------------------------------

type StyledItemProps = Omit<NavItemProps, "item">;

export const StyledItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "open",
})<StyledItemProps>(({ active, disabled, open, depth, theme }: any) => {
  const isLight = theme.palette.mode === "light";

  const subItem = depth !== 1;

  const activeStyle = {
    color: theme.palette.primary.main,
    backgroundColor: "white",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translate(-50%, 0)",
      borderRadius: "10px",
      width: "100%",
      height: "2px",
      backgroundColor: theme.palette.primary.main,
    },
    ...(!isLight && {
      color: theme.palette.primary.light,
    }),
  };

  const activeSubStyle = {
    color: theme.palette.text.primary,
    backgroundColor: "transparent",
  };

  const hoverStyle = {
    color: theme.palette.text.primary,
    backgroundColor: "white",
  };

  const afterStyle = {
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translate(-50%, 0)",
      borderRadius: "10px",
      width: "0%",
      height: "2px",
      backgroundColor: theme.palette.primary.main,
      transition: "150ms ease-in-out",
    },
    "&:hover::after": {
      width: "100%",
      transition: "150ms ease-in-out",
    },
  };

  return {
    flexShrink: 0,
    display: "inline-flex",
    textTransform: "capitalize",
    padding: theme.spacing(0, 0.75),
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    height: NAV.H_DASHBOARD_ITEM_HORIZONTAL,
    "&:hover": hoverStyle,
    ...afterStyle,
    // Sub item
    ...(subItem && {
      width: "100%",
      margin: 0,
      paddingRight: 0,
      paddingLeft: theme.spacing(1),
    }),
    // Active item
    ...(active && {
      ...activeStyle,
      "&:hover": {
        ...activeStyle,
      },
    }),
    // Active sub item
    ...(subItem &&
      active && {
        ...activeSubStyle,
        "&:hover": {
          ...activeSubStyle,
        },
      }),
    // Open
    ...(open &&
      !active && {
        ...hoverStyle,
        ...afterStyle,
      }),
    // Disabled
    ...(disabled && {
      "&.Mui-disabled": {
        opacity: 0.64,
      },
    }),
  };
});

// ----------------------------------------------------------------------

export const StyledIcon = styled(ListItemIcon)({
  marginRight: 8,
  flexShrink: 0,
  width: ICON.NAV_ITEM_HORIZONTAL,
  height: ICON.NAV_ITEM_HORIZONTAL,
});

// ----------------------------------------------------------------------

export const StyledPopover = styled(Popover)(({ theme }) => ({
  pointerEvents: "none",
  "& .MuiPopover-paper": {
    width: 160,
    pointerEvents: "auto",
    padding: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    boxShadow: theme.customShadows.dropdown,
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    ...bgBlur({ color: theme.palette.background.default }),
  },
}));
