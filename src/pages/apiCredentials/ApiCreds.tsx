import {
  Box,
  Button,
  Card,
  FormHelperText,
  Grid2,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Iconify from "../../components/iconify";
import { useAuthContext } from "../../auth/useAuthContext";
import fetcher from "../../api/fetcher";
import { END_POINTS } from "../../api/EndPoints";
import { modalStyle } from "../../utils/cssStyles";

// form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFCodes } from "../../components/hook-form";
import CustomLoadingButton from "../../components/CustomComponents/CustomLoadingButton";
import useCountdown from "../../hooks/useCountdown";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { showToast } from "../../utils/Toast";
import useResponsive from "../../hooks/useResponsive";

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
};

function ApiCreds() {
  const isDesktop = useResponsive("up", "md");
  const { user, initialize } = useAuthContext();
  const [apiKey, setApiKey] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);

  const { copy } = useCopyToClipboard();

  const handleCopy = (val: string | undefined) => {
    showToast.success("Copied!");
    val && copy(val);
  };

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsRefresh(false);
    setApiKey("");
  };

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
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleFullView = async () => {
    try {
      await fetcher.post(
        isRefresh
          ? END_POINTS.API_CREDS.SEND_OTP_FOR_REFRESH_APIKEY
          : END_POINTS.API_CREDS.SEND_OTP_FOR_FULL_VIEW_APIKEY,
        {}
      );
      handleOpen();
    } catch (error) {}
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const body = {
        otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
      };
      const Response = await fetcher.post(
        isRefresh
          ? END_POINTS.API_CREDS.VERIFY_OTP_FOR_REFRESH_APIKEY
          : END_POINTS.API_CREDS.VERIFY_OTP_FOR_FULL_VIEW_APIKEY,
        body
      );
      setApiKey(
        isRefresh ? Response.data.refreshedApiKey : Response.data.apiKey
      );
      initialize();
    } catch (error) {}
  };

  return (
    <Card
      sx={{
        p: { xs: 1.5, md: 3 },
        height: isDesktop ? window.innerHeight - 120 : "fit-content",
      }}
    >
      <Typography fontSize={28} fontWeight={600}>
        API credentials
      </Typography>
      <Typography variant="h5" my={2}>
        API Key
      </Typography>
      <Stack flexDirection={{ md: "row" }} gap={2}>
        <TextField
          placeholder="API KEY"
          size="small"
          value={user?.apiKey}
          fullWidth
          disabled
        />
        <Stack flexDirection={"row"} gap={1}>
          <Button
            variant="outlined"
            sx={{ borderRadius: 5, whiteSpace: "nowrap" }}
            onClick={() => {
              handleFullView();
            }}
          >
            View Full Key
          </Button>
          <Button
            variant="outlined"
            sx={{ borderRadius: 5, whiteSpace: "nowrap" }}
            onClick={() => {
              handleFullView();
              setIsRefresh(true);
            }}
          >
            Refresh Key
          </Button>
        </Stack>
      </Stack>
      <WhitelistApi />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2} maxWidth={400}>
              {apiKey ? (
                <>
                  <Typography variant="h6" my={1} textAlign={"center"}>
                    {isRefresh ? "New API Key" : "API Key"}
                  </Typography>
                  <Typography
                    sx={{
                      border: "1px solid #dadada",
                      borderRadius: 1,
                      p: 2,
                      pr: 5,
                      maxWidth: 400,
                      wordBreak: "break-all",
                      position: "relative",
                    }}
                    draggable={false}
                  >
                    {apiKey}
                    <IconButton
                      sx={{ position: "absolute", right: 4, top: 8 }}
                      onClick={() => handleCopy(apiKey)}
                    >
                      <Iconify icon="iconamoon:copy-bold" />
                    </IconButton>
                  </Typography>
                  <CustomLoadingButton
                    variant="contained"
                    fullWidth
                    onClick={handleClose}
                  >
                    Close
                  </CustomLoadingButton>
                </>
              ) : (
                <>
                  <Box>
                    <Typography variant="h6" my={1} textAlign={"center"}>
                      Enter OTP
                    </Typography>
                    <RHFCodes
                      keyName="code"
                      disabled={!!apiKey}
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
                    disabled={!!apiKey}
                  >
                    Verify
                  </CustomLoadingButton>
                </>
              )}
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </Card>
  );
}

