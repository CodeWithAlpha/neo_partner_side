import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  Link,
  MenuItem,
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
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import fetcher from "../../api/fetcher";
import { END_POINTS } from "../../api/EndPoints";
import { fDate, fDateTime, fTimeIST, fTimestamp } from "../../utils/formatTime";
import { whitespace } from "stylis";
import { sentenceCase } from "change-case";
import CustomPagination from "../../components/CustomComponents/CustomPagination";
import { showToast } from "../../utils/Toast";
import { fIndianCurrency } from "../../utils/formatNumber";

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
import Iconify from "../../components/iconify";
import { modalStyle } from "../../utils/cssStyles";
import { Close } from "@mui/icons-material";
import { flatObject } from "../../utils/common";
import Scrollbar from "../../components/scrollbar";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { useSnackbar } from "notistack";
import useResponsive from "../../hooks/useResponsive";
import NoDataFound from "../../components/no-data/NoDataFound";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

type tableApiTxndata = {
  _id: string;
  neoTxnId: string;
  vendor: string;
  partner: string;
  amountType: string;
  amount: 10;
  status: string;
  partnerRemarks: string;
  serviceType: string;
  serviceData: {
    _id: string;
    name: string;
    slabType: string;
    description: string;
    categoryId: {
      categoryName: string;
    };
  };
  totalCharge: number;
  totalCommission: number;
  clientTxnId: string;
  uniqueWalletId: string;
  walletLedgers: string[];
  requestFileUrl: null | string;
  vendorResponseFileUrl: null | string;
  responseFileUrl: null | string;
  createdAt: string;
  __v: 0;
};

type tableWalletLadgerdata = {
  _id: string;
  wallet: string;
  partner: string;
  amountType: string;
  amount: number;
  openingBalance: number;
  closingBalance: number;
  remarks: string;
  description: string;
  transaction: {
    neoTxnId: string;
  };
  createdAt: string;
  uniqueID: string;
  __v: 0;
};

type FormValuesProps = {
  startDate: Date | string | null;
  endDate: Date | string | null;
  neoTxnId: string;
  clientTxnId: string;
  status: string;
  search: string;
};

