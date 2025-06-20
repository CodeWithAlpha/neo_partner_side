import {
  Box,
  Button,
  Card,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CloseIcon } from "../../../theme/overrides/CustomIcons";

function ChatSection() {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    console.log("connect");
    return () => console.log("disconnect");
  }, []);

  return (
    <>
      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(e, val) => setTab(val)}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Support" sx={{ fontWeight: "bold" }} />
        <Tab label="APIra Bot" sx={{ fontWeight: "bold" }} />
      </Tabs>

      {/* Chat Content */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          //   bgcolor: "#f1fff1",
          // minHeight: 310,
          height: "calc(100% - 110px)",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            bgcolor: "#e6ffe6",
            display: "inline-block",
            px: 2,
            py: 1,
            borderRadius: 2,
            mb: 1,
            boxShadow: 1,
          }}
        >
          <Typography>Hi! How can we help you today?</Typography>
        </Box>
      </Box>

      {/* Message Input */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          borderTop: "1px solid #ccc",
        }}
      >
        <TextField
          placeholder="Type your message..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mr: 1 }}
        />
        <Button variant="contained" color="success">
          Send
        </Button>
      </Box>
    </>
  );
}

export default ChatSection;
