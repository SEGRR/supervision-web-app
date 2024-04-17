import React, { useState } from 'react';
import { Modal, Typography, Button, Box } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
const ConfirmationModal = ({ open, onClose, onConfirm, message }) => {



    return (
        <>
            {open && (<Modal
                open={open}
                onClose={(e) => {

                    onClose(e);
                }}
                aria-labelledby="confirmation-modal-title"
                aria-describedby="confirmation-modal-description"
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    boxShadow: 24,
                    padding: '24px',
                    borderRadius: '8px',
                    outline: 'none',
                    textAlign: 'center'
                }}>
                    <HelpIcon style={{ color: "green", fontSize: "48px" }}/>
                    <Typography variant="h5" id="confirmation-modal-title">
                        Confirm Action
                    </Typography>
                    <Typography variant="body1" sx={{ mt: "10px" }} id="confirmation-modal-description">
                        {message}
                    </Typography>
                    <Box sx={{display:"flex", justifyContent:"space-between",mt:"15px",p:"0 20px"}}>
                        <Button onClick={(e) => {
                            onConfirm(e);
                        }} variant="contained" color="primary" style={{ marginTop: '16px', marginRight: '8px' }}>
                            Yes
                        </Button>
                        <Button onClick={(e) => {
                            onClose(e);
                        }} variant="contained" color="secondary" style={{ marginTop: '16px' }}>
                            No
                        </Button>
                    </Box>
                </div>
            </Modal>)}
        </>
    );
};

export default ConfirmationModal;