export default function ApiTransaction() {
  const { copy } = useCopyToClipboard();
  const isDesktop = useResponsive("up", "md");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 25,
  });

  const [activeTab, setActiveTab] = useState("1");
  const [table, setTable] = useState<{
    data: tableApiTxndata[] | tableWalletLadgerdata[];
    total: number;
    isLoading: boolean;
  }>({
    data: [],
    total: 0,
    isLoading: false,
  });

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const LoginSchema = Yup.object().shape({});

  const defaultValues = {
    startDate: "",
    endDate: "",
    neoTxnId: "",
    clientTxnId: "",
    status: "",
    search: "",
  };

  const methods = useForm<FormValuesProps | any>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    setTable({ ...table, data: [], isLoading: true });
    activeTab == "1"
      ? getTransactions(
          pagination.currentPage,
          pagination.itemsPerPage,
          getValues("neoTxnId")
        )
      : getWalletTxns(
          pagination.currentPage,
          pagination.itemsPerPage,
          getValues("search")
        );
  }, [pagination.currentPage, pagination.itemsPerPage, activeTab]);

  const getTransactions = async (
    page: number,
    itemsPerPage: number,
    neoTxnId: string = "",
    startDate: string = "",
    endDate: string = "",
    startTime: string = "",
    endTime: string = "",
    clientTxnId: string = "",
    status: string = ""
  ) => {
    try {
      const Response = await fetcher.get(
        END_POINTS.Transactions.GET_API_TRANSACTION(
          page,
          itemsPerPage,
          neoTxnId,
          startDate,
          endDate,
          startTime,
          endTime,
          clientTxnId,
          status
        )
      );
      setTable((prevState) => ({
        ...prevState,
        data: Response.data.data,
        total: Response.data.metaData.total,
        isLoading: false,
      }));
    } catch (error) {
    } finally {
      setTable((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
      handleClose();
    }
  };
  const getWalletTxns = async (
    page: number,
    itemsPerPage: number,
    search: string = "",
    startDate: string = "",
    endDate: string = "",
    startTime: string = "",
    endTime: string = ""
  ) => {
    try {
      const Response = await fetcher.get(
        END_POINTS.Transactions.GET_WALLET_LADGER_TRANSACTIONS(
          page,
          itemsPerPage,
          search,
          startDate,
          endDate,
          startTime,
          endTime
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
      handleClose();
    }
  };

  const onSubmit = (data: FormValuesProps) => {
    setTable({
      data: [],
      total: 0,
      isLoading: true,
    });

    const startDate = data.startDate
      ? dayjs(data.startDate).format("DD-MM-YYYY")
      : "";
    const endDate = data.endDate
      ? dayjs(data.endDate).format("DD-MM-YYYY")
      : "";
    const startTime = data.startDate
      ? dayjs(data.startDate).format("HH:mm")
      : "";
    const endTime = data.endDate ? dayjs(data.endDate).format("HH:mm") : "";
    if (activeTab == "1")
      getTransactions(
        pagination.currentPage,
        pagination.itemsPerPage,
        data.neoTxnId,
        startDate,
        endDate,
        startTime,
        endTime,
        data.clientTxnId
      );
    else
      getWalletTxns(
        pagination.currentPage,
        pagination.itemsPerPage,
        data.search,
        startDate,
        endDate,
        startTime,
        endTime
      );
  };

  const startDate = watch("startDate") ? dayjs(watch("startDate")) : null;
  const maxSelectableDate = startDate ? dayjs(startDate).add(30, "day") : null;
  const today = dayjs();

  const maxDate =
    maxSelectableDate && maxSelectableDate.isBefore(today)
      ? maxSelectableDate
      : today;

  const handleCopy = useCallback((value: string) => {
    copy(value);
    showToast.success(`copied: ${value}`);
  }, []);

  const handleWalletSearch = (walletId: string) => {
    setValue("search", walletId);
    setActiveTab("2");
  };

  const handleTransactionSearch = (walletId: string) => {
    setValue("neoTxnId", walletId);
    setActiveTab("1");
  };

  return (
    <Box sx={{ bgcolor: "background.neutral", borderRadius: 2, px: 2, py: 1 }}>
      <Stack
        flexDirection={{ md: "row" }}
        justifyContent={"space-between"}
        gap={1}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newVal) => {
            reset();
            setPagination({ ...pagination, currentPage: 1 });
            setActiveTab(newVal);
          }}
          aria-label="lab API tabs example"
          scrollButtons={isDesktop ? "auto" : false}
        >
          <Tab value="1" label="API Transactions" />
          <Tab value="2" label="Wallet Ledger" />
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...modalStyle, width: 400 }}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
                    value={
                      watch("startDate") ? dayjs(watch("startDate")) : null
                    }
                    maxDate={dayjs(new Date())}
                    onChange={(newValue: any) =>
                      setValue(
                        "startDate",
                        new Date(newValue).toLocaleString() + ""
                      )
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
                    value={watch("endDate") ? dayjs(watch("endDate")) : null}
                    minDate={dayjs(watch("startDate"))}
                    maxDate={watch("startDate") ? maxDate : today}
                    disabled={!watch("startDate")}
                    onChange={(newValue: any) => setValue("endDate", newValue)}
                    slotProps={{
                      textField: {
                        size: "small",
                      },
                    }}
                  />
                </LocalizationProvider>

                {activeTab == "1" ? (
                  <>
                    {" "}
                    <RHFTextField name="neoTxnId" label="Neo Txn Id" />
                    <RHFTextField name="clientTxnId" label="Client Txn Id" />
                    <RHFSelect name="status" label="Status">
                      {["success", "pending", "failed"].map((item) => (
                        <MenuItem value={item}>{sentenceCase(item)}</MenuItem>
                      ))}
                    </RHFSelect>
                  </>
                ) : (
                  <RHFTextField
                    name="search"
                    label="Neo Txn Id / Wallet Ladger Id"
                  />
                )}
                <Stack flexDirection={"row"} gap={1}>
                  <Button
                    variant="contained"
                    type="submit"
                    loading={isSubmitting}
                    disabled={
                      !!Object.values(watch()).every((item) => item == "")
                    }
                    fullWidth
                  >
                    Search
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      activeTab == "1"
                        ? getTransactions(1, pagination.itemsPerPage)
                        : getWalletTxns(
                            pagination.currentPage,
                            pagination.itemsPerPage
                          );
                      reset();
                      handleClose();
                    }}
                    disabled={
                      !!Object.values(watch()).every((item) => item == "")
                    }
                  >
                    Clear
                  </Button>
                </Stack>
              </Stack>
            </FormProvider>
          </Box>
        </Modal>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{ mt: 0.5, height: window.innerHeight - 330 }}
      >
        {!table.isLoading && (
          <>
            {activeTab == "1" ? (
              <ApiTxns
                data={table.data as tableApiTxndata[]}
                handleCopy={handleCopy}
                handleWalletSearch={handleWalletSearch}
              />
            ) : (
              <WalletTxns
                data={table.data as tableWalletLadgerdata[]}
                handleCopy={handleCopy}
                handleTransactionSearch={handleTransactionSearch}
              />
            )}
          </>
        )}
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
    </Box>
  );
}