type FormValuesProps1 = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
};

function WhitelistApi() {
  const { user, initialize } = useAuthContext();
  const [ip, setIp] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isDelete, setIsDelete] = useState("");

  function isValidIP(ip: string) {
    const regex =
      /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    setIsValid(regex.test(ip));
  }

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
    setIsDelete("");
  };

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

  const methods = useForm<FormValuesProps1 | any>({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onAddIp = async () => {
    try {
      const Response = await fetcher.post(
        END_POINTS.API_CREDS.SEND_OTP_FOR_ADD_IP,
        {}
      );
      handleOpen();
    } catch (error) {}
  };

  const onDeleteIp = async (id: string) => {
    try {
      const Response = await fetcher.post(
        END_POINTS.API_CREDS.SEND_OTP_FOR_DELETE_IP,
        {}
      );
      handleOpen();
      setIsDelete(id);
    } catch (error) {}
  };

  const onSubmit = async (data: FormValuesProps) => {
    if (!!isDelete) {
      try {
        const body = {
          otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
          whitelistedIps: isDelete,
        };
        const Response = await fetcher.post(
          END_POINTS.API_CREDS.VERIFY_OTP_FOR_DELETE_IP,
          body
        );
        initialize();
        setIp("");
        setIsDelete("");
        handleClose();
      } catch (error) {}
      return;
    }
    try {
      const body = {
        otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
        whitelistedIps: ip,
      };
      const Response = await fetcher.post(
        END_POINTS.API_CREDS.VERIFY_OTP_FOR_ADD_IP,
        body
      );
      initialize();
      setIp("");
      setIsValid(false);
      handleClose();
    } catch (error) {}
  };

  return (
    <>
      <Typography variant="h5" my={2}>
        Whitelisted IPs
      </Typography>
      <Typography mb={2} maxWidth={500}>
        Restrict API usage to these trusted IP Addresses, Leave empty to allow
        from any IP Address
      </Typography>
      {user?.apiCredentials &&
        user?.apiCredentials.whitelistedIps.map((item: any) => (
          <Grid2 container spacing={2} mb={1}>
            <Grid2
              size={6}
              sx={{ px: 2, py: 1, bgcolor: "grey.200", borderRadius: 1 }}
            >
              <Typography variant="h4">{item}</Typography>
            </Grid2>
            <Grid2
              size={6}
              sx={{
                px: 2,
                py: 1,
                bgcolor: "grey.200",
                width: "fit-content",
                borderRadius: 1,
              }}
            >
              <IconButton
                sx={{ "&:hover": { color: "red" } }}
                onClick={() => {
                  onDeleteIp(item);
                }}
              >
                <Iconify
                  icon="material-symbols-light:delete"
                  width="24px"
                  height="24px"
                />
              </IconButton>
            </Grid2>
          </Grid2>
          // <Stack
          //   flexDirection={"row"}
          //   alignItems={"center"}
          //   gap={2}
          //   sx={{
          //     bgcolor: "background.neutral",
          //     p: 0.5,
          //     px: 3,
          //     mt: 0.5,
          //     borderRadius: 1,
          //     width: "fit-content",
          //   }}
          // >
          //   <Typography variant="h5">{item}</Typography>
          //   <IconButton
          //     sx={{ "&:hover": { color: "red" } }}
          //     onClick={() => {
          //       onDeleteIp(item);
          //     }}
          //   >
          //     <Iconify
          //       icon="material-symbols-light:delete"
          //       width="24px"
          //       height="24px"
          //     />
          //   </IconButton>
          // </Stack>
        ))}
      <Stack flexDirection={"row"} alignItems={"center"} gap={2} mt={2}>
        <TextField
          value={ip}
          onChange={(e) => {
            setIp(e.target.value);
            isValidIP(e.target.value);
          }}
          placeholder="Enter whitelist IP"
          size="small"
          sx={{ maxWidth: 450 }}
        />
        <Button
          variant="outlined"
          sx={{ borderRadius: 5, whiteSpace: "nowrap" }}
          disabled={!isValid}
          onClick={onAddIp}
        >
          Add IP
        </Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2} maxWidth={400}>
              <Box>
                <Typography variant="h6" my={1} textAlign={"center"}>
                  OTP sent to the registered company email, please verify.
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
                Verify
              </CustomLoadingButton>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
}

export default ApiCreds;
