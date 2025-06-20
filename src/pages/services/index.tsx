import {
  Box,
  Card,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useResponsive from "../../hooks/useResponsive";
import PlanPricing from "./PlanPricing";
import ActiveServices from "./ActiveServices";
import Iconify from "../../components/iconify";

function Services() {
  const [activeTab, setActiveTab] = useState("1");
  const isDesktop = useResponsive("up", "md");

  return (
    <>
      <Card
        sx={{
          m: { xs: 1, md: 2 },
          p: { xs: 2 },
          pt: 0,
          bgcolor: "background.default",
          borderRadius: 2,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newVal) => setActiveTab(newVal)}
          aria-label="lab API tabs example"
          sx={{ px: 2, py: 0.5 }}
          scrollButtons={isDesktop ? "auto" : false}
        >
          <Tab
            value="1"
            label={
              <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
                <Typography variant="subtitle1">Active Services</Typography>
                <Tooltip
                  title={
                    <Typography variant="body2">
                      Here’s what’s currently enabled for your account. Start
                      building and scaling with these services today.
                    </Typography>
                  }
                  placement="top"
                  arrow
                >
                  <Iconify
                    icon="ic:outline-info"
                    width="24px"
                    height="24px"
                    sx={{
                      color: "text.primary",
                      pt: 0.5,
                      "&:hover": { color: "#00ad53" },
                    }}
                  />
                </Tooltip>
              </Stack>
            }
          />
          <Tab
            value="2"
            label={
              <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
                <Typography variant="subtitle1">My Plan & Pricing</Typography>
                <Tooltip
                  title={
                    <Typography variant="body2">
                      Transparent pricing made simple. Here’s what you pay—and
                      what you earn—for each API call.
                    </Typography>
                  }
                  placement="top"
                  arrow
                >
                  <Iconify
                    icon="ic:outline-info"
                    width="24px"
                    height="24px"
                    sx={{
                      color: "text.primary",
                      pt: 0.5,
                      "&:hover": { color: "#00ad53" },
                    }}
                  />
                </Tooltip>
              </Stack>
            }
          />
        </Tabs>
        {activeTab == "1" && <ActiveServices />}
        {activeTab == "2" && <PlanPricing />}
      </Card>
    </>
  );
}

export default Services;
