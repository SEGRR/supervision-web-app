import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Typography, TextField, Button, Checkbox, FormControlLabel, Box, Divider } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { updateExistingBlock } from '../../../api/utility.api';
export default function EditBlockForm({ onClose, selectedBlock, onSuccess, onError, setLoading }) {

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");


  useEffect(() => {
    //To set initial data to the form
    if (selectedBlock) {
      setName(selectedBlock.name || "");
      setCapacity(selectedBlock.capacity || "");


    }
  }, [selectedBlock])
  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleCapacityChange = (event) => {
    setCapacity(event.target.value)
  }

  const editBlock = async () => {
    try {
      // Perform your edit logic here...

      setLoading(true);
      await updateExistingBlock({ ...selectedBlock, name: name, capacity: capacity })
      // Show success modal if edit is successful
      onSuccess();
    } catch (error) {
      console.error('Error adding faculty:', error);
      onError(error.message);
    } finally {
      onClose(); // Close the form modal

    }
  }
  return (
    <>

      <Typography variant='h6' align='center'>Edit Blocks</Typography>
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
            id="outlined-required-capacity"
            label="Capacity"
            variant="outlined"
            value={capacity}
            fullWidth
            onChange={handleCapacityChange}
          />

        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button variant='contained' onClick={editBlock}>Submit</Button>
        </Grid>
      </Grid>
    </>
  );
}
