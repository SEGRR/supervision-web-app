import React, { useEffect, useState } from "react";
import { addBlock, addSubject } from "../../../api/utility.api";
import {
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export default function AddSubjectForm({
    onClose,
    onSuccess,
    onError,
    loading,
    selectedSubject,
}) {


    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [abbreviation, setAbbreviation] = useState('');
    const [codeError, setCodeError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [abbreviationError, setAbbreviationError] = useState(false);

    const handleCodeChange = (event) => {
        const value = event.target.value;
        setCode(value);
        setCodeError(value.trim() === '');
    };

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
        setNameError(value.trim() === '');
    };

    const handleAbbreviationChange = (event) => {
        const value = event.target.value;
        setAbbreviation(value);
        setAbbreviationError(value.trim() === '');
    };
    useEffect(() => {
      console.log();
    
      return () => {
        
      }
    }, [])
    
    const addBlock1 = async () => {
        if (code.trim() == '' || name.trim() == '' || abbreviation.trim() == '') {
            setCodeError(code.trim() === '');
            setNameError(name.trim() === '');
            setAbbreviationError(abbreviation.trim() === '');
            return;
        }
        try {
          
            loading(true);
            await addSubject(selectedSubject._id,{
                code,
                name,
                abr:abbreviation
            })
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
        <div>
            <Typography variant="h6" align="center">
                Add Subject
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
                    <TextField
                        required
                        label="Code"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={code}
                        onChange={handleCodeChange}
                        error={codeError}
                        helperText={codeError ? 'Code is required' : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={name}
                        onChange={handleNameChange}
                        error={nameError}
                        helperText={nameError ? 'Name is required' : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Abbreviation"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={abbreviation}
                        onChange={handleAbbreviationChange}
                        error={abbreviationError}
                        helperText={abbreviationError ? 'Abbreviation is required' : ''}
                    />
                </Grid>

                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button variant="contained" onClick={addBlock1}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
