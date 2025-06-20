import {
  Button,
  Card,
  Grid2,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuthContext } from "../auth/useAuthContext";
import NoDataFound from "../components/no-data/NoDataFound";

function ApiDocs() {
  const { user } = useAuthContext();

  return (
    <Grid2 container spacing={2} m={2}>
      <Grid2 size={6}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h3" color="primary.main">
            Welcome to NeoAPIBox API Docs
          </Typography>
          <Stack gap={2}>
            <Typography>
              1. <b>Get your Api Key: </b> Log in to your Partner Portal and
              generate or copy your API key from the <b>API Keys</b> section.{" "}
            </Typography>
            <Typography>
              2. <b>Whitelist Your IP:</b> Add your server IP(s) for secure API
              access in the portal.
            </Typography>
            <Typography>
              3. <b>Load Funds:</b> Ensure your wallet has sufficient balance to
              use paid APIs.
            </Typography>
            <Typography>
              4. <b>Generate Access Token:</b> Use your API Key to authenticate
              and generate an access token for making API calls.
            </Typography>
            <Typography>
              5. <b>Explore API Docs:</b> See below for the full list of
              available API services and direct links to their documentation.
            </Typography>
            <Button
              variant="contained"
              onClick={() =>
                window.open("https://docs.neoapibox.com/", "_blank")
              }
              sx={{ width: "fit-content" }}
            >
              Know more
            </Button>
          </Stack>
        </Card>
      </Grid2>
      <Grid2 size={6}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h3" color="primary.main">
            Active API Services
          </Typography>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  {[
                    { id: 0, label: "Service Name" },
                    { id: 1, label: "Api Version" },
                    { id: 2, label: "Documentaion" },
                  ].map((item) => (
                    <TableCell>
                      <Typography noWrap>{item.label}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {user?.allowedServices.map((row: any) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                  >
                    <TableCell>
                      <Typography noWrap variant="body2">
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell>v1</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() =>
                          window.open(row.documentationUrl, "_blank")
                        }
                      >
                        View API Docs
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <NoDataFound isDataFound={!!user?.allowedServices} />
          </TableContainer>
        </Card>
      </Grid2>
    </Grid2>
  );
}

export default ApiDocs;
