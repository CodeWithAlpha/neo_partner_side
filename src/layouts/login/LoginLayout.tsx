// @mui
import { Typography, Stack, TextField } from "@mui/material";
// components
import Logo from "../../components/logo";
import Image from "../../components/image";
//
import { StyledRoot, StyledContent } from "./styles";
import { Outlet } from "react-router-dom";
import ShowLastUpdate from "../../components/CustomComponents/ShowLastUpdate";

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout() {
  const columns = [
    { id: "name", label: "Dessert (100g serving)", align: "left" },
    { id: "calories", label: "Calories", align: "right" },
    { id: "fat", label: "Fat (g)", align: "right" },
    { id: "carbs", label: "Carbs (g)", align: "right" },
    { id: "protein", label: "Protein (g)", align: "right" },
  ];

  const data = [
    {
      name: "Frozen yoghurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
    },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
    },
    { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  ];
  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          position: "absolute",
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />

      {/* <StyledSection>
        <Typography
          variant="h3"
          sx={{ mb: 10, maxWidth: 480, textAlign: "center" }}
        >
          {title || "Hi, Welcome back"}
        </Typography>
        <TextField placeholder="placeholder" />
        <TableComponent columns={columns} data={data} />;
        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={
            illustration || "/assets/illustrations/illustration_dashboard.png"
          }
          sx={{ maxWidth: 720 }}
        />
        <StyledSectionBg />
      </StyledSection>
       */}

      <StyledContent>
        <Stack sx={{ width: 1 }}>
          {" "}
          <Outlet />{" "}
        </Stack>
      </StyledContent>
      <ShowLastUpdate />
    </StyledRoot>
  );
}
