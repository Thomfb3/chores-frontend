import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert"
import UserContext from "../auth/UserContext";

function JoinTeamForm({ joinTeam }) {
    const history = useHistory();
    const { currentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        teamName: "",
        teamPassword: "",
        username: currentUser.username
    });
    
    const [formErrors, setFormErrors] = useState([]);
    console.log(formErrors);
    console.debug(
        "JoinTeamForm",
        "joinTeam=", typeof joinTeam,
        "formData=", formData,
        "formErrors", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await joinTeam(formData);

        if (result.success) {
            history.push("/");
        } else {
            setFormErrors(result.errors);
        };
    };

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    return (
        <div className="Form-container">
            <h3 className="Form-title">Join Team Form</h3>
            <form className="Form" onSubmit={handleSubmit}>
                <div className="Form-group">
                    <input 
                        className="Form-input"
                        placeholder="  "
                        name="teamName"
                        type="text"
                        value={formData.teamName}
                        onChange={handleChange}
                        required
                    />
                    <label className="Form-label" htmlFor="teamName">Team Name</label>
                </div>

                <div className="Form-group">
                    <input
                        className="Form-input"
                        placeholder="  "
                        type="password"
                        name="teamPassword"
                        value={formData.teamPassword}
                        onChange={handleChange}
                        required
                    />
                    <label className="Form-label" htmlFor="teamPassword">Team Password</label>
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                
                <div className="Form-group"> 
                    <button
                        className="Button"
                        type="submit"
                        onSubmit={handleSubmit}
                    >
                        Join Team
                    </button>
                </div>

            </form>
        </div>
    );
};

export default JoinTeamForm;