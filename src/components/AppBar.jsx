import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import icon from '../assets/pict-icon.png';
import PropTypes from "prop-types";
export default function AppBar({ AppBar1, open, handleDrawerOpen }) {
  return (
    <>
      <AppBar1 position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar alt="Remy Sharp" src={icon} style={{ backgroundColor: "#fff", width: "50px", height: "50px" }} />

          <Typography variant="h6" noWrap component="div" style={{ marginLeft: "10px" }}>
            Pune Institute of Computer Technology, Pune
          </Typography>
        </Toolbar>
      </AppBar1>
    </>
  )
}
