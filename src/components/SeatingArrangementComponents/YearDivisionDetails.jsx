import React from "react";
import {

  Grid,

  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel

} from "@mui/material";
import MultiSelect from "../MultiSelect";
import { getDivisionsData } from "../../api/seating-arrangement-data";
export default function YearDivisionDetails({ formData, setFormData }) {
  const divisionsData = getDivisionsData();
  const handleYearChange = (event) => {
    const { value, checked } = event.target;
    let selectedYears = [...formData.selectedYears];

    if (checked) {
      selectedYears.push(value);
    } else {
      selectedYears = selectedYears.filter((year) => year !== value);
    }

    const divisionsPerYear = { ...formData.divisionsPerYear };

    selectedYears.forEach((year) => {
      if (!(year in divisionsPerYear)) {
        divisionsPerYear[year] = [];
      }
    });

    for (const year in divisionsPerYear) {
      if (!selectedYears.includes(year)) {
        delete divisionsPerYear[year];
      }
    }

    setFormData({ ...formData, selectedYears, divisionsPerYear });
  };

  const handleDivisionsChange = (selectedDivisions, year) => {
    const divisionsPerYear = { ...formData.divisionsPerYear };
    const selectedDivisionsWithDetails = divisionsData[year]
      ?.filter((division) => selectedDivisions.includes(division.className)) || [];

    divisionsPerYear[year] = selectedDivisionsWithDetails;
    setFormData({ ...formData, divisionsPerYear });
  };

  return (
    <Grid container item spacing={4} >
      <Grid item xs={6} sx={{ my: 1 }}>
        <FormLabel required>Year</FormLabel>
        <br />
        {["FE", "SE", "TE", "BE"].map((year) => (
          <FormControlLabel
            key={year}
            control={
              <Checkbox
                checked={formData.selectedYears.includes(year)}
                onChange={handleYearChange}
                value={year}
                disabled={
                  formData.selectedDepartment === "FE" ||
                  (formData.selectedDepartment !== "FE" && year === "FE")
                }
              />
            }
            label={year}
          />
        ))}
      </Grid>

      <Grid container item xs={12} spacing={4} >
        {formData.selectedYears.map((year) => (
          <Grid item xs={4} key={year}>
            <FormLabel required>{`Divisions of ${year}`}</FormLabel>
            <FormControl fullWidth>
              <MultiSelect

                options={divisionsData[year]?.filter(division => division.department === formData.selectedDepartment)?.map((division, index) => (division.className)) || []}
                value={formData.divisionsPerYear[year]?.map(division => division.className) || []}
                onChange={(selectedDivisions) => handleDivisionsChange(selectedDivisions, year)}
                variant="outlined"
                size="small"
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </Grid>

  );

}
