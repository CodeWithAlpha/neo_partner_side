import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import icon from "../../assets/icons/neosprint.png";

function Footer() {
  return (
    <Stack
      flexDirection={"row"}
      alignItems={"center"}
      py={1}
      px={4}
      gap={4}
      sx={{ boxShadow: (theme) => theme.shadows[9] }}
    >
      <img src={icon} height={40} />
      <Stack flexDirection={"row"} gap={4} flexGrow={1}>
        <Typography color="primary.main">Term of use</Typography>
        <Typography color="primary.main">Privacy policy</Typography>
        <Typography color="primary.main">Cookies</Typography>
        <Typography color="primary.main">Language</Typography>
      </Stack>
      <Typography variant="body2" color="primary.main">
        © 2025 Neosprint India Private Limited | All rights reserved
      </Typography>
    </Stack>
  );
}

export default React.memo(Footer);
