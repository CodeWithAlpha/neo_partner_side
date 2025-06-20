import { memo } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

function Unified({ isHover, ...other }: any) {
  const theme = useTheme();

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
          <path
            id="Vector"
            d="M9.273,36.492A19.75,19.75,0,1,1,36.5,9.278a3.292,3.292,0,0,1-5.587,3.485A13.167,13.167,0,1,0,12.764,30.909a3.292,3.292,0,0,1-1.749,6.083h0A3.284,3.284,0,0,1,9.273,36.492Z"
            transform="translate(19.757 19.757)"
            fill={isHover ? "#fff" : theme.palette.primary.main}
          />
          <path
            id="Union"
            d="M9.524,78.944a9.832,9.832,0,0,1-2.7-19.188A62.132,62.132,0,0,1,23.92,24.006,60.475,60.475,0,0,1,59.647,6.983a9.849,9.849,0,1,1,13.58,11.825,9.941,9.941,0,0,1-4.184.931c-.333,0-.675-.018-1.016-.052a9.872,9.872,0,0,1-8.127-6.1A53.847,53.847,0,0,0,28.575,28.661a55.3,55.3,0,0,0-15.155,31.3A9.832,9.832,0,0,1,9.833,78.949C9.732,78.949,9.627,78.947,9.524,78.944ZM9.147,65.9a3.291,3.291,0,1,0,.641-.063A3.3,3.3,0,0,0,9.147,65.9ZM68.4,6.646a3.284,3.284,0,1,0,.64-.063A3.381,3.381,0,0,0,68.4,6.646ZM32.831,69.125a6.591,6.591,0,0,1-6.583-6.584V55.958a6.591,6.591,0,0,1,6.583-6.583h6.583A6.59,6.59,0,0,1,46,55.958v6.583a6.59,6.59,0,0,1-6.583,6.584Zm0-6.584h6.586l0-6.583H32.831ZM55.872,46.083A6.588,6.588,0,0,1,49.289,39.5V32.917a6.591,6.591,0,0,1,6.583-6.583h6.583a6.591,6.591,0,0,1,6.583,6.583V39.5a6.588,6.588,0,0,1-6.583,6.583Zm0-6.583h6.587l0-6.583H55.872Z"
            transform="translate(0.086)"
            fill={isHover ? "#fff" : theme.palette.primary.main}
          />
        </g>
      </svg>
    </Box>
  );
}

export default memo(Unified);
