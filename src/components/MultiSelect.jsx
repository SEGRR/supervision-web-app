import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export default function MultiSelect({ options, value, onChange, ...textFieldProps}) {
  const [selectedValues, setSelectedValues] = useState(value);

  const handleChange = (e) => {
    setSelectedValues(e.target.value);
    onChange(e.target.value);
  };

  return (
    <FormControl fullWidth>
      
      <Select
        multiple
        value={selectedValues}
        onChange={handleChange}
        variant="standard"
        {...textFieldProps}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() =>
                  {setSelectedValues(selectedValues.filter((item) => item !== value));
                  onChange(selectedValues.filter((item) => item !== value))}
                }
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Stack>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
