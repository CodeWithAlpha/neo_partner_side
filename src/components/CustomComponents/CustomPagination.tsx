import React, { useCallback, useMemo } from "react";
import { Box, Select, MenuItem, Typography, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Iconify from "../iconify";
import { defaultItemsPerPage } from "../../config";
import useResponsive from "../../hooks/useResponsive";

interface PaginationControlsProps {
  totalItems: number;
  itemsPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  totalItems,
  itemsPerPage = defaultItemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50, 100],
}) => {
  const isDesktop = useResponsive("up", "md");
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  const startItem = useMemo(
    () => (currentPage - 1) * itemsPerPage + 1,
    [currentPage, itemsPerPage]
  );
  const endItem = useMemo(
    () => Math.min(currentPage * itemsPerPage, totalItems),
    [currentPage, itemsPerPage, totalItems]
  );

  const handlePrev = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }, [currentPage, onPageChange, totalPages]);

  const handleItemsPerPageChange = (event: any) => {
    onItemsPerPageChange(Number(event.target.value));
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingTop={1}
      bgcolor="grey.200"
    >
      {/* Items per page */}
      {isDesktop && (
        <Box display="flex" alignItems="center" gap={1} flexGrow={1}>
          <Typography variant="body2">Items per page: </Typography>
          <Select
            size="small"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            variant="outlined"
          >
            {itemsPerPageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}

      {/* Item range */}
      <Typography variant="body2" mr={3}>
        {startItem} – {endItem} of {totalItems} items
      </Typography>

      {/* Page control */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2">
          {currentPage} of {totalPages}
        </Typography>
        <IconButton
          onClick={handlePrev}
          disabled={currentPage === 1}
          size="small"
          disableRipple
        >
          <Iconify
            icon="formkit:left"
            width="30px"
            height="40px"
            sx={{
              bgcolor: "background.default",
              "&:active": {
                scale: 0.9,
              },
            }}
          />
        </IconButton>
        <IconButton
          onClick={handleNext}
          disabled={currentPage === totalPages}
          size="small"
          disableRipple
        >
          <Iconify
            icon="formkit:right"
            width="30px"
            height="40px"
            sx={{
              bgcolor: "background.default",
              "&:active": {
                scale: 0.9,
              },
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default React.memo(PaginationControls);
