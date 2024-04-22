import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Typography, TextField, Button, Checkbox, FormControlLabel, Box, Divider, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { updateExistingBlock, updateExistingDivision } from '../../../api/utility.api';
export default function EditDivisionForm({ onClose, selectedDivision, onSuccess, onError, setLoading }) {

  const [formData, setFormData] = useState({
    className: '',
    startRollNo: '',
    endRollNo: '',
    total: '',
    department: '',
  });


  useEffect(() => {
    //To set initial data to the form
    if (selectedDivision) {
      setFormData({
        className: selectedDivision.className || "",
        startRollNo: selectedDivision.startRollNo || "",
        endRollNo: selectedDivision.endRollNo || "",
        total: selectedDivision.total || "",
        department: selectedDivision.department || "",
      })


    }
  }, [selectedDivision])


  const editBlock = async () => {
    try {
      
      setLoading(true);
      await updateExistingDivision({ ...selectedDivision, ...formData })
      
      onSuccess();
    } catch (error) {
      console.error('Error adding faculty:', error);
      onError(error.message);
    } finally {
      onClose(); 
    }
  }
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
    editBlock();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e) => {


    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>

      <Typography variant='h6' align='center'>Edit Division</Typography>
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
