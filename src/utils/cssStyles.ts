// @mui
import { SwitchProps, Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

type BgBlurProps = {
  blur?: number;
  opacity?: number;
  color?: string;
  imgUrl?: string;
};

export function bgBlur(props?: BgBlurProps) {
  const color = props?.color || "#000000";
  const blur = props?.blur || 6;
  const opacity = props?.opacity || 0.8;
  const imgUrl = props?.imgUrl;

  if (imgUrl) {
    return {
      position: "relative",
      backgroundImage: `url(${imgUrl})`,
      "&:before": {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: "100%",
        height: "100%",
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    } as const;
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  };
}

// ----------------------------------------------------------------------

type BgGradientProps = {
  direction?: string;
  color?: string;
  startColor?: string;
  endColor?: string;
  imgUrl?: string;
};

export function bgGradient(props?: BgGradientProps) {
  const direction = props?.direction || "to bottom";
  const startColor = props?.startColor;
  const endColor = props?.endColor;
  const imgUrl = props?.imgUrl;
  const color = props?.color;

  if (imgUrl) {
    return {
      background: `linear-gradient(${direction}, ${startColor || color}, ${
        endColor || color
      }), url(${imgUrl})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    };
  }

  return {
    background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
  };
}

// ----------------------------------------------------------------------

export function textGradient(value: string) {
  return {
    background: `-webkit-linear-gradient(${value})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
}

// ----------------------------------------------------------------------

export function filterStyles(value: string) {
  return {
    filter: value,
    WebkitFilter: value,
    MozFilter: value,
  };
}

// ----------------------------------------------------------------------

export const hideScrollbarY = {
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
} as const;

// ----------------------------------------------------------------------

export const hideScrollbarX = {
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  overflowX: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
} as const;

export default function Switch(theme: Theme) {
  const isLight = theme.palette.mode === "light";

  const rootStyle = (ownerState: SwitchProps) => ({
    padding: "9px 13px 9px 12px",
    width: 58,
    height: 38,
    ...(ownerState.size === "small" && {
      padding: "4px 8px 4px 7px",
      width: 40,
      height: 24,
    }),
    "& .MuiSwitch-thumb": {
      width: 14,
      height: 14,
      boxShadow: "none",
      color: `${theme.palette.common.white} !important`,
      ...(ownerState.size === "small" && {
        width: 10,
        height: 10,
      }),
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      borderRadius: 14,
      backgroundColor: alpha(theme.palette.grey[500], 0.48),
    },
    "& .MuiSwitch-switchBase": {
      left: 3,
      padding: 12,
      ...(ownerState.size === "small" && {
        padding: 7,
      }),
      "&.Mui-checked": {
        transform: "translateX(13px)",
        "&+.MuiSwitch-track": { opacity: 1 },
        ...(ownerState.size === "small" && {
          transform: "translateX(9px)",
        }),
      },
      "&.Mui-disabled": {
        "& .MuiSwitch-thumb": { opacity: isLight ? 1 : 0.48 },
        "&+.MuiSwitch-track": { opacity: 0.48 },
      },
    },
  });

  return {
    MuiSwitch: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: SwitchProps }) =>
          rootStyle(ownerState),
      },
    },
  };
}

export const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.4 },
  }),
};

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: { xs: "95%", md: 400 },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};
