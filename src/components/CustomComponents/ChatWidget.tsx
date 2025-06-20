// components/ChatWidget.tsx
import { memo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatSection from "../../pages/dashboard/chat/ChatSection";
import Iconify from "../iconify";
import chatIcon from "../../assets/icons/ChatIcon.svg";

export default memo(function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [isMinimize, setIsMinimize] = useState(false);
  if (window.location.pathname == "/auth/dashboard") return null;

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      {/* Floating Button */}
      {!open && (
        <IconButton onClick={() => setOpen(true)}>
          <Iconify
            icon="fluent:chat-empty-24-filled"
            width={"70px"}
            sx={{
              color: "primary.main",
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 1900,
            }}
          />
          <img
            src={chatIcon}
            height={26}
            width={26}
            style={{
              position: "fixed",
              bottom: 46,
              right: 46,
              zIndex: 1901,
              animation: "spin 4s linear infinite",
            }}
          />
        </IconButton>
      )}

      {/* Chat Box */}
      {open && (
        <>
          <Box
            onClick={() => setOpen(false)}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(4px)",
              zIndex: 1200,
            }}
          />
          <Paper
            elevation={4}
            sx={{
              position: "fixed",
              bottom: 50,
              right: 10,
              width: { xs: "95%", md: isMinimize ? "98%" : 450 },
              height: { xs: "90%", md: isMinimize ? "90%" : 500 },
              transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              zIndex: 1300,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderBottom: "1px solid #ccc",
              }}
            >
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <IconButton onClick={() => setIsMinimize(!isMinimize)}>
                  <Iconify
                    icon={
                      isMinimize
                        ? "solar:minimize-square-minimalistic-linear"
                        : "solar:maximize-square-outline"
                    }
                    width="24"
                    height="24"
                    sx={{ color: "primary" }}
                  />
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{ flexGrow: 1, color: "green", fontWeight: "bold" }}
                >
                  NeoapiBox Chat
                </Typography>
              </Stack>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ height: "100%", px: 2 }}>
              <ChatSection isMinimize={isMinimize} />
            </Box>
          </Paper>
        </>
      )}
    </>
  );
});
