import { Helmet } from "@modern-js/runtime/head";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";

// form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFCodes,
  RHFTextField,
} from "../../../components/hook-form";
import CustomLoadingButton from "../../../components/CustomComponents/CustomLoadingButton";
import { useEffect, useState } from "react";
import useCountdown from "../../../hooks/useCountdown";
import { PATH_AUTH } from "../../../routes/paths";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import fetcher from "../../../api/fetcher";
import { END_POINTS } from "../../../api/EndPoints";

import { useAuthContext } from "../../../auth/useAuthContext";
import { OTPTypes } from "../../../utils/enums";
import Iconify from "../../../components/iconify";
import { showToast } from "../../../utils/Toast";

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function ResetPasswordVerify() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { initialize } = useAuthContext();
  const [view, setView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const { timeLeft, start } = useCountdown(60);

  const Schema = Yup.object().shape({
    code1: Yup.string().required(),
    code2: Yup.string().required(),
    code3: Yup.string().required(),
    code4: Yup.string().required(),
    code5: Yup.string().required(),
    code6: Yup.string().required(),
    newPassword: Yup.string()
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      )
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const methods = useForm<FormValuesProps | any>({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (state.partner?.email) start();
    else navigate(PATH_AUTH.resetPassword);
  }, []);

  const onResendOtp = async () => {
    try {
      const body = {
        email: state.partner.email,
        otpType: OTPTypes.PARTNER_RESET_PASSWORD,
      };
      const Response = await fetcher.post(END_POINTS.AUTH.RESEND_OTP, body);
      start();
      showToast.success(Response.data.message);
    } catch (error) {}
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const body = {
        identifier: state.partner.email,
        otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
        newPassword: data.newPassword,
      };
      const Response = await fetcher.post(
        END_POINTS.AUTH.FORGOT_PASSWORD_OTP_VERIFY,
        body
      );

      setView(false);
      setTimeout(() => navigate(PATH_AUTH.login), 150);
    } catch (error) {}
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
            <title> Verify OTP | {import.meta.env.VITE_APP_COMPANY_NAME}</title>
          </Helmet> */}
          <Typography variant="h3" fontWeight={600} mb={3} color="primary.main">
            Verify Your Identity
          </Typography>
          <Typography variant="subtitle1" mb={3}>
            For security reasons, we’ve sent a 6-digit OTP to your registered
            email and mobile number.
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2} maxWidth={400}>
              <Box>
                <Typography variant="body2" my={0.5}>
                  {`Enter Login MFA (Multiple Factor Authentication) code.`}
                </Typography>
                <RHFCodes
                  keyName="code"
                  inputs={[
                    "code1",
                    "code2",
                    "code3",
                    "code4",
                    "code5",
                    "code6",
                  ]}
                />
                {(!!errors.code1 ||
                  !!errors.code2 ||
                  !!errors.code3 ||
                  !!errors.code4 ||
                  !!errors.code5 ||
                  !!errors.code6) && (
                  <FormHelperText error sx={{ px: 2 }}>
                    Code is required
                  </FormHelperText>
                )}
              </Box>

              <Box>
                <Typography>Password</Typography>
                <RHFTextField
                  name="newPassword"
                  placeholder="Choose your password"
                  type={showPassword ? "text" : "password"}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Iconify
                              icon={
                                showPassword
                                  ? "iconoir:eye-solid"
                                  : "fluent:eye-off-16-regular"
                              }
                              width="24"
                              height="24"
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" my={0.5}>
                  Confirm Password
                </Typography>
                <RHFTextField
                  name="confirmNewPassword"
                  placeholder="Confirm your password"
                  type={showPassword1 ? "text" : "password"}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword1(!showPassword1)}
                          >
                            <Iconify
                              icon={
                                showPassword1
                                  ? "iconoir:eye-solid"
                                  : "fluent:eye-off-16-regular"
                              }
                              width="24"
                              height="24"
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              <CustomLoadingButton
                loading={isSubmitting}
                variant="contained"
                fullWidth
                type="submit"
              >
                Verify & Continue
              </CustomLoadingButton>
              <Stack flexDirection={"row"} alignItems={"center"}>
                <Typography variant="subtitle1">
                  {timeLeft > 0 ? `Resend Otp in ${timeLeft} seconds` : "OTP"}
                </Typography>
                <Button
                  sx={{
                    width: "fit-content",
                    textDecoration: "underline",
                  }}
                  disabled={timeLeft > 0}
                  onClick={onResendOtp}
                >
                  Resend
                </Button>
              </Stack>
            </Stack>
          </FormProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
