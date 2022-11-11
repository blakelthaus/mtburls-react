import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#F7F7F7', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="p" component="div" sx={{ color: 'black' }}>
            Website built by Blake Borgholthaus
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}