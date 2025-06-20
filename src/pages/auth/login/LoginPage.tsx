import { Helmet } from "@modern-js/runtime/head";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";

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
import { PATH_AUTH, PATH_DASHBOARD } from "../../../routes/paths";
import { useNavigate } from "react-router-dom";
import { motion, m, AnimatePresence } from "framer-motion";
import fetcher from "../../../api/fetcher";
import { END_POINTS } from "../../../api/EndPoints";
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  isAgree: boolean;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [view, setView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
    isAgree: Yup.boolean()
      .oneOf([true], "You must agree to continue")
      .required("Agreement is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
    isAgree: false,
  };

  const methods = useForm<FormValuesProps | any>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const body = {
        email: data.email,
        password: data.password,
        fcmToken: "",
      };
      const Response = await fetcher.post(END_POINTS.AUTH.LOGIN, body);
      localStorage.setItem("temp_token", Response.data.token);
      setView(false);
      if (Response.data.statusCode == 202) {
        setTimeout(() => {
          navigate(PATH_AUTH.signUpVerify, {
            state: { partner: Response.data.partner },
          });
        }, 150);
        return;
      }
      setTimeout(() => {
        navigate(PATH_AUTH.loginVerify, {
          state: { partner: { email: data.email } },
        });
      }, 150);
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
          <Typography variant="h3" mb={2}>
            Sign in to NeoapiBox Portal
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2} maxWidth={400}>
              <Box>
                <Typography variant="body2" my={0.5}>
                  Email / Mobile Number
                </Typography>
                <RHFTextField name="email" placeholder="Email" />
              </Box>
              <Box>
                <Typography variant="body2" my={0.5}>
                  Password
                </Typography>
                <RHFTextField
                  name="password"
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
              <RHFCheckbox
                name="isAgree"
                label={
                  <Typography variant="body2" color="text.secondary">
                    By logging in, you agree to Neosprint's{" "}
                    <Link
                      variant="overline"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        window.open(
                          import.meta.env.VITE_NEO_WEB_URL + "terms-of-use"
                        )
                      }
                    >
                      [Terms & Conditions]
                    </Link>
                    and{" "}
                    <Link
                      variant="overline"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        window.open(
                          import.meta.env.VITE_NEO_WEB_URL + "privacy-policy"
                        )
                      }
                    >
                      [Privacy Policy].
                    </Link>
                  </Typography>
                }
              />

              <CustomLoadingButton
                fullWidth
                loading={isSubmitting}
                disabled={!isValid}
                variant="contained"
                type="submit"
              >
                Login
              </CustomLoadingButton>
              <Typography>
                Forgot Password?{" "}
                <Typography
                  color="primary.main"
                  display={"inline"}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontWeight: 700,
                  }}
                  onClick={() => {
                    setView(false);
                    setTimeout(() => {
                      navigate(PATH_AUTH.resetPassword);
                    }, 150);
                  }}
                >
                  Recover it here
                </Typography>
              </Typography>
            </Stack>
          </FormProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
