import { IconProps } from "@iconify/react";
import { Stack, Typography } from "@mui/material";
import React from "react";
import { fIndianCurrency } from "../../utils/formatNumber";

function WalletCards({
  icon,
  value,
  label,
}: {
  icon: any;
  value: string;
  label: string;
}) {
  return (
    <Stack
      flexDirection={"row"}
      alignItems={"center"}
      gap={5}
      sx={{
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
        p: 1.5,
        borderRadius: 2,
      }}
    >
      <span>{icon}</span>
      <Stack>
        <Typography
          variant="h4"
          fontWeight={500}
          textAlign={"end"}
          color="primary.main"
        >
          {fIndianCurrency(+value)}
        </Typography>
        <Typography variant="h5" fontWeight={500} color="primary.main">
          {label}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default WalletCards;
