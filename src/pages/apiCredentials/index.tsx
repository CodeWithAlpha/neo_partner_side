import { Grid2 } from "@mui/material";
import React from "react";
import ApiCreds from "./ApiCreds";
import WebhookURL from "./WebhookURL";

function ApiCredentials() {
  return (
    <Grid2 container p={{ xs: 1, md: 3 }} spacing={3}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <ApiCreds />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <WebhookURL />
      </Grid2>
    </Grid2>
  );
}

export default ApiCredentials;
