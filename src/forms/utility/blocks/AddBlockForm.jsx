import React, { useState } from 'react'
import { addBlock } from '../../../api/utility.api';
import { Box, Button, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';



export default function AddBlockForm({ onClose, onSuccess, onError, loading }) {

    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");


    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleCapacityChange = (event) => {
        setCapacity(event.target.value)
    }



    const addBlock1 = async () => {
        try {
            // Perform your addition logic here...
            loading(true);
            await addBlock({
                name: name,
                capacity: capacity
            })
            onSuccess();
        } catch (error) {
            console.error('Error adding faculty:', error.message);
            onError(error.message);
        } finally {
            loading(false);

            onClose(); // Close the form modal

        }
    }
    return (
        <>
            <div>
                <Typography variant='h6' align='center'>Add Blocks</Typography>
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
                        <Button variant='contained' onClick={addBlock1}>Submit</Button>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
