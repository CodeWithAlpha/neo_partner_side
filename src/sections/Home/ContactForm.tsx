import { Grid2, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { homePageFontStyles } from "../../pages/Home";
import Iconify from "../../components/iconify";
// form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from "../../components/hook-form";
import CustomLoadingButton from "../../components/CustomComponents/CustomLoadingButton";
import { rowVariants } from "../../utils/cssStyles";
import { motion } from "framer-motion";

type FormValuesProps = {};

function ContactForm() {
  const ContactFormSchema = Yup.object().shape({});

  const defaultValues = {};
  const methods = useForm<FormValuesProps | any>({
    resolver: yupResolver(ContactFormSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    resetField,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = () => {};

  return (
    <Grid2 container spacing={2} py={"12%"}>
      <Grid2 size={{ xs: 12, md: 7 }}>
        <Typography
          fontSize={homePageFontStyles.level2}
          textAlign={{ xs: "center", md: "start" }}
          variants={rowVariants}
          component={motion.p}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          Ready
        </Typography>
        <Typography
          fontSize={homePageFontStyles.level3}
          textAlign={{ xs: "center", md: "start" }}
          variants={rowVariants}
          component={motion.p}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          to Simplify Your API Integration?
        </Typography>
        <Typography
          fontSize={homePageFontStyles.level4}
          mb={5}
          color="text.secondary"
          textAlign={{ xs: "center", md: "start" }}
          variants={rowVariants}
          component={motion.p}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          Join the growing network of businesses that trust NeoAPIBox for their
          fintech and non-fintech API needs.
        </Typography>
        <Stack my={2} gap={2}>
          {/* Contact */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            variants={rowVariants}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <Iconify
              icon="line-md:phone-call-loop"
              color={"primary.main"}
              width={30}
            />
            <Typography fontSize={homePageFontStyles.level5}>
              +91 9810866136
            </Typography>
          </Stack>

          {/* Email */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            variants={rowVariants}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <Iconify
              icon="iconamoon:email-bold"
              color={"primary.main"}
              width={30}
            />
            <Typography fontSize={homePageFontStyles.level5}>
              info@neosprintindia.com
            </Typography>
          </Stack>

          {/* Address */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            variants={rowVariants}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <Iconify
              icon="ic:baseline-gps-fixed"
              color={"primary.main"}
              width={30}
            />
            <Typography fontSize={homePageFontStyles.level5}>
              H 213 Sector 63 Noida
            </Typography>
          </Stack>

          {/* Company Name */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            variants={rowVariants}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <Iconify icon="mdi:company" color={"primary.main"} width={30} />
            <Typography fontSize={homePageFontStyles.level5}>
              Neosprint India Private Limited
            </Typography>
          </Stack>
        </Stack>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 5 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            gap={4}
            variants={rowVariants}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <RHFTextField
              size="medium"
              variant="standard"
              name="name"
              label="Full Name"
            />
            <RHFTextField
              size="medium"
              variant="standard"
              name="email"
              label="Email, Phone"
            />
            <RHFTextField
              size="medium"
              multiline
              rows={7}
              name="message"
              label="Message"
            />
            <CustomLoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
            >
              Submit
            </CustomLoadingButton>
            <Typography
              fontSize={homePageFontStyles.level5}
              textAlign={{ xs: "center", md: "start" }}
              variants={rowVariants}
              component={motion.p}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              By submitting this, you agree to our{" "}
              <Typography
                sx={{
                  textDecoration: "underline",
                  display: "inline-block",
                  color: "primary.main",
                }}
              >
                Terms and Conditions{" "}
              </Typography>{" "}
              &{" "}
              <Typography
                sx={{
                  textDecoration: "underline",
                  display: "inline-block",
                  color: "primary.main",
                }}
              >
                Privacy Policy
              </Typography>
            </Typography>
          </Stack>
        </FormProvider>
      </Grid2>
    </Grid2>
  );
}

export default ContactForm;
