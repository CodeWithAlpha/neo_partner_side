import { m, MotionProps } from "framer-motion";
// @mui
import { Box, BoxProps } from "@mui/material";
//
import { varFade } from "./variants";

// ----------------------------------------------------------------------

type Props = BoxProps & MotionProps;

interface TextAnimateProps extends Props {
  text: string;
}

export default function TextAnimate({
  text,
  variants,
  sx,
  ...other
}: TextAnimateProps) {
  return (
    <Box
      component={m.span}
      sx={{
        m: 0,
        typography: "body1",
        overflow: "hidden",
        fontWeight: 700,
        margin: "auto",
        ...sx,
      }}
      {...other}
    >
      {text.split(" ").map((letter, index) => (
        <m.span
          key={index}
          variants={variants || varFade({ durationIn: 1 }).inUp}
        >
          {letter}
        </m.span>
      ))}
    </Box>
  );
}
