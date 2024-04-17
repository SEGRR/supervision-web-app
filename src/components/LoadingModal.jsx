import React from 'react';
import { Modal, CircularProgress, Typography } from '@mui/material';

const LoadingModal = ({ open }) => {
  return (
    <Modal
      open={open}
      aria-labelledby="loading-modal-title"
      aria-describedby="loading-modal-description"
    >
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        boxShadow: 24,
        padding: '24px',
        width:'200px',
        borderRadius: '8px',
        outline: 'none',
        textAlign: 'center'
      }}>
        <CircularProgress />
        <Typography variant='h5' sx={{mt:2}}>Loading...</Typography>
      </div>
    </Modal>
  );
};

export default LoadingModal;
