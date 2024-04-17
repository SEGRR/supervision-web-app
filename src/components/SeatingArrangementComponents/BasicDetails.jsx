import React from "react";
import {
    TextField,
    Grid,

    MenuItem,

    FormControl,
    FormLabel,
    Select,
} from "@mui/material";

export default function BasicDetails({
    formData,
    setFormData
}) {

    const getCurrentYear = () => {
        const currentDate = new Date();
        return currentDate.getFullYear();
    };

    const generateAcademicYearOptions = () => {
        const currentYear = getCurrentYear();
        return [
            `${currentYear - 1}-${currentYear}`,
            `${currentYear}-${currentYear + 1}`,
        ];
    };

    const handleDepartmentChange = (event) => {
        const { value } = event.target;
        let selectedYears = [];
        if (value === "FE") {
            selectedYears = ["FE"];
        }
        setFormData({ ...formData, selectedDepartment: value, selectedYears });
    };
    const handleAcademicYearChange = (event) => {
        const { value } = event.target;
        setFormData({ ...formData, selectedAcademicYear: value });
    };


    return (
        <Grid container item xs={12} spacing={4}>
            <Grid item xs={6}>
                <FormLabel required>Title</FormLabel>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    id="title"
                />
            </Grid>
            <Grid item xs={3}>
                <FormControl required sx={{ width: "100%" }}>
                    <FormLabel required>Academic Year</FormLabel>
                    <Select
                        value={formData.selectedAcademicYear}
                        onChange={handleAcademicYearChange}

                        id="academic-year-select"
                        variant="outlined"
                        size="small"
                    >
                        {generateAcademicYearOptions().map((year, index) => (
                            <MenuItem key={index} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <FormControl required sx={{ width: "100%" }}>
                    <FormLabel required>Department</FormLabel>
                    <Select
                        value={formData.selectedDepartment}
                        onChange={handleDepartmentChange}

                        id="department-select"
                        variant="outlined"
                        size="small"
                    >
                        {["FE", "IT", "CE", "ENTC"].map((department, index) => (
                            <MenuItem key={index} value={department}>
                                {department}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}
