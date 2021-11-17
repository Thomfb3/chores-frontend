import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import AppAlert from "../common/AppAlert"
import UserContext from "../auth/UserContext";
import Button from '@mui/material/Button';
import { assignmentExpression } from "@babel/types";

function SubmitChoreForm({ points, status, statusButton, submitChore, addUserPoints, isAssigner, isAssignee, assigneeId }) {
    const history = useHistory();
    const { currentUser, currentTeam, currentTeamUsers } = useContext(UserContext);
    const submitData = { status: "pending", userId: currentUser._id };
    const rejectData = { status: "rejected", userId: currentUser._id };
    const approvedData = { status: "approved", userId: currentUser._id };
    const userPointsData = { operation: "add", points: points }

    console.log("isAssignee", isAssignee)
    console.log("isAssigner", isAssigner)
    console.log("assigneeId", assigneeId)

    const [formErrors, setFormErrors] = useState([]);
    console.log(formErrors);
    console.debug(
        "SubmitChoreForm",
        "submitChore=", typeof submitChore,
        "submitData=", submitData,
        "formErrors", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await submitChore(submitData);
        if (result.success) {
            history.go(0);
        } else {
            setFormErrors(result.errors);
        };
    };

    async function handleReject(evt) {
        evt.preventDefault();
        let result = await submitChore(rejectData);
        if (result.success) {
            history.go(0);
        } else {
            setFormErrors(result.errors);
        };
    };

    async function handleApprove(evt) {
        evt.preventDefault();
        let choreResult = await submitChore(approvedData);
        let userResult = await addUserPoints(assigneeId, userPointsData);
        if (choreResult.success && userResult.success) {
            history.go(0);
        } else {
            let resultErrors = {...choreResult.errors, ...userResult.errors};
            setFormErrors(resultErrors);
        };
    };

    if (isAssignee && (status !== "pending")) {

        return (
            <div className="Form-container">
                <form className="Form" onSubmit={handleSubmit}>
                    {formErrors.length ? <AppAlert type="danger" messages={formErrors} /> : null}
                    <div className="Form-group">
                        <Button
                            sx={{ m: 1, backgroundColor: '#1193ff', borderRadius: '5px' }}
                            variant="contained"
                            type="submit"
                            onSubmit={handleSubmit}
                        >
                            {statusButton}
                        </Button>
                    </div>
                </form>
            </div>
        );
    } else if (isAssigner && (status === "pending")) {
        return (
            <div className="Form-container">
            <p className="Form__message">Pending Review</p>
                <div className="Form-group">
                    <Button
                        sx={{ m: 1, width: "200px", backgroundColor: '#24C67C', borderRadius: '5px', 
                        "&:hover": {
                            backgroundColor: '#13a160'
                        } }}
                        variant="contained"
                        type="submit"
                        onClick={handleApprove}
                    >
                        Approve
                    </Button>

                    <Button
                        sx={{ m: 1, width: "200px", backgroundColor: '#F91E87', borderRadius: '5px',
                        "&:hover": {
                            backgroundColor: '#c5005e'
                        } }}
                        variant="contained"
                        type="submit"
                        onClick={handleReject}
                    >
                        Reject
                        </Button>
                </div>
                {formErrors.length ? <AppAlert severity="error" messages={formErrors} /> : null}
            </div>
        );
    } else if (!isAssigner && (status === "pending")) {
        return (
            <div>
                <div>Pending Manager's Review.</div>
            </div>
        );
    } else {
        return (
            <div>
                Nothing rendered...
            </div>
        )
    }
};

export default SubmitChoreForm;