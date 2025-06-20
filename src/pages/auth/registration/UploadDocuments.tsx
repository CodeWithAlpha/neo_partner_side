// form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, FormHelperText, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import fetcher from "../../../api/fetcher";
import { END_POINTS } from "../../../api/EndPoints";
import { PATH_AUTH, PATH_DASHBOARD } from "../../../routes/paths";
import FormProvider from "../../../components/hook-form";
import { CustomFile, Upload } from "../../../components/upload";
import CustomLoadingButton from "../../../components/CustomComponents/CustomLoadingButton";
import { useAuthContext } from "../../../auth/useAuthContext";

type FormValuesProps = {
  ID_PROOF: CustomFile | string | null;
  ADDRESS_PROOF: CustomFile | string | null;
  INCOME_PROOF: CustomFile | string | null;
  COMPANY_REGISTRATION: CustomFile | string | null;
  GST_CERTIFICATE: CustomFile | string | null;
  PAN_CARD: CustomFile | string | null;
  OTHER: CustomFile | string | null;
};

function UploadDocuments() {
  const { initialize } = useAuthContext();
  const navigate = useNavigate();
  const { state } = useLocation();

  const fileSchema = Yup.mixed<CustomFile>().test(
    "fileType",
    "Invalid file format",
    (value) => {
      if (!value || typeof value === "string") return true; // Allow null or string (URL)
      return value instanceof File;
    }
  );

  const VerifyOtpSchema = Yup.object().shape({
    // ID_PROOF: fileSchema.required("ID Proof is required"),
    // ADDRESS_PROOF: fileSchema.required("Address Proof is required"),
    // INCOME_PROOF: fileSchema.required("Income Proof is required"),
    // COMPANY_REGISTRATION: fileSchema.required(
    //   "Company Registration is required"
    // ),
    // GST_CERTIFICATE: fileSchema.required("GST Certificate is required"),
    // PAN_CARD: fileSchema.required("PAN Card is required"),
    // OTHER: fileSchema.nullable(),
  });

  const defaultValues = {
    ID_PROOF: null,
    ADDRESS_PROOF: null,
    INCOME_PROOF: null,
    COMPANY_REGISTRATION: null,
    GST_CERTIFICATE: null,
    PAN_CARD: null,
    OTHER: null,
  };

  const methods = useForm<FormValuesProps | any>({
    resolver: yupResolver(VerifyOtpSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const formData = new FormData();
      const documentTypes: string[] = [];

      Object.entries(data).forEach(([key, value]: any) => {
        if (value instanceof File) {
          documentTypes.push(key);
          formData.append("documents[]", value);
          formData.append("documentType[]", key);
        }
      });

      await fetcher.postFile(
        END_POINTS.AUTH.UPLOAD_DOCS(state.user._id),
        formData
      );
      initialize();
      navigate(PATH_AUTH.applicationReview);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" textAlign={"center"}>
        Upload Documents
      </Typography>
      <Stack
        gap={2}
        sx={{
          maxHeight: window.innerHeight - 240,
          overflowY: "auto",
          paddingRight: 2,
          scrollbarWidth: "thin",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            ID PROOF
          </Typography>

          <Upload
            file={watch("ID_PROOF")}
            onDrop={(acceptedFiles: File[]) => {
              const uploadFile = acceptedFiles[0];
              if (uploadFile) {
                setValue(
                  "ID_PROOF",
                  Object.assign(uploadFile, {
                    preview: URL.createObjectURL(uploadFile),
                  })
                );
              }
            }}
            onDelete={() => setValue("ID_PROOF", null)}
          />
          {!!errors.ID_PROOF && (
            <FormHelperText error sx={{ px: 2 }}>
              {errors?.ID_PROOF?.message as string}
            </FormHelperText>
          )}
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            ADDRESS PROOF
          </Typography>

          <Upload
            file={watch("ADDRESS_PROOF")}
            onDrop={(acceptedFiles: File[]) => {
              const uploadFile = acceptedFiles[0];
              if (uploadFile) {
                setValue(
                  "ADDRESS_PROOF",
                  Object.assign(uploadFile, {
                    preview: URL.createObjectURL(uploadFile),
                  })
                );
              }
            }}
            onDelete={() => setValue("ADDRESS_PROOF", null)}
          />
          {!!errors.ADDRESS_PROOF && (
            <FormHelperText error sx={{ px: 2 }}>
              {errors?.ADDRESS_PROOF?.message as string}
            </FormHelperText>
          )}
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            INCOME PROOF
          </Typography>

          <Upload
            file={watch("INCOME_PROOF")}
            onDrop={(acceptedFiles: File[]) => {
              const uploadFile = acceptedFiles[0];
              if (uploadFile) {
                setValue(
                  "INCOME_PROOF",
                  Object.assign(uploadFile, {
                    preview: URL.createObjectURL(uploadFile),
                  })
                );
              }
            }}
            onDelete={() => setValue("INCOME_PROOF", null)}
          />
          {!!errors.INCOME_PROOF && (
            <FormHelperText error sx={{ px: 2 }}>
              {errors?.INCOME_PROOF?.message as string}
            </FormHelperText>
          )}
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            COMPANY REGISTRATION
          </Typography>

          <Upload
            file={watch("COMPANY_REGISTRATION")}
            onDrop={(acceptedFiles: File[]) => {
              const uploadFile = acceptedFiles[0];
              if (uploadFile) {
                setValue(
                  "COMPANY_REGISTRATION",
                  Object.assign(uploadFile, {
                    preview: URL.createObjectURL(uploadFile),
                  })
                );
              }
            }}
            onDelete={() => setValue("COMPANY_REGISTRATION", null)}
          />
          {!!errors.COMPANY_REGISTRATION && (
            <FormHelperText error sx={{ px: 2 }}>
              {errors?.COMPANY_REGISTRATION?.message as string}
            </FormHelperText>
          )}
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            GST CERTIFICATE
          </Typography>

          <Upload
            file={watch("GST_CERTIFICATE")}
            onDrop={(acceptedFiles: File[]) => {
              const uploadFile = acceptedFiles[0];
              if (uploadFile) {
                setValue(
                  "GST_CERTIFICATE",
                  Object.assign(uploadFile, {
                    preview: URL.createObjectURL(uploadFile),
                  })
                );
              }
            }}
            onDelete={() => setValue("GST_CERTIFICATE", null)}
          />
          {!!errors.GST_CERTIFICATE && (
            <FormHelperText error sx={{ px: 2 }}>
              {errors?.GST_CERTIFICATE?.message as string}
            </FormHelperText>
          )}
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            PAN CARD
          </Typography>

          <Upload
            file={watch("PAN_CARD")}
            onDrop={(acceptedFiles: File[]) => {
              const uploadFile = acceptedFiles[0];
              if (uploadFile) {
                setValue(
                  "PAN_CARD",
                  Object.assign(uploadFile, {
                    preview: URL.createObjectURL(uploadFile),
                  })
                );
              }
            }}
            onDelete={() => setValue("PAN_CARD", null)}
          />
          {!!errors.PAN_CARD && (
            <FormHelperText error sx={{ px: 2 }}>
              {errors?.PAN_CARD?.message as string}
            </FormHelperText>
          )}
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            OTHER
          </Typography>

          <Upload
            file={watch("OTHER")}
            onDrop={(acceptedFiles: File[]) => {
              const uploadFile = acceptedFiles[0];
              if (uploadFile) {
                setValue(
                  "OTHER",
                  Object.assign(uploadFile, {
                    preview: URL.createObjectURL(uploadFile),
                  })
                );
              }
            }}
            onDelete={() => setValue("OTHER", null)}
          />
          {!!errors.OTHER && (
            <FormHelperText error sx={{ px: 2 }}>
              {errors?.OTHER?.message as string}
            </FormHelperText>
          )}
        </Stack>

        <CustomLoadingButton
          variant="contained"
          type="submit"
          isLoading={isSubmitting}
          fullWidth
        >
          Submit
        </CustomLoadingButton>
      </Stack>
    </FormProvider>
  );
}

export default UploadDocuments;
