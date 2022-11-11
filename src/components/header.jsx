import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#F7F7F7', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ color: 'black' }}>
            MTBURLS
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
