import { Card, Input, TextField, Typography } from "@mui/material";
import React from "react";
import Iconify from "../../components/iconify";

function AIChat() {
  return (
    <Card sx={{ p: 3, height: window.innerHeight - 120, position: "relative" }}>
      <Typography fontSize={28} fontWeight={600}>
        Meet “APIra” 🤩
      </Typography>
      <Typography color="text.secondary">
        APIra is your always-on, AI-powered partner inside NeoAPIBox. From
        onboarding to real-time usage tracking, pricing queries to wallet
        assistance — APIra simplifies everything about your API journey. With
        intuitive answers, proactive tips, and deep integration support, APIra
        ensures you’re never stuck, always informed, and always in control.
      </Typography>
      <Typography mt={5} textAlign={"center"} variant="h4">
        {" "}
        Comming soon...
      </Typography>
    </Card>
  );
}

export default AIChat;
