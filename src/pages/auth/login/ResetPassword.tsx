import { Helmet } from "@modern-js/runtime/head";
import { Box, Button, Stack, Typography } from "@mui/material";

// form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFCheckbox,
  RHFTextField,
} from "../../../components/hook-form";
import CustomLoadingButton from "../../../components/CustomComponents/CustomLoadingButton";
import { useState } from "react";
import { PATH_AUTH } from "../../../routes/paths";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import fetcher from "../../../api/fetcher";
import { END_POINTS } from "../../../api/EndPoints";
import { showToast } from "../../../utils/Toast";

// ----------------------------------------------------------------------

type FormValuesProps = {
  identifier: string;
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [view, setView] = useState(true);

  const LoginSchema = Yup.object().shape({
    identifier: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const defaultValues = {
    identifier: "",
  };

  const methods = useForm<FormValuesProps | any>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const body = {
        identifier: data.identifier,
      };
      await fetcher.post(END_POINTS.AUTH.FORGOT_PASSWORD_OTP_SEND, body);
      setView(false);
      setTimeout(() => {
        navigate(PATH_AUTH.resetPasswordVerify, {
          state: { partner: { email: data.identifier } },
        });
      }, 150);
    } catch (error) {
      showToast.error(error.data.message);
    }
  };

  return (
    <AnimatePresence>
      {view && (
        <motion.div
          initial={{ opacity: 0, x: -600 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 1, x: -600 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 12,
          }}
        >
          {/* <Helmet>
            <title>
              {" "}
              Reset Password | {import.meta.env.VITE_APP_COMPANY_NAME}
            </title>
          </Helmet> */}
          <Typography variant="h3" mb={3}>
            Reset Your Password
          </Typography>
          <Typography variant="subtitle1" mb={3}>
            Enter your registered email or mobile number to receive a password
            reset link.
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={3} maxWidth={400}>
              <Box>
                <Typography variant="body2" my={0.5}>
                  Email / Mobile Number
                </Typography>
                <RHFTextField
                  name="identifier"
                  placeholder="Registered email"
                />
              </Box>

              <CustomLoadingButton
                fullWidth
                type="submit"
                loading={isSubmitting}
                variant="contained"
              >
                Send OTP
              </CustomLoadingButton>
              <Typography>
                Have account ?{" "}
                <Typography
                  color="primary.main"
                  variant="subtitle1"
                  sx={{
                    display: "inline",
                    cursor: "pointer",
                    textDecoration: "underline",
                    alignSelf: "end",
                  }}
                  onClick={() => {
                    setView(false);
                    setTimeout(() => {
                      navigate(PATH_AUTH.login);
                    }, 150);
                  }}
                >
                  login now.
                </Typography>
              </Typography>
            </Stack>
          </FormProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