const ApiTxns = ({
  data,
  handleCopy,
  handleWalletSearch,
}: {
  data: tableApiTxndata[];
  handleCopy: (value: string) => void;
  handleWalletSearch: (walletId: string) => void;
}) => {
  const [tableView, setTableView] = useState<any>(null);

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTableView(null);
  };

  const getSignedUrl = async (url: string | null) => {
    if (!url) {
      showToast.error("Url missing. please try after some time.");
      return;
    }
    try {
      const body = {
        s3Url: url,
      };
      const Response = await fetcher.post(
        END_POINTS.COMMON.get_SIGNED_CONTENT,
        body
      );

      setTableView(Response.data);
      handleOpen();
    } catch (error) {}
  };

  return (
    <>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            {[
              { id: 0, label: "Date & Time" },
              { id: 1, label: "Neo Txn ID" },
              { id: 2, label: "Client Txn ID" },
              { id: 3, label: "Service" },
              { id: 9, label: "Operator Detail", align: "center" },
              { id: 4, label: "Status" },
              { id: 5, label: "Txn Type" },
              { id: 6, label: "Charge/Comm." },
              { id: 6, label: "Amount" },
              { id: 7, label: "Partner Req." },
              { id: 8, label: "Neo Response" },
            ].map((item) => (
              <TableCell key={item.id}>
                <Typography noWrap>{item.label}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover
            >
              <TableCell>
                <Typography noWrap variant="body2">
                  {row.createdAt}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {row.createdAt && row.createdAt}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography noWrap variant="body2">
                  {row.neoTxnId}{" "}
                  <IconButton
                    onClick={() => handleCopy(row.neoTxnId)}
                    size="small"
                  >
                    <Iconify
                      icon="nimbus:copy"
                      width="18px"
                      height="18px"
                      color={"primary.main"}
                    />
                  </IconButton>
                </Typography>
                {row?.walletLedgers?.map((item) => (
                  <Link
                    variant="overline"
                    display={"block"}
                    onClick={() => handleWalletSearch(item)}
                    sx={{ cursor: "pointer" }}
                  >
                    {item}{" "}
                  </Link>
                ))}
              </TableCell>
              <TableCell>
                {row.clientTxnId && (
                  <Typography noWrap variant="body2">
                    {row.clientTxnId}{" "}
                    <IconButton onClick={() => handleCopy(row.clientTxnId)}>
                      <Iconify
                        icon="nimbus:copy"
                        width="18px"
                        height="18px"
                        color={"primary.main"}
                      />
                    </IconButton>
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Typography noWrap variant="body2">
                  {row.serviceData?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {row.serviceData?.categoryId?.categoryName}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Link sx={{ cursor: "pointer" }} noWrap>
                  [View]
                </Link>
              </TableCell>
              <TableCell>
                {" "}
                <Chip
                  label={sentenceCase(row.status || "")}
                  color={
                    row.status == "success"
                      ? "primary"
                      : row.status == "pending"
                      ? "warning"
                      : "error"
                  }
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
              </TableCell>
              <TableCell>
                <Typography textAlign={"center"} variant="body2">
                  {sentenceCase(row.serviceData?.slabType || "")}
                </Typography>
              </TableCell>
              <TableCell>
                <Stack flexDirection={"row"} alignItems={"center"} gap={0.5}>
                  <Typography variant="body2" noWrap color="error.main">
                    {fIndianCurrency(row.totalCharge)}
                  </Typography>
                  /
                  <Typography variant="body2" noWrap color="success.main">
                    {fIndianCurrency(row.totalCommission)}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  noWrap
                  color={
                    row.amountType == "credit" ? "success.main" : "error.main"
                  }
                >
                  {fIndianCurrency(
                    Number((row.amountType == "credit" ? "" : "-") + row.amount)
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                <Link
                  sx={{ cursor: "pointer" }}
                  noWrap
                  onClick={() => {
                    localStorage.setItem("viewType", "Request");
                    getSignedUrl(row.requestFileUrl);
                  }}
                >
                  [View Request]
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  sx={{ cursor: "pointer" }}
                  noWrap
                  onClick={() => {
                    localStorage.setItem("viewType", "Response");
                    getSignedUrl(row.vendorResponseFileUrl);
                  }}
                >
                  [View Response]
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <NoDataFound isDataFound={!!data.length} />
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle, width: { xs: "95%", md: 700 }, pt: 1 }}>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mx={1}
          >
            <Typography variant="h4" textAlign={"center"}>
              {localStorage.getItem("viewType")}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>
          <Box sx={{ maxHeight: 500, overflowY: "scroll", pr: 1 }}>
            <SyntaxHighlighter language="json" style={dracula}>
              {JSON.stringify(tableView, null, 2)}
            </SyntaxHighlighter>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const WalletTxns = ({
  data,
  handleCopy,
  handleTransactionSearch,
}: {
  data: tableWalletLadgerdata[];
  handleCopy: (value: string) => void;
  handleTransactionSearch: (neoTxnId: string) => void;
}) => {
  return (
    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
      <TableHead>
        <TableRow>
          {[
            { id: 0, label: "Date & Time" },
            { id: 1, label: "Wallet ID" },
            { id: 2, label: "Opening Balance" },
            { id: 3, label: "Amount", align: "center" },
            { id: 4, label: "Closing Balance" },
            { id: 5, label: "Remarks" },
          ].map((item) => (
            <TableCell key={item.id}>
              <Typography noWrap>{item.label}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            hover
          >
            <TableCell>
              <Typography noWrap variant="body2">
                {row.createdAt}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {row.createdAt && row.createdAt}
              </Typography>
            </TableCell>
            <TableCell>
              {" "}
              <Typography variant="body2" noWrap>
                {row.uniqueID}{" "}
                <IconButton
                  onClick={() => handleCopy(row.uniqueID)}
                  size="small"
                >
                  <Iconify
                    icon="nimbus:copy"
                    width="18px"
                    height="18px"
                    color={"primary.main"}
                  />
                </IconButton>
              </Typography>{" "}
              <Link
                variant="overline"
                display={"block"}
                noWrap
                onClick={() =>
                  handleTransactionSearch(row.transaction.neoTxnId)
                }
                sx={{ cursor: "pointer" }}
              >
                {row.transaction?.neoTxnId}{" "}
              </Link>
            </TableCell>
            <TableCell>{fIndianCurrency(row.openingBalance)}</TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color={row.amount < 0 ? "error.main" : "success.main"}
              >
                {fIndianCurrency(row.amount)}
              </Typography>
            </TableCell>
            <TableCell>{fIndianCurrency(row.closingBalance)}</TableCell>
            <TableCell
              sx={{ minWidth: 300, maxWidth: 300, wordBreak: "break-word" }}
            >
              {row.remarks}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <NoDataFound isDataFound={!!data.length} />
    </Table>
  );
};
