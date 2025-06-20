import { Box, IconButton, TextField } from "@mui/material";
import Iconify from "../../../components/iconify";

function SearchBox() {
  return (
    <Box sx={{ maxWidth: 400, width: "100%", position: "relative" }}>
      <TextField
        autoComplete="off"
        variant="standard"
        placeholder="Search something..."
        size="medium"
        sx={{
          "& .MuiInputBase-root": {
            padding: 0.5, // Remove padding
          },
        }}
        fullWidth
      />
      <IconButton
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <Iconify
          icon="mdi:search"
          sx={{ height: 30, width: 30, color: "text.primary" }}
        />
      </IconButton>
    </Box>
  );
}

export default SearchBox;
