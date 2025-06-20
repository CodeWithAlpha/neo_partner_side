import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Grid2,
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
import useResponsive from "../../hooks/useResponsive";
import Iconify from "../../components/iconify";
import { fIndianCurrency } from "../../utils/formatNumber";
import WalletCards from "./WalletCards";
import { useEffect, useState } from "react";
import fetcher from "../../api/fetcher";
import { END_POINTS } from "../../api/EndPoints";
import CustomPagination from "../../components/CustomComponents/CustomPagination";
import { fDate, fTimeIST } from "../../utils/formatTime";
import { modalStyle } from "../../utils/cssStyles";
import ClaimDeposit from "./ClaimDeposit";
import { sentenceCase } from "change-case";
import NoDataFound from "../../components/no-data/NoDataFound";
import { useAuthContext } from "../../auth/useAuthContext";
import dayjs from "dayjs";

type fundRequestTypes = {
  _id: string;
  adminBankAccountId: {
    accountNumber: string;
    bankId: { bankName: string };
  };
  amount: number;
  commission: {
    mode: string;
    type: string;
    value: number;
    _id: string;
  };
  depositDate: string;
  depositorMobile: string;
  depositorBranch: string;
  UTR: string;
  remarks: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  requestFromPartner: string;
};

const walletData = [
  {
    icon: (
      <Iconify
        icon="fa-solid:coins"
        width="35px"
        height="35px"
        sx={{ color: "primary.main" }}
      />
    ),
    label: "Current Balance",
    value: "121120",
  },
  {
    icon: (
      <Iconify
        icon="hugeicons:task-daily-02"
        width="35px"
        height="35px"
        sx={{ color: "primary.main" }}
      />
    ),
    label: "Avg. daily consumption",
    value: "121120",
  },
  {
    icon: (
      <Iconify
        icon="formkit:week"
        width="35px"
        height="35px"
        sx={{ color: "primary.main" }}
      />
    ),
    label: "Last week deposit",
    value: "121120",
  },
  {
    icon: (
      <Iconify
        icon="game-icons:drop"
        width="35px"
        height="35px"
        sx={{ color: "primary.main" }}
      />
    ),
    label: "Daily in penny drop",
    value: "121120",
  },
];

export default function Wallet() {
  const { user } = useAuthContext();
  const isDesktop = useResponsive("up", "md");
  const [activeTab, setActiveTab] = useState("1");
  const [activeSubTab, setActiveSubTab] = useState<
    "all" | "pending" | "approved" | "reject"
  >("all");

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 25,
  });

  const [table, setTable] = useState<{
    data: fundRequestTypes[];
    total: number;
    isLoading: boolean;
  }>({
    data: [],
    total: 0,
    isLoading: false,
  });

  useEffect(() => {
    setTable((prevState) => ({ ...prevState, data: [], isLoading: true }));
    getRequests(pagination.currentPage, pagination.itemsPerPage, activeSubTab);
  }, [pagination.currentPage, pagination.itemsPerPage, activeSubTab]);

  const getRequests = async (
    page: number,
    limit: number,
    status: "all" | "pending" | "approved" | "reject"
  ) => {
    try {
      const Response = await fetcher.get(
        END_POINTS.FUND_REQUESTS.GET_REQUESTS(page, limit, status)
      );
      setTable((prevState) => ({
        ...prevState,
        total: Response.data.metaData.total,
        data: Response.data.data,
      }));
    } catch (error) {
    } finally {
      setTable((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  return (
    <Card
      sx={{
        m: { xs: 1, md: 3 },
        p: { xs: 2 },
        height: isDesktop ? window.innerHeight - 120 : "fit-content",
        overflow: "auto",
      }}
    >
      <Alert severity="success" sx={{ width: "fit-content", my: 1, py: 0 }}>
        Last Load: Rs.{" "}
        {fIndianCurrency(user?.wallet?.lastLoadedBal?.$numberDecimal)} on{" "}
        {dayjs(user?.wallet?.updatedAt).format("MMM DD, YYYY")}
      </Alert>
      {/* 
      <Tabs
        value={activeTab}
        onChange={(e, newVal) => setActiveTab(newVal)}
        aria-label="lab API tabs example"
      >
        <Tab value="1" label="Manual Fund Load" />
        <Tab value="2" label="Auto Collect with Virtual Account" />
        <Tab value="3" label="Load with Payment Gateway" />
      </Tabs> */}
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={1}
        my={1}
      >
        <Typography variant={isDesktop ? "h3" : "h6"}>
          Fund Request History
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="line-md:plus" width="24" height="24" />}
          sx={{ borderRadius: 5, fontSize: 14, fontWeight: 400 }}
          onClick={handleOpen}
        >
          Claim deposit
        </Button>
      </Stack>
      <Box
        sx={{ bgcolor: "background.neutral", borderRadius: 2, p: 1.5, pt: 0 }}
      >
        <Tabs
          value={activeSubTab}
          onChange={(e, newVal) => setActiveSubTab(newVal)}
          aria-label="lab API tabs example"
          sx={{ mb: 0.5, ml: 1 }}
          scrollButtons={isDesktop ? "auto" : false}
        >
          <Tab value="all" label="All" />
          <Tab value="pending" label="Pending" />
          <Tab value="approved" label="Approved" />
          <Tab value="reject" label="Rejected" />
        </Tabs>

        {/* table */}
        <TableContainer
          component={Paper}
          sx={{ height: window.innerHeight - (isDesktop ? 380 : 350) }}
        >
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                {[
                  { id: 0, label: "Request Date" },
                  { id: 1, label: "Deposit Details" },
                  { id: 2, label: "Action Date" },
                  { id: 3, label: "Bank Details" },
                  { id: 5, label: "Amount" },
                  { id: 6, label: "Remarks" },
                  { id: 7, label: "Status" },
                ].map((item) => (
                  <TableCell>
                    <Typography noWrap>{item.label}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {table.data.map((row: fundRequestTypes) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover
                >
                  <TableCell>
                    <Typography noWrap variant="body2">
                      {fDate(row.createdAt)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {fTimeIST(row.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>{fDate(row.depositDate)}</TableCell>
                  <TableCell>
                    <Typography noWrap variant="body2">
                      {fDate(row.updatedAt)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {fTimeIST(row.updatedAt)}
                    </Typography>{" "}
                  </TableCell>
                  <TableCell>
                    <Typography noWrap variant="body2">
                      {" "}
                      {row.adminBankAccountId.bankId.bankName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {row.adminBankAccountId.accountNumber}
                    </Typography>{" "}
                  </TableCell>
                  <TableCell>{fIndianCurrency(row.amount)}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>{row.remarks}</TableCell>
                  <TableCell>
                    {" "}
                    <Chip
                      label={sentenceCase(row.status || "")}
                      color={
                        row.status == "approved"
                          ? "primary"
                          : row.status == "reject"
                          ? "error"
                          : "warning"
                      }
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <NoDataFound isDataFound={!!table.data.length} />
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle, maxWidth: 500 }}>
          <ClaimDeposit
            close={() => {
              handleClose();
              getRequests(1, pagination.itemsPerPage, activeSubTab);
            }}
          />
        </Box>
      </Modal>
    </Card>
  );
}
