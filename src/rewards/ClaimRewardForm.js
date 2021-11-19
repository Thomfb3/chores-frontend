import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AppAlert from "../common/AppAlert"
import UserContext from "../auth/UserContext";
import Button from '@mui/material/Button';

function ClaimRewardForm({ claimReward, subtractUserPoints, points }) {
    const history = useHistory();
    const { currentUser } = useContext(UserContext);
    const submitData = { "status": "claimed" };
    const userPointsData = { operation: "subtract", points: points };
    const [formErrors, setFormErrors] = useState([]);
    console.log(formErrors);
    console.debug(
        "ClaimRewardForm",
        "claimReward=", typeof claimReward,
        "submitData=", submitData,
        "formErrors", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await claimReward(submitData);
        let userResult = await subtractUserPoints(currentUser._id, userPointsData);
        if (result.success) {
            history.go(0);
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
                Claim Reward
            </Button>
        </form>
    );
};

export default ClaimRewardForm;