import { Button, FormControl, Divider, FormLabel, Grid, IconButton, MenuItem, Select, TextField, Typography, Box } from '@mui/material';
import React, { useState } from 'react'

import { Close as CloseIcon } from "@mui/icons-material";
import { addDivision } from '../../../api/utility.api';
export default function AddDivisionForm({ onClose,
  onSuccess,
  onError,
  loading, }) {
  const [formData, setFormData] = useState({
    className: '',
    startRollNo: '',
    endRollNo: '',
    total: '',
    department: '',
  });

  const handleChange = (e) => {


    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate total number of students
    const startRollNo = parseInt(formData.startRollNo);
    const endRollNo = parseInt(formData.endRollNo);
    const total = endRollNo - startRollNo + 1; // Adding 1 to include both start and end roll numbers

    setFormData({
      ...formData,
      total: total.toString()
    });
    addDivision1();
    // Handle form submission
    console.log(formData);
  };
  const addDivision1 = async () => {
    try {
      // Perform your addition logic here...
      loading(true);
      console.log("qqq",formData);
      await addDivision(formData)
      onSuccess();
    } catch (error) {
      console.error("Error adding faculty:", error.message);
      onError(error.message);
    } finally {
      loading(false);

      onClose(); // Close the form modal
    }
  };
  return (
    <>
      <Typography variant="h6" align="center">
        Add Course
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <Divider />
      <Box height={30} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Class Name"
              name="className"
              value={formData.className}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Roll No"
              name="startRollNo"
              type="number"
              value={formData.startRollNo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="End Roll No"
              name="endRollNo"
              type="number"
              value={formData.endRollNo}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>

            <FormControl required sx={{ width: "100%" }}>
              <FormLabel required>Department</FormLabel>
              <Select
                variant="outlined"
                id="department-select"
                // label="Department"
                name='department'
                value={formData.department}
                onChange={handleChange}
              >
                {["FE", "IT", "CE", "ENTC", "ECE", "AIDS"].map((department, index) => (
                  <MenuItem key={index} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Submit
        </Button>
      </form >
    </>
  );

}
