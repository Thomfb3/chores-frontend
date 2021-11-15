import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Alert from "../common/Alert"
import UserContext from "../auth/UserContext";

function SubmitChoreForm({ status, statusButton, submitChore, isAssigner, isAssignee }) {
    const history = useHistory();
    const { currentUser, currentTeam, currentTeamUsers } = useContext(UserContext);
    const submitData = { "status": "pending", "teamId": currentTeam._id };
    const rejectData = { "status": "rejected", "teamId": currentTeam._id };
    const approvedData = { "status": "approved", "teamId": currentTeam._id };

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
        let result = await submitChore(approvedData);
 
        if (result.success) {
            history.go(0);
        } else {
            setFormErrors(result.errors);
        };
    };

    if (isAssignee && (status !== "pending")) {
        return (
            <div className="Form-container">

                <form className="Form" onSubmit={handleSubmit}>
                    {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}
                    <div className="Form-group">
                        <button
                            className="Button"
                            type="submit"
                            onSubmit={handleSubmit}
                        >
                            {statusButton}
                        </button>
                    </div>

                </form>
            </div>
        );
    } else if (isAssigner && (status === "pending")) {
        return (
            <div className="Form-container">
                <div className="Form-group">
                    <button
                        className="Button"
                        type="submit"
                        onClick={handleApprove}
                    >
                        Approve
                        </button>
                </div>
                <div className="Form-group">
                    <button
                        className="Button"
                        type="submit"
                        onClick={handleReject}
                    >
                        Reject
                        </button>
                </div>
                {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}
            </div>
        );
    } else if (!isAssigner && (status === "pending")) {
        return (
            <div>
            <div>Pending Manager's Review.</div>
            </div>
        );
    };
};

export default SubmitChoreForm;