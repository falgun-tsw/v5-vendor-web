import React from "react";

import TextField from "components/common/TextField";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import frLocale from 'date-fns/locale/fr';
// import LocalizationProvider from "@mui/lab/LocalizationProvider";

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker as MDatePicker} from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function DatePicker({
  error = "",
  value,
  onChange,
  name = '',
  textFieldProps = {},
  ...restProps
}) {
  return (
      <DesktopDatePicker
        inputFormat="dd/MM/yyyy"
        value={value}
        onChange={onChange}
        {...restProps}
        renderInput={(params) => (
          <TextField
            {...params}
            {...textFieldProps}
            helperText={restProps.helperText}
            error={error}
          />
        )}
      />
  );
}
