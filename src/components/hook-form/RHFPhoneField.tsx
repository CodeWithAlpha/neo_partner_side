import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type Props = TextFieldProps & {
  name: string;
};

export default function RHFPhoneField({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          size="small"
          autoComplete="off"
          fullWidth
          inputProps={{ maxLength: 10, pattern: "[0-9]*" }}
          value={field.value?.replace(/\D/g, "").slice(0, 10) || ""}
          onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
