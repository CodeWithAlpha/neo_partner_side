import {
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useResponsive from "../../hooks/useResponsive";
import { modalStyle } from "../../utils/cssStyles";

// form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFCodes } from "../../components/hook-form";
import CustomLoadingButton from "../../components/CustomComponents/CustomLoadingButton";
import fetcher from "../../api/fetcher";
import { END_POINTS } from "../../api/EndPoints";
import { useAuthContext } from "../../auth/useAuthContext";
import Iconify from "../../components/iconify";

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
};

function WebhookURL() {
  const { user, initialize } = useAuthContext();
  const isDesktop = useResponsive("up", "md");
  const [isDelete, setIsDelete] = useState("");
  const [values, setValues] = useState({
    service: "",
    url: "",
    isValidate: false,
  });

  function isValidUrl(url: string) {
    const urlRegex = /^https:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    setValues((prev) => ({ ...prev, isValidate: urlRegex.test(url) }));
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

  const methods = useForm<FormValuesProps | any>({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onAddCallback = async () => {
    try {
      await fetcher.post(END_POINTS.API_CREDS.SEND_OTP_FOR_ADD_CALLBACK, {});
      handleOpen();
    } catch (error) {}
  };

  const onDeleteCallback = async () => {
    try {
      await fetcher.post(END_POINTS.API_CREDS.SEND_OTP_FOR_DELETE_CALLBACK, {});
      handleOpen();
    } catch (error) {}
  };

  const onSubmit = async (data: FormValuesProps) => {
    if (!!isDelete) {
      try {
        const body = {
          id: isDelete,
          otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
        };
        await fetcher.post(
          END_POINTS.API_CREDS.VERIFY_OTP_FOR_DELETE_CALLBACK,
          body
        );
        initialize();
        handleClose();
        setIsDelete("");
      } catch (error) {}
      return;
    }
    try {
      const body = {
        serviceId: values.service,
        url: values.url,
        otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
      };
      await fetcher.post(
        END_POINTS.API_CREDS.VERIFY_OTP_FOR_ADD_CALLBACK,
        body
      );
      initialize();
      handleClose();
      setValues({ service: "", url: "", isValidate: false });
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
        Webhook URLs
      </Typography>

      <Typography variant="h5" my={2}>
        Callback URIs
      </Typography>
      <Typography variant="body1" my={2}>
        Setup callback URIs for receiving responses asynchronously.
      </Typography>
      <Box
        sx={{
          border: "1px solid #dadada",
          borderRadius: 1,
          overflow: "clip",
          mt: 1,
        }}
      >
        <TableContainer>
          <Table>
            <TableHead
              sx={{
                bgcolor: (theme) => theme.palette.grey[400],
              }}
            >
              <TableRow>
                <TableCell>Service</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user?.apiCredentials &&
                user?.apiCredentials.callBackUrls.map((row: any) => (
                  <TableRow
                    key={row.service._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.service.name}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Typography noWrap>{row.url}</Typography>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <IconButton
                        sx={{ "&:hover": { color: "red" } }}
                        onClick={() => {
                          onDeleteCallback();
                          setIsDelete(row._id);
                        }}
                      >
                        <Iconify
                          icon="material-symbols-light:delete"
                          width="24px"
                          height="24px"
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Stack flexDirection={{ md: "row" }} alignItems={"start"} gap={1} mt={2}>
        <Stack flexDirection={"row"} gap={1} width={"100%"}>
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel id="demo-simple-select-helper-label">
              Select Service
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.service}
              label="Select Service"
              onChange={(e) => {
                setValues({ ...values, service: e.target.value });
              }}
            >
              {user?.allowedServices.map((item: any) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            placeholder="Enter webhook URL"
            size="small"
            value={values.url}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, url: e.target.value }));
              isValidUrl(e.target.value);
            }}
            fullWidth
          />
        </Stack>
        <Button
          variant="contained"
          sx={{ borderRadius: 5 }}
          onClick={onAddCallback}
          disabled={!values.service || !values.isValidate}
        >
          Add
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
    </Card>
  );
}

export default WebhookURL;
