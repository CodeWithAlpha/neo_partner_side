import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import fetcher from "../../api/fetcher";
import { END_POINTS } from "../../api/EndPoints";
import NoDataFound from "../../components/no-data/NoDataFound";

export default function ActiveServices() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetcher.get(END_POINTS.PLAN.GET_PLAN_DETAIL);
        const allServices: any[] = [];
        response.data.categories?.forEach((cat: any) => {
          allServices.push(...cat.services);
        });
        setServices(allServices);
      } catch (error) {
        setServices([]);
      }
    };

    fetchServices();
  }, []);

  if (!services.length) return null;

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
                { id: 3, label: "Version" },
                { id: 4, label: "Action" },
              ].map((item) => (
                <TableCell key={item.id}>
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
                  <Typography noWrap variant="body2">{row.name}</Typography>
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>v1</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() =>
                      window.open(
                        Array.isArray(row.documentationUrl)
                          ? row.documentationUrl[0]
                          : row.documentationUrl,
                        "_blank"
                      )
                    }
                  >
                    View Docs
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <NoDataFound isDataFound={!!services.length} />
      </TableContainer>
    </Card>
  );
}
