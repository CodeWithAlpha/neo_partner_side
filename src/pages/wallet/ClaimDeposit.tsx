// form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
} from "../../components/hook-form";
import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import fetcher from "../../api/fetcher";
import { END_POINTS } from "../../api/EndPoints";
import { RHFUpload } from "../../components/hook-form/RHFUpload";
import { CustomFile, Upload } from "../../components/upload";
import {
  DatePicker,
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useResponsive from "../../hooks/useResponsive";

type FormValuesProps = {
  adminBankAccountId: string;
  amount: string;
  mode: string;
  depositDate: string;
  depositorMobile: string;
  depositorBranch: string;
  UTR: string;
  remarks: string;
  proofOfDeposit: CustomFile | string | null;
};

type TbankList = {
  _id: string;
  bankId: {
    bankName: string;
    _id: string;
  };
  branchName: string;
  branchAddress: string;
  accountNumber: string;
  ifsc: string;
  minDepositAmt: number;
  maxDepositAmt: number;
  allowedModes: string[];
  status: string;
  deletedAt: any;
  deletedBy: any;
  modeCommissions: { mode: string; type: string; value: number; _id: string }[];
  createdAt: string;
  updatedAt: string;
};

function ClaimDeposit({ close }: { close: () => void }) {
  const isDesktop = useResponsive("up", "md");
  const [banksList, setBanksList] = useState<TbankList[]>([]);

  const Schema = Yup.object().shape({
    adminBankAccountId: Yup.string().required("Bank is required"),
    mode: Yup.string().required("Mode is required"),
    depositorBranch: Yup.string().required("Branch is required"),
    amount: Yup.number()
      .typeError("Amount must be a number")
      .positive("Amount must be greater than 0")
      .required("Amount is required"),
    depositorMobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    UTR: Yup.string().required("UTR is required"),
    remarks: Yup.string().required("Remarks are required"),
    proofOfDeposit: Yup.mixed()
      .required("Proof of deposit is required")
      .test("fileSize", "File size is too large", (value: any) =>
        value ? value.size <= 5 * 1024 * 1024 : false
      )
      .test("fileType", "Unsupported file type", (value: any) =>
        value
          ? ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
          : false
      ),
  });

  const defaultValues = {
    adminBankAccountId: "",
    amount: "",
    mode: "",
    depositDate: "",
    depositorMobile: "",
    depositorBranch: "",
    UTR: "",
    remarks: "",
    proofOfDeposit: null,
  };

  const methods = useForm<FormValuesProps | any>({
    resolver: yupResolver(Schema),
    defaultValues,
    mode: "all",
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = methods;

  useEffect(() => {
    getAdminBanks();
  }, []);

  const getAdminBanks = async () => {
    try {
      const Response = await fetcher.get(
        END_POINTS.FUND_REQUESTS.GET_ADMIN_BANKS
      );
      setBanksList(Response.data.data);
    } catch (error) {}
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const formdata = new FormData();
      formdata.append("adminBankAccountId", data.adminBankAccountId);
      formdata.append("amount", data.amount);
      formdata.append("mode", data.mode);
      formdata.append("depositDate", data.depositDate);
      formdata.append("depositorMobile", data.depositorMobile);
      formdata.append("depositorBranch", data.depositorBranch);
      formdata.append("UTR", data.UTR);
      formdata.append("remarks", data.remarks);
      formdata.append("proofOfDeposit", data.proofOfDeposit as any);
      const Response = await fetcher.postFile(
        END_POINTS.FUND_REQUESTS.CLAIM,
        formdata
      );
      close();
    } catch (error) {}
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography textAlign={"center"} variant="h4" mb={1}>
        Claim Deposit
      </Typography>
      <Box
        sx={{
          maxHeight: isDesktop ? "100%" : 450,
          overflowY: "scroll",
          py: 1,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${isDesktop ? 2 : 1}, 1fr)`,
            gap: 1.5,
          }}
        >
          <RHFSelect name="adminBankAccountId" label="Select Bank">
            {banksList.length ? (
              banksList.map((item) => (
                <MenuItem value={item._id}>{item.bankId.bankName}</MenuItem>
              ))
            ) : (
              <MenuItem disabled>No options available</MenuItem>
            )}
          </RHFSelect>
          <RHFSelect
            name="mode"
            label="Select Mode"
            disabled={!watch("adminBankAccountId")}
          >
            {banksList
              .find((item) => item._id == watch("adminBankAccountId"))
              ?.allowedModes.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                  onClick={() => setValue("mode", item)}
                >
                  {item.toUpperCase()}
                </MenuItem>
              ))}
          </RHFSelect>
          <RHFTextField name="depositorBranch" label="Branch" />
          <RHFTextField name="amount" label="Amount" type="number" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Deposit date"
              format="DD/MM/YYYY"
              value={watch("depositDate") ? dayjs(watch("depositDate")) : null}
              maxDate={dayjs(new Date())}
              onChange={(newValue: any) => setValue("depositDate", newValue)}
            />
          </LocalizationProvider>
          <RHFTextField
            name="depositorMobile"
            label="Mobile Number"
            type="number"
          />
          <RHFTextField name="UTR" label="UTR" />
          <RHFTextField name="remarks" label="Remarks" />
        </Box>
        <Box>
          <Upload
            file={watch("proofOfDeposit")}
            onDrop={(acceptedFiles: File[]) => {
              const uploadFile = acceptedFiles[0];
              if (uploadFile) {
                setValue(
                  "proofOfDeposit",
                  Object.assign(uploadFile, {
                    preview: URL.createObjectURL(uploadFile),
                  })
                );
              }
            }}
            onDelete={() => setValue("proofOfDeposit", null)}
            sx={{ my: 1 }}
          />
          {!!errors.proofOfDeposit && (
            <FormHelperText error sx={{ px: 2 }}>
              {errors?.proofOfDeposit?.message as string}
            </FormHelperText>
          )}
        </Box>
      </Box>
      <Stack flexDirection={"row"} gap={1.5}>
        <Button
          variant="contained"
          fullWidth
          type="submit"
          loading={isSubmitting}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          fullWidth
          disabled={isSubmitting}
          onClick={close}
        >
          Cancel
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default ClaimDeposit;
