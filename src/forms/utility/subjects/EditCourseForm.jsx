import React, { useEffect, useState } from "react";
import {updateExistingCourse } from "../../../api/utility.api";
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export default function EditCourseForm({
    onClose,
    onSuccess,
    onError,
    setLoading,
    selectedCourse,
}) {
    const [department, setDepartment] = useState("");
    const [semester, setSemester] = useState("");
    const [year, setYear] = useState("");

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };

    const handleSemesterChange = (event) => {
        setSemester(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    // console.log(selectedCourse);

    useEffect(() => {
        setDepartment(selectedCourse.branch || "")
        setSemester(selectedCourse.semester || "")
        setYear(selectedCourse.year || "")


    }, [selectedCourse])

    const editCourse = async () => {
        try {
            // Perform your addition logic here...
            setLoading(true);
            await updateExistingCourse(selectedCourse._id,{
                branch: department,
                year: year,
                semester: semester,
                subjects: [...selectedCourse.subjects]
            })
            onSuccess();
        } catch (error) {
            console.error("Error adding faculty:", error.message);
            onError(error.message);
        } finally {
            setLoading(false);

            onClose(); // Close the form modal
        }
    };
    return (
        <div>
            <Typography variant="h6" align="center">
                Edit Course
            </Typography>
            <IconButton
                style={{ position: "absolute", top: "0", right: "0" }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
            <Divider />
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl required sx={{ width: "100%" }}>
                        <FormLabel required>Department</FormLabel>
                        <Select
                            variant="outlined"
                            size="small"
                            id="department-select"
                            value={department}
                            onChange={handleDepartmentChange}
                        >
                            {["FE", "IT", "CE", "ENTC", "ECE", "AIDS"].map((department, index) => (
                                <MenuItem key={index} value={department}>
                                    {department}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl required sx={{ width: "100%" }}>
                        <FormLabel required>Semester</FormLabel>
                        <Select
                            variant="outlined"
                            size="small"
                            id="semester-select"
                            value={semester}
                            onChange={handleSemesterChange}
                        >
                            {["1", "2"].map((sem, index) => (
                                <MenuItem key={index} value={sem}>
                                    {sem}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl required sx={{ width: "100%" }}>
                        <FormLabel required>Year</FormLabel>
                        <Select
                            variant="outlined"
                            size="small"
                            id="year-select"
                            value={year}
                            onChange={handleYearChange}
                        >
                            {["FE", "SE", "TE", "BE"].map((sem, index) => (
                                <MenuItem key={index} value={sem}>
                                    {sem}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button variant="contained" onClick={editCourse}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
