import React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter"

function AppAlert({severity="error", messages=[]}) {
    return (
    <Alert severity={severity}>
        <AlertTitle>{capitalizeFirstLetter(severity)}</AlertTitle>
        {messages.map(error => (
            <p className="Alert-message" key={error}>
              {error}
            </p>
        ))}
      </Alert>
    );
}

export default AppAlert;