import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Box, styled, Typography, IconButton, TextField, InputAdornment, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is mobile size

  const NavBox = styled(Box)({
    width: '100%',
    height: '60px',
    backgroundColor: '#F9F9F9',
    display: 'flex',
    justifyContent: 'space-between',
    padding: isMobile ? '0 10px' : '0 50px',
  });

  const useStyles = {
    left: {
      height: '100%',
      width: isMobile ? '60%' : '40%', // Adjust width for mobile
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    right: {
      height: '100%',
      width: isMobile ? '40%' : '40%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: isMobile ? '20px' : '100px', // Adjust gap for mobile
      paddingRight: isMobile ? '10px' : '100px',
    },
    headTypo: {
      color: '#b208f2',
      fontWeight: 800,
    },
    secTypo: {
      fontWeight: 100,
      fontSize: '11px',
      color: 'gray',
    },
    iconBox: {
      display: 'flex',
    },
    icon: {
      color: 'gray',
      fontSize: isMobile ? '16px' : '20px', // Adjust icon size for mobile
    },
  };

  return (
    <>
      <NavBox>
        <Box sx={useStyles.left}>
          <Typography variant={isMobile ? 'h6' : 'h5'} sx={useStyles.headTypo}>
            Covid-19
          </Typography>
          <Typography variant="subtitle1" sx={useStyles.secTypo}>
            Live Tracker Dashboard
          </Typography>
        </Box>

        <Box sx={useStyles.right}>
          {!isMobile && ( // Hide search bar on mobile
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: '200px',
                margin: '16px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            />
          )}

          <Box sx={useStyles.iconBox}>
            <IconButton sx={useStyles.icon}>
              <ArrowDropDownIcon />
            </IconButton>

            <Box
              sx={{
                width: '1px',
                height: '40px',
                backgroundColor: 'black',
                margin: '0 16px',
              }}
            />

            <Tooltip title="Notifications" arrow>
              <IconButton color="inherit" sx={useStyles.icon}>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout" arrow>
              <IconButton color="inherit" sx={useStyles.icon}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </NavBox>
    </>
  );
};

export default Navbar;
