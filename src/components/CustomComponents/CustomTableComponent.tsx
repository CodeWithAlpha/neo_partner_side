import * as React from "react";
import { m, LazyMotion, domAnimation, useInView } from "framer-motion";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, useTheme } from "@mui/material";

// Define types for props
interface Column {
  id: string;
  label: string;
  align?: "right" | "left" | "center" | any;
}

interface TableComponentProps {
  columns: Column[];
  data: any[];
}

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.4 },
  }),
};

const CustomTableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
}) => {
  const theme = useTheme();
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            maxHeight: 500,
          }}
        >
          <Table
            sx={{ minWidth: 650 }}
            stickyHeader
            aria-label="animated table"
          >
            {/* Table Header */}
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {data.map((row, index) => {
                const ref = React.useRef(null);
                const isInView = useInView(ref, {
                  once: false,
                  margin: "-50px",
                });

                return (
                  <m.tr
                    key={index}
                    ref={ref}
                    variants={rowVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={index}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: theme.palette.background.neutral,
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align || "left"}
                        sx={{
                          padding: "12px",
                        }}
                      >
                        <Typography
                          sx={{ color: "inherit", fontWeight: "inherit" }}
                        >
                          {" "}
                          {row[column.id]}
                        </Typography>
                      </TableCell>
                    ))}
                  </m.tr>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </m.div>
  );
};

export default CustomTableComponent;
