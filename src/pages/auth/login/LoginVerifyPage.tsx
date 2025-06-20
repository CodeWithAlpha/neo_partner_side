import { Helmet } from "@modern-js/runtime/head";
import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";

// form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFCodes } from "../../../components/hook-form";
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
import { showToast } from "../../../utils/Toast";

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
};

export default function LoginVerifyPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { initialize } = useAuthContext();
  const [view, setView] = useState(true);
  const { timeLeft, start } = useCountdown(60);

  const Schema = Yup.object().shape({
    code1: Yup.string().required(),
    code2: Yup.string().required(),
    code3: Yup.string().required(),
    code4: Yup.string().required(),
    code5: Yup.string().required(),
    code6: Yup.string().required(),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm<FormValuesProps | any>({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (state.partner?.email) start();
    else navigate(PATH_AUTH.login);
    return () => localStorage.removeItem("temp_token");
  }, []);

  const onResendOtp = async () => {
    try {
      const body = {
        email: state.partner.email,
        otpType: OTPTypes.PARTNER_LOGIN,
      };
      const Response = await fetcher.post(END_POINTS.AUTH.RESEND_OTP, body);
      start();
      showToast.success(Response.data.message);
    } catch (error) {}
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const body = {
        email: state.partner.email,
        otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
      };
      const Response = await fetcher.post(END_POINTS.AUTH.VERIFY, body);

      localStorage.removeItem("temp_token");
      localStorage.setItem("neo_partner_token", Response.data.token);

      setView(false);
      if (Response.data.user?.status == "unverified") {
        setTimeout(() => {
          navigate(PATH_AUTH.signUpVerify, {
            state: { partner: Response.data.user },
          });
        }, 150);
        return;
      }
      if (!Response.data.user?.isDocumentUplaoded) {
        setTimeout(() => {
          navigate(PATH_AUTH.uploadDocs, {
            state: { user: Response.data.user },
          });
        }, 150);
        return;
      }
      if (!Response.data.user?.isAdminApproved) {
        navigate(PATH_AUTH.applicationReview);
        return;
      }
      initialize();
    } catch (error) {
      reset();
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
                  Resend Otp in {timeLeft} seconds
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
