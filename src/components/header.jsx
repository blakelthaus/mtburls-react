import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#F7F7F7', boxShadow: 'none' }}>
        <Toolbar>
          <img src="/assets/mtburls.png" alt="MTBURLS" style={{ height: '50px' }}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
