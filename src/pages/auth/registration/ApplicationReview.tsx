import { Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Iconify from "../../../components/iconify";
import { useAuthContext } from "../../../auth/useAuthContext";
import { fDate } from "../../../utils/formatTime";

function ApplicationReview() {
  const { user, initialize } = useAuthContext();

  useEffect(() => {
    initialize();
  }, []);

  const CustomStack = (key: string, value: string) => (
    <Stack flexDirection={"row"} gap={2} my={2}>
      <Typography textAlign={"end"} variant="subtitle1" flexBasis={"50%"}>
        {key}
      </Typography>
      <Typography textAlign={"start"} flexBasis={"50%"}>
        {value}
      </Typography>
    </Stack>
  );

  return (
    <Stack alignItems={"center"} my={2}>
      <Iconify
        icon="weui:time-outlined"
        width={60}
        height={60}
        color={"primary.main"}
      />

      <Typography variant="h3" color="primary.main" my={3}>
        Sign the Agreement to Start Using NeoAPIBox
      </Typography>
      <Typography variant="body1" textAlign={"center"} maxWidth={600}>
        Congratulations! Your profile has been successfully verified by the
        NeoAPIBox team. Before you can start using our APIs, please review and
        sign the E-Agreement to comply with our terms and conditions.
      </Typography>

      <Stack sx={{ width: { xs: "95%", md: 600 } }}>
        {CustomStack("User Code", "NEO-0001")}
        <Divider />
        {CustomStack("Business Name", user?.companyName)}
        <Divider />
        {CustomStack(
          "Your Active Services",
          user?.requestedServices.length + " Services"
        )}
        <Divider />
        {CustomStack("Estimated Review Time", "24 - 48 hours")}
        <Divider />
        {CustomStack("Signup Date", fDate(user?.createdAt))}
        <Divider />
      </Stack>

      <Button variant="contained" sx={{ width: "fit-content", mt: 2 }}>
        Sign & Get Started
      </Button>
      <Typography variant="body2" my={2}>
        Need More Services?{" "}
        <Typography variant="overline" color="primary.main">
          {" "}
          Click here
        </Typography>{" "}
        to request additional services before signing.
      </Typography>
    </Stack>
  );
}

export default ApplicationReview;
