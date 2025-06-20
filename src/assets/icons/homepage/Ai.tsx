import { memo } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

function Ai({ isHover, ...other }: any) {
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;

  const WARNING_LIGHT = theme.palette.warning.light;

  return (
    <Box {...other}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="78.998"
        height="79.002"
        viewBox="0 0 78.998 79.002"
      >
        <g id="Group" transform="translate(-0.002 0.002)">
          <g id="Layer_5" data-name="Layer 5">
            <path
              id="Vector"
              d="M72.419,79H65.836a6.6,6.6,0,0,1-6.587-6.583H19.75A6.594,6.594,0,0,1,13.167,79H6.583A6.59,6.59,0,0,1,0,72.416V65.833a6.59,6.59,0,0,1,6.581-6.583v-39.5A6.585,6.585,0,0,1,0,13.165V6.581A6.59,6.59,0,0,1,6.583,0h6.583A6.594,6.594,0,0,1,19.75,6.581h39.5A6.6,6.6,0,0,1,65.836,0h6.583A6.59,6.59,0,0,1,79,6.581v6.583a6.585,6.585,0,0,1-6.581,6.583v39.5A6.59,6.59,0,0,1,79,65.833v6.583A6.59,6.59,0,0,1,72.419,79ZM65.833,65.833v6.583h6.586l0-6.583Zm-59.25,0v6.583h6.586l0-6.583ZM19.75,13.167a6.59,6.59,0,0,1-6.583,6.581v39.5a6.594,6.594,0,0,1,6.583,6.583h39.5a6.6,6.6,0,0,1,6.584-6.583v-39.5a6.593,6.593,0,0,1-6.584-6.581ZM6.583,6.583v6.583H13.17l0-6.583Zm59.252,0v6.583h6.586l0-6.583Z"
              fill={isHover ? "#fff" : theme.palette.primary.main}
            />
            <path
              id="Vector-2"
              data-name="Vector"
              d="M11.2,38.849a3.293,3.293,0,0,1-1.188-1.7L.139,4.237a3.292,3.292,0,0,1,4.1-4.1l32.917,9.875a3.291,3.291,0,0,1-.4,6.4L19.319,19.319,16.413,36.751a3.292,3.292,0,0,1-3.037,2.743c-.07.006-.141.006-.209.006A3.292,3.292,0,0,1,11.2,38.849Z"
              transform="translate(23.041 23.041)"
              fill={isHover ? "#fff" : theme.palette.primary.main}
            />
          </g>
        </g>
      </svg>
    </Box>
  );
}

export default memo(Ai);
