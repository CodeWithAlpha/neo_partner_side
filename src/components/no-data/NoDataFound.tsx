import { Box } from "@mui/material";
import image from "../../assets/illustrations/No data-amico.svg";

function NoDataFound({ isDataFound }: { isDataFound: boolean }) {
  if (isDataFound) {
    return null;
  }

  return (
    <img
      src={image}
      style={{ margin: "auto", height: 450, display: "block" }}
    />
  );
}

export default NoDataFound;
