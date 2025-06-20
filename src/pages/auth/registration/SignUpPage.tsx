import { Helmet } from "@modern-js/runtime/head";
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import CustomLoadingButton from "../../../components/CustomComponents/CustomLoadingButton";
import { useEffect, useState } from "react";
import { PATH_AUTH } from "../../../routes/paths";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import fetcher from "../../../api/fetcher";
import { END_POINTS } from "../../../api/EndPoints";

// form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFCheckbox,
  RHFPhoneField,
  RHFTextField,
} from "../../../components/hook-form";
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

type FormValuesProps = {
  fullName: string;
  companyName: string;
  email: string;
  mobileNo: string;
  password: string;
  confirmPassword: string;
  requestedServices: { _id: string; name: string }[];
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const [view, setView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [servicesList, setServicesList] = useState([]);

  const Schema = Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    companyName: Yup.string().required("Company Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Company Email is required"),
    mobileNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Company Contact must be a valid 10-digit number")
      .required("Company Contact is required"),
    password: Yup.string()
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      )
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const defaultValues = {
    fullName: "",
    companyName: "",
    email: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
    requestedServices: [],
  };

  const methods = useForm<FormValuesProps | any>({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    watch,
    getValues,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const Response = await fetcher.get(END_POINTS.CATEGORY.GET_LIST(""));
      setCategoryList(Response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getServiceByCategory = async (id: string) => {
    try {
      setServicesList([]);
      const Response = await fetcher.get(
        END_POINTS.SERVICES.LIST_BY_CATEGORY(1, 1000, id)
      );
      setServicesList(Response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const body = {
        fullName: data.fullName,
        companyName: data.companyName,
        email: data.email,
        mobileNo: data.mobileNo,
        password: data.password,
        confirmPassword: data.confirmPassword,
        requestedServices: data.requestedServices.map((item) => item._id),
      };
      const Response = await fetcher.post(END_POINTS.AUTH.SIGN_UP, body);
      const { partner }: { partner: any } = Response.data;
      setView(false);
      setTimeout(() => {
        navigate(PATH_AUTH.signUpVerify, { state: { partner } });
      }, 150);
    } catch (error) {}
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
            <title> Sign Up | {import.meta.env.VITE_APP_COMPANY_NAME}</title>
          </Helmet> */}
          <Typography variant="h3" mb={2} color="primary.main">
            Sign up
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack
              gap={1.5}
              maxWidth={400}
              sx={{
                maxHeight: window.innerHeight - 160,
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              <Box>
                <Typography>First Name</Typography>
                <RHFTextField name="fullName" placeholder="Full Name" />
              </Box>
              <Box>
                <Typography>Company Name</Typography>
                <RHFTextField name="companyName" placeholder="Company Name" />
              </Box>
              <Box>
                <Typography>Email</Typography>
                <RHFTextField name="email" placeholder="Email" />
              </Box>
              <Box>
                <Typography>Contact</Typography>
                <RHFTextField
                  type="number"
                  name="mobileNo"
                  placeholder="Contact No."
                />
              </Box>
              <Box>
                <Typography>Password</Typography>
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
              <Box>
                <Typography variant="body2" my={0.5}>
                  Confirm Password
                </Typography>
                <RHFTextField
                  name="confirmPassword"
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

              <Box>
                <Typography>Category</Typography>
                <Autocomplete
                  value={watch("categoryId")}
                  onChange={(e: any, newVal: any) => {
                    setValue("categoryId", newVal);
                    getServiceByCategory(newVal._id);
                    setValue("allowedServices", []);
                  }}
                  size="small"
                  options={categoryList.map((item: any) => item)}
                  autoComplete={false}
                  freeSolo={false} // Disallows typing custom values
                  getOptionLabel={(option: any) => option.categoryName}
                  renderInput={(params: any) => (
                    <RHFTextField
                      name="categoryId"
                      placeholder="Category"
                      {...params}
                    />
                  )}
                />
              </Box>

              <Box>
                <Typography>Allowed Services</Typography>
                <Autocomplete
                  value={watch("requestedServices") || null}
                  onChange={(e: any, newVal: any) =>
                    setValue("requestedServices", newVal)
                  }
                  multiple
                  size="small"
                  options={servicesList.map((item: any) => ({
                    _id: item._id,
                    name: item.name,
                  }))}
                  autoComplete={false}
                  freeSolo={false} // Disallows typing custom values
                  getOptionLabel={(option: any) => option.name}
                  renderInput={(params: any) => (
                    <RHFTextField
                      name="requestedServices"
                      placeholder="Select Services"
                      {...params}
                    />
                  )}
                />
              </Box>

              <RHFCheckbox
                name="isAgree"
                label={
                  <Typography variant="body2" color="text.secondary">
                    I agree to the{" "}
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
                    </Link>{" "}
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
                      [Privacy Policy]{" "}
                    </Link>{" "}
                    of Neosprint India Private Limited.
                  </Typography>
                }
              />
              <CustomLoadingButton
                fullWidth
                loading={isSubmitting}
                variant="contained"
                type="submit"
              >
                Get Started
              </CustomLoadingButton>
            </Stack>
          </FormProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
