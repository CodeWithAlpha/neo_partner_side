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
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
};

export default function SignUpVerify() {
  const navigate = useNavigate();
  const {
    state: { partner },
  } = useLocation();
  const [view, setView] = useState(true);
  const { timeLeft, start } = useCountdown(5);

  const LoginSchema = Yup.object().shape({
    code1: Yup.string().required(),
    code2: Yup.string().required(),
    code3: Yup.string().required(),
    code4: Yup.string().required(),
    code5: Yup.string().required(),
    code6: Yup.string().required(),
    otp1: Yup.string().required(),
    otp2: Yup.string().required(),
    otp3: Yup.string().required(),
    otp4: Yup.string().required(),
    otp5: Yup.string().required(),
    otp6: Yup.string().required(),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  const methods = useForm<FormValuesProps | any>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (partner._id) start();
    else navigate(PATH_AUTH.login);
  }, []);

  const onResendOtp = async () => {
    try {
      const body = {
        email: partner.email,
        // otpType: OTPTypes,
      };
      const Response = await fetcher.post(END_POINTS.AUTH.RESEND_OTP, body);
      start();
      showToast.success(Response.data.message);
    } catch (error) {}
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const body = {
        mobileOtp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
        emailOtp: `${data.otp1}${data.otp2}${data.otp3}${data.otp4}${data.otp5}${data.otp6}`,
      };
      const Response = await fetcher.post(
        END_POINTS.AUTH.SIGN_UP_VERIFY(partner._id),
        body
      );
      setView(false);
      setTimeout(() => {
        navigate(PATH_AUTH.login);
      }, 150);
    } catch (error) {
      reset();
    }
  };

  return (
    <AnimatePresence>
      {view && (
        <motion.div
          initial={{ opacity: 0, x: 600 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 1, x: 600 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 12,
          }}
        >
          {/* <Helmet>
            <title>
              {" "}
              Verify Mobile OTP | {import.meta.env.VITE_APP_COMPANY_NAME}
            </title>
          </Helmet> */}
          <Typography variant="h3" mb={3} color="primary.main">
            Verify Your Mobile Number
          </Typography>
          <Typography variant="subtitle1" mb={3}>
            We’ve sent a 6-digit OTP to your mobile number (
            {partner.companyContact}) and your email id ({partner.companyEmail}
            ). Please enter it below.
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2} maxWidth={400}>
              <Box>
                <Typography variant="body2" my={0.5} textAlign={"center"}>
                  Mobile OTP
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
                <Typography variant="body2" my={0.5} textAlign={"center"}>
                  Email OTP
                </Typography>
                <RHFCodes
                  keyName="otp"
                  inputs={["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"]}
                />
                {(!!errors.otp1 ||
                  !!errors.otp2 ||
                  !!errors.otp3 ||
                  !!errors.otp4 ||
                  !!errors.otp5 ||
                  !!errors.otp6) && (
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
              <Stack alignItems={"end"}>
                {timeLeft > 0 ? (
                  <Typography variant="subtitle1">
                    Resend Otp in {timeLeft} seconds
                  </Typography>
                ) : (
                  <Button sx={{ width: "fit-content" }}>Resend Otp</Button>
                )}
              </Stack>
            </Stack>
          </FormProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
