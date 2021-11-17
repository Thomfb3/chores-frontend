import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import AppAlert from "../common/AppAlert"
import UserContext from "../auth/UserContext";
import Button from '@mui/material/Button';

function ClaimChoreForm({ claimChore, choreId }) {
    const history = useHistory();
    const { currentUser, currentTeam, currentTeamUsers } = useContext(UserContext);
    const submitData = { "user": currentUser._id, "chore": choreId };

    const [formErrors, setFormErrors] = useState([]);
    console.log(formErrors);
    console.debug(
        "ClaimChoreForm",
        "claimChore=", typeof claimChore,
        "submitData=", submitData,
        "formErrors", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await claimChore(submitData);
        if (result.success) {
            history.push("/my-chores");
        } else {
            setFormErrors(result.errors);
        };
    };

    return (

        <form onSubmit={handleSubmit}>
            {formErrors.length ? <AppAlert severity="error" messages={formErrors} /> : null}

            <Button
                sx={{ marginTop: "5px", backgroundColor: '#1193ff', borderRadius: '5px' }}
                variant="contained"
                type="submit"
                onSubmit={handleSubmit}
            >
                Claim Chore
            </Button>

        </form>

    );
};

export default ClaimChoreForm;