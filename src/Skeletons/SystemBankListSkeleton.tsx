import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const SystemBankListSkeleton = () => {
  return (
    <TableContainer>
      <Paper sx={{ width: "100%" }}>
        <Table
          sx={{ minWidth: 720, overflow: "hidden" }}
          aria-label="animated table"
        >
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 200 }}>Bank Name</TableCell>
              <TableCell>Master IFSC</TableCell>
              <TableCell>Short Code</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {[...Array(4)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton variant="text" width={150} height={20} />
                  <Skeleton variant="text" width={100} height={16} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={120} height={20} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={100} height={20} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={80} height={20} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="circular" width={24} height={24} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </TableContainer>
  );
};

export default SystemBankListSkeleton;
