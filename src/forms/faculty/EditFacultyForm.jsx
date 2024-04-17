import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Typography, TextField, Button, Checkbox, FormControlLabel, Box, Divider } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { updateExistingTeacher } from '../../api/teacher.api';
export default function EditFacultyForm({ onClose, selectedTeacherData, onSuccess, onError,setLoading }) {

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [joiningDate, setJoiningDate] = useState(null);
  const [teachToSE, setTeachToSE] = useState(false);
  const [teachToTE, setTeachToTE] = useState(false);
  const [teachToBE, setTeachToBE] = useState(false);


  useEffect(() => {
    //To set initial data to the form
    if (selectedTeacherData) {
      setName(selectedTeacherData.name || "");
      setDesignation(selectedTeacherData.designation || "");

      setJoiningDate(selectedTeacherData.joinDate ? dayjs(selectedTeacherData.joinDate) : null);
      setTeachToSE(selectedTeacherData.teachTo[0].includes("SE"));
      setTeachToTE(selectedTeacherData.teachTo[0].includes("TE"));
      setTeachToBE(selectedTeacherData.teachTo[0].includes("BE"));
    }
  }, [selectedTeacherData])
  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleDesignationChange = (event) => {
    setDesignation(event.target.value)
  }
  const handleJoiningDateChange = (date) => {
    setJoiningDate(date);

  }

  const handleTeachToSEChange = (event) => {
    setTeachToSE(event.target.checked);
  }

  const handleTeachToTEChange = (event) => {
    setTeachToTE(event.target.checked);
  }

  const handleTeachToBEChange = (event) => {
    setTeachToBE(event.target.checked);
  }

  const EditFaculty = async () => {
    try {
      // Perform your edit logic here...
      let teachTo = []
      if (teachToSE) {
        teachTo.push("SE")
      }
      if (teachToTE) {
        teachTo.push("TE")
      }
      if (teachToBE) {
        teachTo.push("BE")
      }
      setLoading(true);
      await updateExistingTeacher({ ...selectedTeacherData, name: name, designation: designation, joinDate: joiningDate.format('MM-DD-YYYY'), teachTo: teachTo })
      // Show success modal if edit is successful
      onSuccess();
    } catch (error) {
      console.error('Error adding faculty:', error);
      onError();
    } finally {
      onClose(); // Close the form modal

    }
  }
  return (
    <>

      <Typography variant='h6' align='center'>Edit Faculty</Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <Divider />
      <Box height={30} />

      <Grid container spacing={2} >
        <Grid item xs={12} >
          <TextField
            required
            id="outlined-required-name"
            label="Name"
            variant="outlined"
            value={name}
            fullWidth
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-required-designation"
            label="Designation"
            variant="outlined"
            value={designation}
            fullWidth
            onChange={handleDesignationChange}
          />
        </Grid>
        <Grid item xs={12}>


          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Joining Date *"
              required
              variant="filled"
              fullWidth
              value={joiningDate}
              onChange={handleJoiningDateChange}
              slotProps={{ textField: { fullWidth: true } }}

            />

          </LocalizationProvider>

        </Grid>
        <Grid item xs={12}>
          <Grid style={{ padding: '16px 12px 8px', border: '1px solid #D3D3D3', borderRadius: 5 }}>
            <Typography variant="subtitle1" color={'#606060'}>Teach To</Typography>

            <FormControlLabel
              control={<Checkbox />}
              label="SE"
              checked={teachToSE}
              onChange={handleTeachToSEChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="TE"
              checked={teachToTE}
              onChange={handleTeachToTEChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="BE"
              checked={teachToBE}
              onChange={handleTeachToBEChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button variant='contained' onClick={EditFaculty}>Submit</Button>
        </Grid>
      </Grid>
    </>
  );
}
