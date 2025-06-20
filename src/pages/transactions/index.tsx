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
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ApiTransaction from "./ApiTransaction";
import ExportReport from "./ExportReport";
import Iconify from "../../components/iconify";

function Transactions() {
  const [activeTab, setActiveTab] = useState("1");
  const isDesktop = useResponsive("up", "md");

  return (
    <>
      <Card
        sx={{
          m: { xs: 1, md: 3 },
          p: { xs: 2 },
          height: isDesktop ? window.innerHeight - 120 : "fit-content",
          overflow: "auto",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newVal) => setActiveTab(newVal)}
          aria-label="lab API tabs example"
          sx={{ p: 0.5 }}
          scrollButtons={isDesktop ? "auto" : false}
        >
          <Tab
            value="1"
            label={
              <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
                <Typography variant="subtitle1">View Transactions</Typography>
                <Tooltip
                  title={
                    <Typography variant="body2">
                      View and filter all API transactions made via your account
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
                <Typography variant="subtitle1">Export Your report</Typography>
                <Tooltip
                  title={
                    <Typography variant="body2">
                      Get detailed service usage or wallet transactions in Excel
                      format
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
        {activeTab == "1" && <ApiTransaction />}
        {activeTab == "2" && <ExportReport />}
      </Card>
    </>
  );
}

export default Transactions;
