import { Skeleton, Box, Typography, Button } from "@mui/material";

const CategoryListSkeleton = () => {
  return (
    <Box
      sx={{
        gap: 0.5,
        p: 2,
        borderRadius: 2,
        boxShadow: (theme) => theme.shadows[11],
        bgcolor: "background.paper",

        mt: 2,
      }}
    >
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="text" width="80%" height={20} />
      <Skeleton variant="text" width="80%" height={20} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Skeleton variant="rectangular" width={100} height={32} />
        <Skeleton variant="circular" width={24} height={24} />
      </Box>
    </Box>
  );
};

export default CategoryListSkeleton;
