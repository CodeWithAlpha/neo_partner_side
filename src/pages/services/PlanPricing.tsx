import {
  Box,
  Card,
  Modal,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import fetcher from "../../api/fetcher";
import { END_POINTS } from "../../api/EndPoints";
import { fDate, fDateTime } from "../../utils/formatTime";
import { whitespace } from "stylis";
import { sentenceCase } from "change-case";
import CustomPagination from "../../components/CustomComponents/CustomPagination";
import Iconify from "../../components/iconify";
import { modalStyle } from "../../utils/cssStyles";
import { fIndianCurrency } from "../../utils/formatNumber";
import useResponsive from "../../hooks/useResponsive";
import NoDataFound from "../../components/no-data/NoDataFound";

type tabledata = {
  _id: string;
  partnerId: string;
  reportUrl: string;
  reportDate: string;
  generatedAt: string;
  type: string;
};

function PlanPricing() {
  const isDesktop = useResponsive("up", "md");
  const [activeTab, setActiveTab] = useState("");
  const [planDetail, setPlanDetail] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [slabs, setSlabs] = useState([]);

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSlabs([]);
  };

  useEffect(() => {
    getPlanDetail();
  }, []);

  const getPlanDetail = async () => {
    try {
      const Response = await fetcher.get(END_POINTS.PLAN.GET_PLAN_DETAIL);
      setPlanDetail(Response.data.categories);
      Response.data.categories?.length &&
        setActiveTab(Response.data.categories[0]._id);
    } catch (error) {}
  };

  useEffect(() => {
    activeTab &&
      setServices(
        planDetail.find((item: any) => item._id == activeTab).services
      );
  }, [activeTab]);

  if (!planDetail) return null;

  return (
    <Box sx={{ bgcolor: "background.neutral", borderRadius: 2, p: 1.5, pt: 0 }}>
      <Tabs
        value={activeTab}
        onChange={(e, newVal) => {
          setActiveTab(newVal);
        }}
        aria-label="lab API tabs example"
        sx={{ p: 1 }}
        scrollButtons={isDesktop ? "auto" : false}
      >
        {planDetail?.map((item: any) => (
          <Tab value={item._id} label={item.categoryName} />
        ))}
      </Tabs>
      <TableContainer
        component={Paper}
        sx={{ height: window.innerHeight - 270 }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {[
                { id: 0, label: "Service Name" },
                { id: 1, label: "Charge/Commission" },
                { id: 2, label: "Service Type" },
                { id: 3, label: "Charge" },
                { id: 4, label: "Commission" },
              ].map((item) => (
                <TableCell>
                  <Typography noWrap>{item.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((row: any) => (
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
                <TableCell>{row.slabType}</TableCell>

                <TableCell>{row.serviceType}</TableCell>
                <TableCell>
                  <Typography
                    color="primary.main"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => {
                      setSlabs(row.charge);
                      handleOpen();
                    }}
                  >
                    {row.charge.length +
                      " Slab" +
                      (row.charge.length > 1 ? "s" : "")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="primary.main"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => {
                      setSlabs(row.commission);
                      handleOpen();
                    }}
                  >
                    {row.commission.length +
                      " Slab" +
                      (row.commission.length > 1 ? "s" : "")}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <NoDataFound isDataFound={!!services} />
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {[
                    { id: 0, label: "Min Slab" },
                    { id: 1, label: "Max Slab" },
                    { id: 2, label: "Type" },
                    { id: 3, label: "value" },
                  ].map((item) => (
                    <TableCell>
                      <Typography noWrap>{item.label}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {slabs.map((row: any) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                  >
                    <TableCell>
                      <Typography noWrap variant="body2">
                        {row.minAmount}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.maxAmount}</TableCell>
                    <TableCell>{sentenceCase(row.type)}</TableCell>
                    <TableCell>
                      {row.type == "flat"
                        ? "Rs. " + row.value
                        : row.value + "%"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </Box>
  );
}

export default PlanPricing;
