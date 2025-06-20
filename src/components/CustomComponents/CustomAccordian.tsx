import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  useTheme,
  Switch,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";

interface AccordionProps {
  title: string;
  status: boolean | string;
  since: string;
  updatedAt: string;
  onChangeStatus: (status: boolean) => void;
  children: React.ReactNode;
}

const AnimatedAccordion: React.FC<AccordionProps> = ({
  title,
  status,
  since,
  updatedAt,
  onChangeStatus,
  children,
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        boxShadow: theme.shadows[11],
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          cursor: "pointer",
        }}
      >
        <Stack>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="caption" color="text.secondary">
            Since: {fDate(since)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Updated at: {fDate(updatedAt)}
          </Typography>
        </Stack>
        <Stack
          flexDirection={{ md: "row" }}
          alignItems={{ xs: "end", md: "center" }}
          gap={{ md: 2 }}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{ borderRadius: 5, whiteSpace: "nowrap" }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Hide" : "View"} Details
          </Button>
          <Switch
            size="medium"
            checked={!!status}
            onClick={() => onChangeStatus(!!status)}
          />
        </Stack>
      </Box>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <CardContent sx={{ py: 0, px: 1 }}>{children}</CardContent>
      </motion.div>
    </Card>
  );
};

export default AnimatedAccordion;
