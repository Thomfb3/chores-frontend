import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">
      <div className="LoadingSpinner__spinner">
        <Box sx={{ display: 'flex' }}>
          <CircularProgress sx={{ margin: 'auto' }} />
        </Box>
      </div>
      <div className="LoadingSpinner__background"></div>
    </div>
  );
};

export default LoadingSpinner;