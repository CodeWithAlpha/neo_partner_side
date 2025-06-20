import {
  Box,
  Card,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAuthContext } from "../../auth/useAuthContext";
import NoDataFound from "../../components/no-data/NoDataFound";

export default function ActiveServices() {
  const { user } = useAuthContext();

  if (!user?.allowedServices.length) return null;

  return (
    <Card sx={{ height: window.innerHeight - 200 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {[
                { id: 0, label: "Service Name" },
                { id: 1, label: "Description" },
                { id: 2, label: "Api Calls(used today)" },
                { id: 5, label: "action" },
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
                <TableCell>{row.description}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <Link
                    sx={{ cursor: "pointer" }}
                    onClick={() => window.open(row.documentationUrl, "_blank")}
                  >
                    [View DOCS]
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <NoDataFound isDataFound={!!user?.allowedServices} />
      </TableContainer>
    </Card>
  );
}
