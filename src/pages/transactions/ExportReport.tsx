import {
  Box,
  Button,
  Card,
  IconButton,
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
import { fDate, fDateTime, fTimeIST } from "../../utils/formatTime";
import { whitespace } from "stylis";
import { sentenceCase } from "change-case";
import CustomPagination from "../../components/CustomComponents/CustomPagination";
import Iconify from "../../components/iconify";
import useResponsive from "../../hooks/useResponsive";
import NoDataFound from "../../components/no-data/NoDataFound";

// form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
} from "../../components/hook-form";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { modalStyle } from "../../utils/cssStyles";
import { Close } from "@mui/icons-material";

type tabledata = {
  _id: string;
  partnerId: string;
  reportUrl: string;
  reportDate: string;
  generatedAt: string;
  type: string;
};

function ExportReport() {
  const isDesktop = useResponsive("up", "md");
  const [formValue, setFormValue] = useState({
    startDate: "",
    endDate: "",
    isLoading: false,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 25,
  });
  const [activeTab, setActiveTab] = useState("1");
  const [table, setTable] = useState<{
    data: tabledata[];
    total: number;
    isLoading: boolean;
  }>({
    data: [],
    total: 0,
    isLoading: true,
  });

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    activeTab &&
      getTransactions(
        pagination.currentPage,
        pagination.itemsPerPage,
        activeTab == "1"
          ? "transaction"
          : activeTab == "2"
          ? "wallet_ledger"
          : "operator_details"
      );
  }, [pagination.currentPage, pagination.itemsPerPage, activeTab]);

  const getTransactions = async (
    page: number,
    itemsPerPage: number,
    type: "transaction" | "wallet_ledger" | "operator_details"
  ) => {
    try {
      setTable((prevState) => ({
        ...prevState,
        data: [],
        isLoading: true,
      }));
      console.log(dayjs(formValue.startDate).format("DD-MM-YYYY"));
      const Response = await fetcher.get(
        END_POINTS.Transactions.GET_API_TRANSACTION_REPORT(
          page,
          itemsPerPage,
          type,
          formValue.startDate
            ? dayjs(formValue.startDate).format("DD-MM-YYYY")
            : "",
          formValue.endDate
            ? dayjs(formValue.endDate).format("DD-MM-YYYY")
            : "",
          formValue.startDate ? dayjs(formValue.startDate).format("HH:mm") : "",
          formValue.endDate ? dayjs(formValue.endDate).format("HH:mm") : ""
        )
      );
      setTable((prevState) => ({
        ...prevState,
        data: Response.data.data,
        total: Response.data.metaData.total,
      }));
    } catch (error) {
    } finally {
      setTable((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const getSignedUrl = async (url: string) => {
    try {
      const body = {
        s3Url: url,
      };
      const Response = await fetcher.post(
        END_POINTS.COMMON.GET_SIGNED_URL,
        body
      );
      window.open(Response.data.signedUrl);
    } catch (error) {}
  };

  const startDate = formValue.startDate ? dayjs(formValue.startDate) : null;
  const maxSelectableDate = startDate ? dayjs(startDate).add(30, "day") : null;
  const today = dayjs();

  const maxDate =
    maxSelectableDate && maxSelectableDate.isBefore(today)
      ? maxSelectableDate
      : today;

  return (
    <Box sx={{ bgcolor: "background.neutral", borderRadius: 2, p: 2, pt: 0 }}>
      <Stack
        flexDirection={{ md: "row" }}
        justifyContent={"space-between"}
        gap={1}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newVal) => {
            setActiveTab(newVal);
            setPagination({ ...pagination, currentPage: 1 });
          }}
          aria-label="lab API tabs example"
          scrollButtons={isDesktop ? "auto" : false}
        >
          <Tab value="1" label="API Transactions Report" />
          <Tab value="2" label="Wallet Ledger Report" />
          <Tab value="3" label="Operator Detail Report" />
        </Tabs>

        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
          sx={{ cursor: "pointer" }}
          onClick={handleOpen}
        >
          <Iconify
            icon="iconamoon:search"
            width="24"
            height="24"
            sx={{ color: "primary.main" }}
          />
          <Typography color="primary.main" mr={1}>
            Search and Filter
          </Typography>
        </Stack>
      </Stack>
      <Typography color="text.secondary">
        Search any date range within 5 years and download your daily report
      </Typography>
      <Typography color="text.secondary">
        <span style={{ fontWeight: 700 }}>Limitations:</span> Everyday report
        will be generated and will auto reflect here to download in excel format
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ mt: 1, height: window.innerHeight - (isDesktop ? 380 : 420) }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {[
                { id: 0, label: "Date & Time" },
                { id: 1, label: "Generated at" },
                { id: 2, label: "GeneratedBy" },
                { id: 3, label: "Download Link" },
              ].map((item) => (
                <TableCell>
                  <Typography noWrap>{item.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!table.isLoading && (
            <TableBody>
              {table.data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover
                >
                  <TableCell>
                    <Typography noWrap variant="body2">
                      {row.reportDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography noWrap variant="body2">
                      {row.generatedAt}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {row.generatedAt && row.generatedAt}
                    </Typography>
                  </TableCell>

                  <TableCell>System (Auto Generated)</TableCell>
                  <TableCell>
                    <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
                      <Iconify
                        icon="line-md:download-loop"
                        width="20px"
                        height="20px"
                        color={"error.main"}
                      />
                      <Typography
                        color="error.main"
                        sx={{ cursor: "pointer" }}
                        onClick={() => getSignedUrl(row.reportUrl)}
                      >
                        download.xls
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {!table.isLoading && <NoDataFound isDataFound={!!table.data.length} />}
      </TableContainer>

      <CustomPagination
        totalItems={table.total}
        currentPage={pagination.currentPage}
        onPageChange={function (page: number): void {
          setPagination({ ...pagination, currentPage: page });
        }}
        itemsPerPage={pagination.itemsPerPage}
        onItemsPerPageChange={function (itemsPerPage: number): void {
          setPagination({ ...pagination, itemsPerPage });
        }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5">
              {activeTab == "1" ? "Api Transactions" : "Wallet Ladger"}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>
          <Stack gap={2} mt={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start date"
                format="DD-MM-YYYY HH:mm"
                value={formValue.startDate ? dayjs(formValue.startDate) : null}
                maxDate={dayjs(new Date())}
                onChange={(newValue: any) =>
                  setFormValue((prevState) => ({
                    ...prevState,
                    startDate: dayjs(newValue).format(""),
                  }))
                }
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End date"
                format="DD-MM-YYYY HH:mm"
                value={formValue.endDate ? dayjs(formValue.endDate) : null}
                minDate={dayjs(formValue.startDate)}
                maxDate={formValue.startDate ? maxDate : today}
                disabled={!formValue.startDate}
                onChange={(newValue: any) =>
                  setFormValue((prevState) => ({
                    ...prevState,
                    endDate: dayjs(newValue).format(""),
                  }))
                }
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
              />
            </LocalizationProvider>

            <Stack flexDirection={"row"} gap={1}>
              <Button
                variant="contained"
                type="submit"
                disabled={!(formValue.startDate && formValue.endDate)}
                fullWidth
              >
                Search
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  handleClose();
                }}
                disabled={!(formValue.startDate && formValue.endDate)}
              >
                Clear
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

export default ExportReport;
