import React from "react";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { AnimatePresence, motion } from "framer-motion";
import Iconify from "../iconify";
import { Stack } from "@mui/material";

// Define animation variants for when the button is in a loading state
const variants = {
  initial: { opacity: 1, scale: 1 },
  loading: { opacity: 0.6, scale: 0.95, transition: { duration: 0.3 } },
  completed: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

type LoadingButtonWithAnimationProps = LoadingButtonProps & {
  isLoading?: boolean;
};

const CustomLoadingButton: React.FC<LoadingButtonWithAnimationProps> = ({
  isLoading,
  ...props
}) => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={isLoading ? "loading" : "completed"}
      style={{ display: "inline-block" }} // To make sure the animation works
    >
      {" "}
      <AnimatePresence>
        {isLoading ? (
          <Stack alignItems={"center"}>
            <Iconify
              icon="eos-icons:bubble-loading"
              sx={{
                color: (theme) => theme.palette.primary.dark,
                width: 70,
                height: 35,
              }}
            />
          </Stack>
        ) : (
          <LoadingButton {...props}>{props.children}</LoadingButton>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomLoadingButton;
