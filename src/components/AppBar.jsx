import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import icon from '../assets/pict-icon.png';
import PropTypes from "prop-types";
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsAuthenticated } from '../redux/slice/slice';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 70,
  },
}));
export default function AppBar({ AppBar1, open, handleDrawerOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <AppBar1 position="fixed" open={open}>
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="right"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar alt="Remy Sharp" src={icon} style={{ backgroundColor: "#fff", width: "50px", height: "50px" }} />

          <Typography variant="h6" noWrap component="div" style={{ marginLeft: "10px", flexGrow: 1 }}>
            Pune Institute of Computer Technology, Pune
          </Typography>

          <IconButton
            size="large"
            aria-label="display more actions"
            color="inherit"
            edge="end"
            onClick={() => {
              dispatch(setIsAuthenticated(false));
              navigate("/");
            }}>
            <LogoutIcon />
          </IconButton>
        </StyledToolbar>
      </AppBar1>
    </>
  )
}
