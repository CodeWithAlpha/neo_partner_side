import {
  Box,
  Button,
  Card,
  Grid2,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import LineChart from "./charts/LineChart";
import PeiChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import useResponsive from "../../hooks/useResponsive";
import fetcher from "../../api/fetcher";
import { END_POINTS } from "../../api/EndPoints";
import CountUp from "react-countup";
import dayjs from "dayjs";

const tabOptions = ["Today", "Last 7 Days", "Last 30 Days", "Last 180 Days"];

function Analytics() {
  const isDesktop = useResponsive("up", "md");
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabVale] = useState("Today");
  const [cardData, setCardData] = useState<{ label: string; value: string }[]>(
    []
  );
  const [pieChartData, setPieChartData] = useState<number[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);
  const [lineChartData, setLineChartData] = useState<number[]>([]);

  const handleTabClick = (newValue: string) => {
    setTimeout(() => {
      setIsLoading(true);
      setTabVale(newValue);

      newValue !== "Today"
        ? getDashboard(
            dayjs()
              .subtract(+newValue.split(" ")[1], "days")
              .format("YYYY-MM-DD"),
            dayjs().format("YYYY-MM-DD")
          )
        : getDashboard("", "");
    }, 150); // Delay to match fade out
  };

  useEffect(() => {
    setIsLoading(true);
    getDashboard();
  }, []);

  const getDashboard = async (startDate: string = "", endDate: string = "") => {
    try {
      const Response = await fetcher.get(
        END_POINTS.DASHBOARD.GET(startDate, endDate)
      );
      const {
        succesfullApiCount,
        activeServiceCount,
        totalCharge,
        totalCommission,
      } = Response.data;
      setCardData([
        { label: "API Calls", value: succesfullApiCount },
        { label: "Services", value: activeServiceCount },
        { label: "Total Charges", value: totalCharge },
        { label: "Total Commission", value: totalCommission },
      ]);
      setPieChartData([totalCommission, totalCharge]);
      setBarChartData(
        Object.entries(Response.data?.serviceWiseCount).map((item) => ({
          name: item[0] as string,
          value: item[1] as number,
        }))
      );
      setLineChartData(Object.values(Response.data?.monthlyApiCount));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      sx={{
        p: { xs: 1.5, md: 3 },
        height: isDesktop ? window.innerHeight - 120 : "fit-content",
        overflow: "auto",
      }}
    >
      {" "}
      <Stack
        flexDirection={{ md: "row" }}
        justifyContent={"space-between"}
        alignContent={"center"}
        gap={2}
      >
        <Typography fontSize={28} fontWeight={600}>
          API Usage Analytics
        </Typography>

        <Box
          sx={{
            display: "inline-flex",
          }}
        >
          {tabOptions.map((label) => (
            <Button
              key={label}
              onClick={() => handleTabClick(label)}
              disableRipple
              variant="text" // 👈 important
              sx={{
                px: { md: 3 },
                py: 1,
                borderRadius: 0,
                textTransform: "none",
                fontWeight: 500,
                fontSize: 12,
                color: tabValue === label ? "#fff" : "#555", // ✅ now works
                backgroundColor: tabValue === label ? "#4caf50" : "transparent",
                transition: "all 0.3s ease",
                borderCollapse: "collapse",
                border: `1px solid ${theme.palette.grey[400]}`,
                "&:first-of-type": {
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                },
                "&:last-of-type": {
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                },
                "&:hover": {
                  backgroundColor: tabValue === label ? "#4caf50" : "#f5f5f5",
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Stack>
      {!isLoading && (
        <>
          <Grid2 container spacing={{ xs: 1.5, md: 3 }} sx={{ mt: 2 }}>
            {cardData.map((item) => (
              <Grid2 size={{ xs: 6, md: 3 }}>
                <Box
                  sx={{
                    p: 1.5,
                    border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <Typography fontSize={16}>{item.label}</Typography>
                  <Typography fontSize={28} fontWeight={600}>
                    <CountUp
                      start={0}
                      end={+item.value}
                      decimals={
                        ["Total Charges", "Total Commission"].includes(
                          item.label
                        )
                          ? 2
                          : 0
                      }
                      prefix={
                        ["Total Charges", "Total Commission"].includes(
                          item.label
                        )
                          ? "₹"
                          : ""
                      }
                    />
                  </Typography>
                </Box>
              </Grid2>
            ))}
          </Grid2>
          <Grid2 container spacing={3} sx={{ mt: 2 }}>
            <Grid2
              size={{ xs: 12, md: 6 }}
              sx={{
                border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                borderRadius: 2,
                p: 1,
              }}
            >
              <LineChart data={lineChartData} />
            </Grid2>
            <Grid2
              size={{ xs: 12, md: 6 }}
              sx={{
                border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                borderRadius: 2,
                p: 1,
              }}
            >
              <PeiChart data={pieChartData} />
            </Grid2>
            <Grid2
              size={12}
              sx={{
                border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                borderRadius: 2,
                p: 1,
              }}
            >
              <BarChart data={barChartData} />
            </Grid2>
          </Grid2>
        </>
      )}
    </Card>
  );
}

export default Analytics;
