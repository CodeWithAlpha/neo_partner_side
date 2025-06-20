import { memo } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

function Intigration({ isHover, ...other }: any) {
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;

  const WARNING_LIGHT = theme.palette.warning.light;

  return (
    <Box {...other}>
      <svg
        id="Frame"
        xmlns="http://www.w3.org/2000/svg"
        width="79"
        height="79"
        viewBox="0 0 79 79"
      >
        <defs>
          <clipPath id="clip-path">
            <rect
              id="Frame_Background_Mask_"
              data-name="Frame (Background/Mask)"
              width="79"
              height="79"
              fill="none"
            />
          </clipPath>
        </defs>
        <rect
          id="Frame_Background_Mask_2"
          data-name="Frame (Background/Mask)"
          width="79"
          height="79"
          fill="none"
        />
        <g id="Frame-2" data-name="Frame" clip-path="url(#clip-path)">
          <g id="Group" transform="translate(0 3.292)">
            <path
              id="Union"
              d="M32.978,72.417h-.061a32.917,32.917,0,0,1,0-65.833,3.263,3.263,0,0,1,2.327.965,3.308,3.308,0,0,1,.964,2.327V34.332a9.194,9.194,0,0,0,2.691,6.5L56.178,58.109a3.265,3.265,0,0,1,.965,2.322,3.309,3.309,0,0,1-.957,2.326,32.568,32.568,0,0,1-23.147,9.66Zm-12.748-56A26.334,26.334,0,0,0,32.9,65.834h.111A26.049,26.049,0,0,0,49.06,60.3L34.242,45.482a15.667,15.667,0,0,1-4.618-11.149V13.371A26.211,26.211,0,0,0,20.23,16.413ZM67.013,57.145a3.262,3.262,0,0,1-2.322-.964L47.612,39.1a16.353,16.353,0,0,1-4.82-11.637V3.292A3.291,3.291,0,0,1,46.083,0,32.953,32.953,0,0,1,79,32.917a32.581,32.581,0,0,1-9.661,23.27,3.269,3.269,0,0,1-2.318.958ZM49.375,27.464a9.9,9.9,0,0,0,2.891,6.982L66.881,49.06a26.019,26.019,0,0,0,5.536-16.143A26.376,26.376,0,0,0,49.375,6.788Z"
              fill={isHover ? "#fff" : theme.palette.primary.main}
            />
            <path
              id="Vector"
              d="M.964,5.619a3.292,3.292,0,0,0,2.328.964H16.458a3.292,3.292,0,1,0,0-6.583H3.292A3.292,3.292,0,0,0,.964,5.619Z"
              transform="translate(19.75 52.667)"
              fill={isHover ? "#fff" : theme.palette.primary.main}
            />
          </g>
        </g>
      </svg>
    </Box>
  );
}

export default memo(Intigration);
