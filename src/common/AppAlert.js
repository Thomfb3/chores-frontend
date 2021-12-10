import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter"

function AppAlert({ severity = "error", messages = [], reset, resetNeeded=false}) {

  const [open, setOpen] = useState(true);

  return (
    <Collapse in={open}>
    <Alert severity={severity} action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
          setOpen(false);
          if(resetNeeded) reset();
        }}

      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }>
      <AlertTitle>{capitalizeFirstLetter(severity)}</AlertTitle>
      {messages.map(error => (
        <p className="Alert-message" key={error}>
          {error}
        </p>
      ))}
    </Alert>
    </Collapse>
  );
};

export default AppAlert;