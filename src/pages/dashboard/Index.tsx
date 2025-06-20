import { Card, Grid2 } from "@mui/material";
import React, { useEffect } from "react";
import Analytics from "./Analytics";
import AIChat from "./AIChat";
import fetcher from "../../api/fetcher";
import { END_POINTS } from "../../api/EndPoints";
import ChatSection from "./chat/ChatSection";

function Dashboard() {
  return (
    <Grid2 container p={{ xs: 1, md: 3 }} spacing={3} width={"100%"}>
      <Grid2 size={{ lg: 8 }} width={"100%"}>
        <Analytics />
      </Grid2>
      <Grid2 size={{ lg: 4 }}>
        {/* <AIChat /> */}
        <Card sx={{ height: "100%", p: 2 }}>
          <ChatSection isMinimize={false} />
        </Card>
      </Grid2>
    </Grid2>
  );
}

export default Dashboard;
