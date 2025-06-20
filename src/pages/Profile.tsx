import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuthContext } from "../auth/useAuthContext";
import { CustomAvatar } from "../components/custom-avatar";
import { fDate } from "../utils/formatTime";
import { fIndianCurrency } from "../utils/formatNumber";

function Profile() {
  const { user } = useAuthContext();

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2, borderRadius: 3 }}>
      {/* Header */}
      <Stack direction="row" spacing={2} alignItems="center">
        <CustomAvatar src={""} name={user?.firstName} />
        <Box>
          <Typography variant="h6" fontWeight={600} color="green">
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
          <Typography>
            <strong>Company:</strong> {user?.companyName}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user?.companyEmail}
          </Typography>
          <Typography>
            <strong>Contact:</strong> {user?.companyContact}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* Company & API Details */}
      <Grid container spacing={2}>
        {/* Company Details */}
        <Grid item xs={12} md={6}>
          <Box bgcolor="#f8fef9" p={2} borderRadius={2}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Company Details
            </Typography>
            <Typography>
              <strong>Company:</strong> {user?.companyEmail}
            </Typography>
            <Typography>
              <strong>GST No.:</strong>{" "}
              <span style={{ color: "#1aaf5d" }}>{user?.gstNumber}</span>
            </Typography>
            <Typography>
              <strong>Neo Partner ID:</strong>{" "}
              <span style={{ color: "#1aaf5d" }}>{user?.neoPartnerId}</span>
            </Typography>
            {/* <Typography>
              <strong>Partner ID:</strong>{" "}
              <span style={{ color: "#1aaf5d" }}>6823434026202f313d49ff52</span>
            </Typography> */}
            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              <Chip
                label="Document Uploaded"
                size="small"
                color={user?.isDocumentUplaoded ? "success" : "error"}
              />
              <Chip
                label="Admin Approved"
                size="small"
                color={user?.isAdminApproved ? "success" : "error"}
              />
              <Chip
                label="Enabled"
                size="small"
                color={user?.isEnabled ? "success" : "error"}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Created At: {fDate(user?.createdAt)}
              <br />
              Last Updated: {fDate(user?.updatedAt)}
            </Typography>
          </Box>
        </Grid>

        {/* API Credentials */}
        <Grid item xs={12} md={6}>
          <Box bgcolor="#f8fef9" p={2} borderRadius={2}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              API Credentials
            </Typography>
            <Typography sx={{ wordBreak: "break-all" }}>
              <strong>API Key:</strong>{" "}
              <span style={{ color: "#1aaf5d" }}>{user?.apiKey}</span>
            </Typography>
            <Typography>
              <strong>Whitelisted IPs:</strong>{" "}
              {user?.apiCredentials?.whitelistedIps.map((item: string) => (
                <Chip label={item} color="success" size="small" />
              ))}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Wallet Details */}
      <Box bgcolor="#f8fef9" p={2} borderRadius={2}>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Wallet Details
        </Typography>
        <Typography>
          <strong>Wallet ID:</strong>{" "}
          <span style={{ color: "#1aaf5d" }}>
            {user?.wallet?.uniqueWalletId}
          </span>
        </Typography>
        <Typography>
          <strong>Current Balance:</strong> ₹
          {fIndianCurrency(user?.wallet?.bal?.$numberDecimal)}
        </Typography>
        <Typography>
          <strong>Locked Balance:</strong>₹
          {fIndianCurrency(user?.wallet?.lockedBal?.$numberDecimal)}
        </Typography>
        <Typography>
          <strong>Total Debits:</strong> ₹
          {fIndianCurrency(user?.wallet?.totalDebits?.$numberDecimal)}
        </Typography>
        <Typography>
          <strong>Total Credits:</strong> ₹
          {fIndianCurrency(user?.wallet?.totalCredits?.$numberDecimal)}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Wallet Created: {fDate(user?.wallet?.createdAt)}
          <br />
          Last Updated: {fDate(user?.wallet?.updatedAt)}
        </Typography>
      </Box>
    </Paper>
  );
}

export default Profile;
