import { Typography } from "@mui/material";
import packageFile from "../../../package.json";

function ShowLastUpdate() {
  return (
    <Typography
      variant="caption"
      sx={{ position: "fixed", bottom: 0, left: 2, zIndex: 10 }}
    >
      Last Updated :- {packageFile.lastUpdated}
    </Typography>
  );
}

export default ShowLastUpdate;
