import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Typography, TextField, Button, Checkbox, FormControlLabel, Box, Divider} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addNewTeacher } from '../../api/teacher.api';


export default function AddFacultyForm({teacherId, onClose ,onSuccess, onError,loading}) {

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [joining_date, setJoiningDate] = useState(null);
  const [teachToSE, setTeachToSE] = useState(false);
  const [teachToTE, setTeachToTE] = useState(false);
  const [teachToBE, setTeachToBE] = useState(false);
  


  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleDesignationChange = (event) => {
    setDesignation(event.target.value)
  }
  const handleJoiningDateChange = (date) => {
    setJoiningDate(date)
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

  
  const addFaculty = async () => {
    try {
      // Perform your addition logic here...
      let teachTo =[]
      if(teachToSE){
        teachTo.push("SE")
      }
      if(teachToTE){
        teachTo.push("TE")
      }
      if(teachToBE){
        teachTo.push("BE")
      }
      loading(true);
      await addNewTeacher({teacherId:teacherId.teacherId+1,name:name,designation:designation,joinDate:joining_date,teachTo:teachTo})
      loading(false);
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
      <div>
        <Typography variant='h6' align='center'>Add Faculty</Typography>
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
              <DatePicker 
                label="Joining Date *"
                required
                variant="filled"
                fullWidth
                value={joining_date}
                onChange={handleJoiningDateChange}
                format='DD/MM/YYYY'
                slotProps={{ textField: { fullWidth: true} }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Grid style={{ padding: '16px 12px 8px', border:'1px solid #D3D3D3',borderRadius: 5  }}>
              <Typography variant="subtitle1" color={'#606060'}>Teach To</Typography>
              <FormControlLabel
                control={<Checkbox />}
                label="SE"
                value={teachToSE}
                onChange={handleTeachToSEChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="TE"
                value={teachToTE}
                onChange={handleTeachToTEChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="BE"
                value={teachToBE}
                onChange={handleTeachToBEChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button variant='contained' onClick={addFaculty}>Submit</Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
